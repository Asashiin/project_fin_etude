const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const route = require('./routes/route')
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
//route
const index = require('../server/routes/index')
const association = require('../server/routes/association')
const location = require('../server/routes/location')
const snpInfo = require('../server/routes/snpInfo')
//view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
//ejs
app.use('/', index)
app.use('/location', location)
app.use('/snpInfo', snpInfo)
app.use('/association', association)
// error handler
app.get('/', (req, res) => {
  res.render('index')
})
/*
app.get('/snpInfo', (req, res) => {
  //res.render('result')
})
app.post('/snpInfo', (req, res) => {
   // GWAS Catalog REST API
  route.testApi(req.body.gwas_api, res)
  // GTEX REST API
  route.testApi(req.body.gtex_api, res) 
  if (req.body.rs) {
    console.log("test route" + req.body.rs)
    route.searchRs(req.body.rs, res)
  }
})*/
app.post('/asso', (req, res) => {
  if (req.body.trait) {
    console.log("test route, trait : " + req.body.trait)
    route.searchAssociationsByTraits(req.body.trait, res)
  }
})
app.post('/location', (req, res) => {
  if (req.body.location) {
    console.log("test route, location : " + req.body.location)
    route.searchSnpByLocation(req.body.location, res)
  }
})
app.get('/test', (req, res) => {
  res.render('test')
})
app.listen(port, () => {
  console.log('Server is running on port 3000')
})
module.exports = app
