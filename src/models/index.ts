import { Category } from "./Category.js";
import { Course } from "./Course.js";
import { Episode } from "./Episode.js";

Category.hasMany(Course)
Course.belongsTo(Category)

Course.hasMany(Episode)
Episode.belongsTo(Course)

export { Category, Course, Episode }