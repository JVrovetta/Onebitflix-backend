import { Response } from "express"
import { favoriteServices } from "../services/favoriteServices.js"
import { AuthenticatedRequest } from "../middlewares/auth.js"

const favoriteController = {
  //POST /favorites
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body
    try {
      const favorite = await favoriteServices.create(userId, +courseId)
      return res.status(201).json(favorite)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET /favorites
  index: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    try {
      const favorites = await favoriteServices.findByUserId(userId)
      return res.status(200).json(favorites)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //DELETE /favorites
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body
    try {
      await favoriteServices.delete(userId, +courseId)
      return res.status(204).send()
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { favoriteController }