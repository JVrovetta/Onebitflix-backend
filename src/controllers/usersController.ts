import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { userServices } from "../services/userServices.js";

const usersController = {
  //GET /users/current
  show: async (req: AuthenticatedRequest, res: Response) => {
    const { id, firstName, lastName, phone, birth, email, password, role } = req.user!
    try {
      return res.status(200).json({ id, firstName, lastName, phone, birth, email, password, role })
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET /users/current/watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    try {
      const watching = await userServices.getKeepWatchingList(userId)

      return res.status(200).json(watching)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //PUT /users/current
  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!
    const { firstName, lastName, phone, birth, email } = req.body

    try {
      const updatedUser = await userServices.update(id, { firstName, lastName, phone, birth, email })
      return res.status(200).json(updatedUser)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //PUT /users/current/password
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!
    const { currentPassword, newPassword } = req.body
    try {
      user.checkPassword(currentPassword, async (err, isSame) => {
        if (err) return res.status(400).json({ error: err.message })
        if (!isSame) return res.status(400).json({ error: 'Incorrect Password...' })

        await userServices.updatePassword(user.id, newPassword)
        return res.status(204).send()
      })
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { usersController }