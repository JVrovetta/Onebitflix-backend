import AdminJS, { ComponentLoader } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from '../database/index.js'
import { adminJsResources } from './resources/index.js'
import { brandingOptions } from './branding.js'
import { componentLoader } from './componentLoader.js'
import { locale } from './locale.js'
import { User } from '../models/index.js'
import bcrypt from 'bcrypt'

AdminJS.registerAdapter(AdminJSSequelize)

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  branding: brandingOptions,
  locale: locale,
  componentLoader: componentLoader
})

const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } })

    if (user && user.role === 'admin') {

      if (await bcrypt.compare(password, user.password)) return user

      return false
    }
  },
  cookiePassword: 'senha-de-cookie'
}, null,
  {
    resave: false,
    saveUninitialized: false
  }
)

export { adminJs, adminJsRouter }