import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { likeServices } from "../services/likeServices.js";

const likesController = {
  //POST /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      const like = await likeServices.create(userId, +courseId)
      res.status(201).json(like)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //DELETE /likes
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
      await likeServices.delete(userId, +courseId)
      res.status(204).send()
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { likesController }