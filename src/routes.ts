import express from "express";
import { categoriesController } from "./controllers/categoriesController.js";
import { coursesController } from "./controllers/coursesController.js";
import { episodesControler } from "./controllers/episodesController.js";
import { authController } from "./controllers/authController.js";
import { ensureAuth, ensureAuthQuery } from "./middlewares/auth.js";
import { favoritesController } from "./controllers/favoritesController.js";
import { likesController } from "./controllers/likesController.js";

const router = express.Router()
// Authentication
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

// Categories
router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

// Courses
router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

// Episodes
router.get('/episodes/stream', ensureAuthQuery, episodesControler.stream)

// Favorites
router.post('/favorites', ensureAuth, favoritesController.save)
router.get('/favorites', ensureAuth, favoritesController.index)
router.delete('/favorites', ensureAuth, favoritesController.delete)

// Likes
router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes', ensureAuth, likesController.delete)

export { router }