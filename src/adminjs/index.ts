import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from '../database/index.js'
import { componentLoader } from './components/componentLoader.js'
import { adminJsResources } from './resources/index.js'
import { brandingOptions } from './branding.js'
import { locale } from './locale.js'
import { dashboardOptions } from './dashboard.js'
import { authenticationOptions } from './authentication.js'

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  branding: brandingOptions,
  locale: locale,
  componentLoader: componentLoader,
  dashboard: dashboardOptions
})

const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  { resave: false, saveUninitialized: false }
)

export { adminJs, adminJsRouter }