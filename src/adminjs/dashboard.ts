import { PageHandler } from "adminjs"
import { Category, Course, Episode, User } from "../models/index.js"
import { Components } from "./components/componentLoader.js"

interface DashboardOptions {
  component?: string,
  handler?: PageHandler
}

const dashboardOptions: DashboardOptions = {
  component: Components.Dashboard,
  handler: async (req, res, context) => {
    const [courses, episodes, categories, standardUsers] = await Promise.all([
      Course.count(),
      Episode.count(),
      Category.count(),
      User.count({ where: { role: 'user' } })
    ])

    res.json({
      'Cursos': courses,
      'Episodios': episodes,
      'Categorias': categories,
      'Usuarios': standardUsers
    })
  }
}

export { dashboardOptions }