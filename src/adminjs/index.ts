import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from '../database/index.js'
import { adminJsResources } from './resources/index.js'
import { brandingOptions } from './branding.js'

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  branding: brandingOptions
})

const adminJsRouter = AdminJSExpress.buildRouter(adminJs)

export { adminJs, adminJsRouter }