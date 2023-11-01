import { Model, Optional, DataTypes } from "sequelize"
import { sequelize } from "../database/index.js"

interface CourseAttributes {
  id: number
  name: string
  synopsis: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'thumbnailUrl' | 'featured'> { }

interface CourseInstance extends Model<CourseAttributes, CourseCreationAttributes>, CourseAttributes { }

const Course = sequelize.define<CourseInstance, CourseAttributes>('Course', {
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
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})

export { Course, CourseCreationAttributes, CourseInstance }