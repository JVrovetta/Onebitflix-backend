import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database/index.js"
import bcrypt from 'bcrypt'
import { EpisodeInstance } from "./Episode.js"

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void

interface UserAttributes {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  episodes?: EpisodeInstance[]
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
}

const User = sequelize.define<UserInstance, UserAttributes>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'user']]
    }
  }
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.isNewRecord || user.changed('password')) {
        user.password = await bcrypt.hash(user.password.toString(), 10)
      }
    }
  }
})

User.prototype.checkPassword = function (password: string, callbackfn: CheckPasswordCallback) {
  bcrypt.compare(password, this.password, function (err, isSame) {
    err ? callbackfn(err) : callbackfn(err, isSame)
  })
}

export { User, UserCreationAttributes, UserInstance }