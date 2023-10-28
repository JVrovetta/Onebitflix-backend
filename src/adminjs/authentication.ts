import { AuthenticationOptions } from "@adminjs/express"
import { User } from "../models/index.js"
import bcrypt from 'bcrypt'

const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } })

    if (user && user.role === 'admin') {

      if (await bcrypt.compare(password, user.password)) return user

      return false
    }
  },
  cookiePassword: 'senha-de-cookie'
}

export { authenticationOptions }