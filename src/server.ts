import express from 'express'
import { sequelize } from './database/index.js'
import { adminJs, adminJsRouter } from './adminjs/index.js'
import { router } from './routes.js'

const app = express()

app.use(express.static('public'))
app.use(adminJs.options.rootPath, adminJsRouter)

app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  sequelize.authenticate().then(() => {
    console.log(`Database connection successfully`)
  })
  console.log(`Server started successfully at port ${PORT}`)
})