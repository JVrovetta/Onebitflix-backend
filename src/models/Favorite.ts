import { Model, DataTypes } from "sequelize"
import { sequelize } from "../database/index.js"
import { CourseInstance } from "./Course.js"
import { UserInstance } from "./User.js"

interface FavoriteAttributes {
  userId: number
  courseId: number
}

interface FavoriteInstance extends Model<FavoriteAttributes>, FavoriteAttributes {
  Course?: CourseInstance,
  User?: UserInstance
}

const Favorite = sequelize.define<FavoriteInstance, FavoriteAttributes>('Favorite', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

export { Favorite, FavoriteInstance }