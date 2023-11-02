import { Request, Response } from "express";
import { episodeService } from "../services/episodeServices.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";

const episodesControler = {
  //GET /episodes/stream?videoUrl=
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query
    const range = req.headers.range // bytes=0-1024

    try {
      if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string...')
      episodeService.streamEpisodeToResponse(res, videoUrl, range)

    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //GET /episodes/:id/watchTime
  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const episodeId = req.params.id

    try {
      const watchTime = await episodeService.getWatchTime(userId, +episodeId)


      return res.status(200).json(watchTime)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  },

  //POST /episodes/:id/watchTime
  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const episodeId = req.params.id
    const { seconds } = req.body

    try {
      const watchTime = await episodeService.setWatchTime(userId, +episodeId, seconds)

      return res.status(200).json(watchTime)
    } catch (err) {
      if (err instanceof Error) return res.status(400).json({ error: err.message })
    }
  }
}

export { episodesControler }
