import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode } from "../../models/index.js";
import { categoryResourceOptions } from "./category.js";
import { courseResourceOptions } from "./course.js";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode.js";

const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions
  },
  {
    resource: Course,
    options: courseResourceOptions
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  }
]

export { adminJsResources }