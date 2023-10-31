import { Request, Response } from "express";
import { userServices } from "../services/userServices.js";
import { jwtServices } from "../services/jwtServices.js";

const authController = {
  //POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body
    try {
      const userAlreadyExists = await userServices.findByEmail(email)
      if (userAlreadyExists) throw new Error('This email is already being used...')

      const user = await userServices.create(
        { firstName, lastName, phone, birth, email, password, role: 'user' }
      )

      return res.status(201).json(user)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
      const user = await userServices.findByEmail(email)
      if (!user) return res.status(404).json({ message: 'Email not found...' })

      user.checkPassword(password, (err, isSame) => {
        if (err) throw err
        if (!isSame) return res.status(401).json({ message: 'Incorrect password...' })

        const payload = { id: user.id, firstName: user.firstName, email: user.email }
        const token = jwtServices.signToken(payload, '5d')

        return res.json({ authenticated: true, ...payload, token })
      })
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { authController }