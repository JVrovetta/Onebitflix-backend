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

  getTopTenByLikes: async () => {
    const popularCourses = await Course.sequelize?.query(
      `SELECT c.id, c.name, c.synopsis, c.thumbnail_url AS "thumbnailUrl", COUNT(u.id) AS likes FROM courses c
      LEFT OUTER JOIN likes l ON (c.id = l.course_id)
      INNER JOIN users u ON (l.user_id = u.id)
      GROUP BY c.id
      ORDER BY likes DESC
      LIMIT 10;`
    )

    if (popularCourses) {
      const [topTen, metadata] = popularCourses
      return topTen
    }

    return null
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