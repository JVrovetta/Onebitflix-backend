import { Model, Optional, DataTypes } from "sequelize"
import { sequelize } from "../database/index.js"

interface CategoryAttributes {
  id: number
  name: string
  position: number
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> { }

interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes { }

const Category = sequelize.define<CategoryInstance, CategoryAttributes>('Category', {
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
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export { Category, CategoryCreationAttributes, CategoryInstance }