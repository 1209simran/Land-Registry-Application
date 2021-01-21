const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors')
const server = require('./backend/Controller/user')
const app = express()
const config = require('./backend/Config/db_config')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose
  .connect(
    config.MongoURI,
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))
var port = process.env.PORT || 3001

app.use('/', server)



app.listen(port)
console.log('App is running on port ' + port)
