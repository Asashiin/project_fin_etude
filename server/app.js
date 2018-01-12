const express = require('express')
//const ejs = require('ejs')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
  // const route = require('./routes/route')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, '/public')))
  //  route
const index = require('../server/routes/index')
const association = require('../server/routes/association')
const location = require('../server/routes/location')
const snpInfo = require('../server/routes/snpInfo')
  //  view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
//ejs.registerPartial
  //  ejs
app.use('/', index)
app.use('/location', location)
app.use('/snpInfo', snpInfo)
app.use('/association', association)
app.listen(port, () => {
  console.log('Server is running on port 3000')
})
module.exports = app
