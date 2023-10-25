import { Category } from "./Category.js";
import { Course } from "./Course.js";

Category.hasMany(Course)
Course.belongsTo(Category)

export { Category, Course }