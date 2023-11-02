import { EpisodeInstance } from "../models/Episode.js"
import { UserCreationAttributes } from "../models/User.js"
import { User } from "../models/index.js"

const filterLastEpisodeByCourse = (episodes: EpisodeInstance[]) => {
  const coursesList: number[] = []
  const lastEpisodes = episodes.reduce((acc, curr) => {
    if (!coursesList.includes(curr.courseId)) {
      coursesList.push(curr.courseId)
      acc.push(curr)
      return acc
    }
    const episodeFromSameCourseIdx = acc.findIndex(ep => ep.courseId === curr.courseId)
    if (acc[episodeFromSameCourseIdx].order < curr.order) acc[episodeFromSameCourseIdx] = curr
    return acc
  }, [] as EpisodeInstance[])

  return lastEpisodes
}

const userServices = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({ where: { email } })
    return user
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes)
    return user
  },

  getKeepWatchingList: async (userId: number) => {
    const userWithWatchingEpisodes = await User.findByPk(userId, {
      attributes: [],
      include: {
        association: 'episodes',
        attributes: ['id', 'name', 'synopsis', 'order', 'videoUrl', 'secondsLong', 'courseId'],
        include: [{
          association: 'course',
          attributes: ['id', 'name', 'synopsis', 'thumbnailUrl']
        }],
        through: {
          as: 'watchTime',
          attributes: ['seconds', 'updatedAt']
        }
      }
    })

    if (!userWithWatchingEpisodes) throw new Error('User not found...')

    const keepWatchingList = filterLastEpisodeByCourse(userWithWatchingEpisodes.episodes!)
    // @ts-ignore
    keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1)
    return keepWatchingList
  }
}

export { userServices }
