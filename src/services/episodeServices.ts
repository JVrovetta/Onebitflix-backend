import { Response } from "express"
import fs from "fs"

import path from "path";
import { fileURLToPath } from "url";
import { WatchTime } from "../models/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const episodeService = {
  streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
    const filePath = path.join(__dirname, '../../uploads', videoUrl)
    const fileStat = fs.statSync(filePath)

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-') // Formato exemplo ( "bytes=0-1024" )
      const start = parseInt(parts[0], 10) // 0
      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1 // 1024
      const chunkSize = (end - start) + 1

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4'
      }

      res.writeHead(206, head)
      fs.createReadStream(filePath, { start, end }).pipe(res)
    }
    else {
      const head = {
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4'
      }

      res.writeHead(200, head)
      fs.createReadStream(filePath).pipe(res)
    }

  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      attributes: ['seconds'],
      where: { userId, episodeId }
    })
    return watchTime
  },

  setWatchTime: async (userId: number, episodeId: number, seconds: number) => {
    const watchTimeAlreadyExists = await WatchTime.findOne({ where: { userId, episodeId } })

    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds
      await watchTimeAlreadyExists.save()
      return watchTimeAlreadyExists
    }

    const watchTime = await WatchTime.create({ userId, episodeId, seconds })
    return watchTime
  }
}

export { episodeService }