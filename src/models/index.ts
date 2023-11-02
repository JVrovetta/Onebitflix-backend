import { Category } from "./Category.js";
import { Course } from "./Course.js";
import { Episode } from "./Episode.js";
import { User } from "./User.js";
import { Favorite } from "./Favorite.js";
import { Like } from "./Like.js";
import { WatchTime } from "./WatchTime.js";

// Course -> Category
Category.hasMany(Course, { as: 'courses' })
Course.belongsTo(Category)

// Episode -> Course
Course.hasMany(Episode, { as: 'episodes' })
Episode.belongsTo(Course, { as: 'course' })

// User <- Favorite -> Course
Course.belongsToMany(User, { through: Favorite })
Course.hasMany(Favorite)
Favorite.belongsTo(Course)
User.belongsToMany(Course, { through: Favorite })
User.hasMany(Favorite)
Favorite.belongsTo(User)

// User <- Like -> Course
Course.belongsToMany(User, { through: Like })
User.belongsToMany(Course, { through: Like })

// User <- WatchTime -> Episode
Episode.belongsToMany(User, { through: WatchTime })
User.belongsToMany(Episode, { through: WatchTime, as: 'episodes' })

export { Category, Course, Episode, User, Favorite, Like, WatchTime }