const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.listen(port, () => console.log(`API is running...`))

app.use('/', routes)