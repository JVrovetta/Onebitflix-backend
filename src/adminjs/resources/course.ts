import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import { componentLoader } from "../component-loader.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
  filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}

const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'public'),
        opts: {}
      }
    },
    properties: {
      key: 'thumbnailUrl',
      file: 'uploadThumbnail'
    },
    uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}`,
    componentLoader
  })
]

export { courseResourceOptions, courseResourceFeatures }