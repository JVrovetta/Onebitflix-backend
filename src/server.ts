import express from 'express'
import { sequelize } from './database'

const app = express()

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  sequelize.authenticate().then(() => {
    console.log(`Database connection successfully`)
  })
  console.log(`Server started successfully at port ${PORT}`)
})