import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database/index.js"

interface LikeAttributes {
  userId: number
  courseId: number
}

interface LikeInstance extends Model<LikeAttributes>, LikeAttributes { }

const Like = sequelize.define<LikeInstance, LikeAttributes>('Like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'courses', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
})

export { Like, LikeInstance }