import { Op } from "sequelize"
import { Course } from "../models/index.js"

const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      include: {
        association: 'episodes',
        attributes: ['id', 'name', 'synopsis', 'order', 'videoUrl', 'secondsLong'],
        order: [['order', 'ASC']],
        separate: true
      }
    })

    return courseWithEpisodes
  },

  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      where: { featured: true },
    })
    const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

    return randomFeaturedCourses.slice(0, 3)
  },

  getTopTenNewestCourses: async () => {
    const newestCourses = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      order: [['createdAt', 'DESC']],
      limit: 10
    })

    return newestCourses
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const { rows, count } = await Course.findAndCountAll({
      attributes: ['id', 'name', 'synopsis', 'thumbnailUrl'],
      where: {
        name: { [Op.iLike]: `%${name}%` }
      },
      limit: perPage,
      offset
    })

    return {
      courses: rows,
      page,
      perPage,
      total: count
    }
  }
}

export { courseService }