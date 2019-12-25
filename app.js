const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log('Listening on port ' + port + '')
})

app.use(bodyParser.json())

app.use('/', require('./src/endpoints'))