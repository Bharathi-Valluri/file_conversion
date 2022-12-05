const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router/router')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)

app.listen(5060, () => {
  console.log('server is listening on port no:', 5060)
})
