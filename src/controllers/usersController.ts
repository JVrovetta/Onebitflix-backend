import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { userServices } from "../services/userServices.js";

const usersController = {
  //GET /watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    try {
      const watching = await userServices.getKeepWatchingList(userId)

      return res.status(200).json(watching)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { usersController }