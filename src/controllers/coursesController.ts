import { Request, Response } from "express"
import { courseService } from "../services/courseServices.js"
import { getPaginationParams } from "../helpers/getPaginationParams.js"
import { AuthenticatedRequest } from "../middlewares/auth.js"
import { likeServices } from "../services/likeServices.js"
import { favoriteServices } from "../services/favoriteServices.js"

const coursesController = {
  //GET: courses/featured
  featured: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getRandomFeaturedCourses()

      return res.status(200).json(courses)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET: courses/newest
  newest: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getTopTenNewestCourses()

      return res.status(200).json(courses)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET courses/popular
  popular: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getTopTenByLikes()

      return res.status(200).json(courses)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET: courses/search?name=
  search: async (req: Request, res: Response) => {
    const { name } = req.query
    const [page, perPage] = getPaginationParams(req.query)
    try {
      if (typeof name !== 'string') throw new Error('Name param must be of type string...')
      const courses = await courseService.findByName(name, page, perPage)

      return res.status(200).json(courses)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET: courses/:id
  show: async (req: AuthenticatedRequest, res: Response) => {
    const courseId = req.params.id
    const userId = req.user!.id
    try {
      const course = await courseService.findByIdWithEpisodes(courseId)

      if (!course) return res.status(404).send({ error: "Course not found..." })

      const liked = await likeServices.isLiked(userId, +courseId)
      const favorited = await favoriteServices.isFavorited(userId, +courseId)
      return res.status(200).json({ ...course.get(), favorited, liked })
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

}

export { coursesController }