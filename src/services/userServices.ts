import { UserCreationAttributes } from "../models/User.js"
import { User } from "../models/index.js"

const userServices = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({ where: { email } })
    return user
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes)
    return user
  }
}

export { userServices }