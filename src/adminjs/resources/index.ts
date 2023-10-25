import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models/index.js";
import { categoryResourceOptions } from "./category.js";
import { courseResourceOptions } from "./course.js";

const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions
  },
  {
    resource: Course,
    options: courseResourceOptions
  }
]

export { adminJsResources }