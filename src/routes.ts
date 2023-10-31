import express from "express";
import { categoriesController } from "./controllers/categoriesController.js";
import { coursesController } from "./controllers/coursesController.js";
import { episodesControler } from "./controllers/episodesController.js";
import { authController } from "./controllers/authController.js";
import { ensureAuth } from "./middlewares/auth.js";

const router = express.Router()
// CREATE
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

// READ
router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', episodesControler.stream)


export { router }