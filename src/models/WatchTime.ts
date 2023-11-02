import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database/index.js"

interface WatchTimeAttributes {
  userId: number
  episodeId: number
  seconds: number
}

interface WatchTimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes { }

const WatchTime = sequelize.define<WatchTimeInstance, WatchTimeAttributes>('WatchTime', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  episodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: { model: 'episodes', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  seconds: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
})

export { WatchTime, WatchTimeInstance }