import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import { componentLoader } from "../component-loader.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'uploadThumbnail', 'secondsLong'],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'thumbnailUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'uploads'),
        opts: { baseUrl: '../uploads' }
      }
    },
    properties: {
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}`,
    componentLoader
  })
]

export { episodeResourceOptions, episodeResourceFeatures }