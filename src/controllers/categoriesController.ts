import { Request, Response } from "express";
import { categoryService } from "../services/categoryServices.js";
import { getPaginationParams } from "../helpers/getPaginationParams.js";

const categoriesController = {
  // GET: /categories
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query)
    try {
      const paginatedCategories = await categoryService.findAllPaginated(page, perPage)
      return res.status(200).json(paginatedCategories)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  // GET: /categories/:id
  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const category = await categoryService.findByIdWithCourses(id)
      return res.status(200).json(category)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { categoriesController }