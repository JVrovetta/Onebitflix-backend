import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database/index.js"

interface EpisodeAttributes {
  id: number
  name: string
  synopsis: string
  order: number
  videoUrl: string
  thumbnailUrl: string
  secondsLong: number
  courseId: number
}

interface EpisodeCreationAttributes extends Optional<EpisodeAttributes, 'id' | 'videoUrl' | 'thumbnailUrl' | 'secondsLong'> { }

interface EpisodeInstance extends Model<EpisodeAttributes, EpisodeCreationAttributes>, EpisodeAttributes { }

const Episode = sequelize.define<EpisodeInstance, EpisodeAttributes>('Episode', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  secondsLong: {
    type: DataTypes.INTEGER
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'courses', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Episode }