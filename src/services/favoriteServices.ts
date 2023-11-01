import { Favorite } from "../models/index.js"

const favoriteServices = {
  create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({ userId, courseId })
    return favorite
  },

  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      where: { userId },
      attributes: ['userId'],
      include: {
        association: 'Course',
        attributes: ['id', 'name', 'synopsis', 'thumbnailUrl']
      }
    })

    return {
      userId,
      courses: favorites.map(favorite => favorite.Course)
    }
  },

  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({ where: { userId, courseId } })
  }

}

export { favoriteServices }