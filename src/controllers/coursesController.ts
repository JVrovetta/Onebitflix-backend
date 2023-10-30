import { Request, Response } from "express"
import { courseService } from "../services/courseServices.js"
import { getPaginationParams } from "../helpers/getPaginationParams.js"

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
  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const course = await courseService.findByIdWithEpisodes(id)
      if (course) return res.status(200).json(course)

      return res.status(404).send({ error: "Course not found..." })
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

}

export { coursesController }