var express = require('express')
const jsonFunc = require('jsonFunc')
var router = express.Router()
var excel = require('excel4node')
router.get('/', (req, res) => {
  // res.render('result')
})
router.post('/', (req, res) => {
  console.log('test route')
  if (req.body.rs) {
    console.log('test route' + req.body.rs)
    jsonFunc.searchRs(req.body.rs, res)
    jsonFunc.searchRSNcbi(req.body.rs, res)
  }
})
/*
router.get('/dlExcel', (req, res) => {
  console.log(req.test + '1')
  console.log("test export Excel")
})*/
router.post('/dlExcel', (req, res) => {
  console.log(req.data)
  console.log("test export Excel")
})
module.exports = router
