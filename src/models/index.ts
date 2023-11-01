import { Category } from "./Category.js";
import { Course } from "./Course.js";
import { Episode } from "./Episode.js";
import { User } from "./User.js";
import { Favorite } from "./Favorite.js";
import { Like } from "./Like.js";

// Course -> Category
Category.hasMany(Course, { as: 'courses' })
Course.belongsTo(Category)

// Episode -> Course
Course.hasMany(Episode, { as: 'episodes' })
Episode.belongsTo(Course)

// User <- Favorite -> Course
Course.belongsToMany(User, { through: Favorite })
Course.hasMany(Favorite)
Favorite.belongsTo(Course)
User.belongsToMany(Course, { through: Favorite })
User.hasMany(Favorite)
Favorite.belongsTo(User)

// User <- Like -> Course
Course.belongsToMany(User, { through: Like })
Course.hasMany(Like)
Like.belongsTo(Course)
User.belongsToMany(Course, { through: Like })
User.hasMany(Like)
Like.belongsTo(User)

export { Category, Course, Episode, User, Favorite, Like }