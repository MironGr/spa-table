require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')


const db = require('./queries')

const app = express()

app.get('/get-x-page', db.getAll)

app.listen(8080, () => {
  console.log(`Ready server on port ${process.env.PORT}`)
})
