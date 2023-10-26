import { ResourceOptions } from "adminjs";

const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'uploadThumbnail', 'secondsLong'],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'thumbnailUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

export { episodeResourceOptions }