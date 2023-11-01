import { Category } from "./Category.js";
import { Course } from "./Course.js";
import { Episode } from "./Episode.js";
import { User } from "./User.js";
import { Favorite } from "./Favorite.js";

Category.hasMany(Course, { as: 'courses' })
Course.belongsTo(Category)

Course.hasMany(Episode, { as: 'episodes' })
Episode.belongsTo(Course)

Course.belongsToMany(User, { through: Favorite })
User.belongsToMany(Course, { through: Favorite })
Favorite.belongsTo(User)
Favorite.belongsTo(Course)
Course.hasMany(Favorite)
User.hasMany(Favorite)


export { Category, Course, Episode, User, Favorite }