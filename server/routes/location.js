var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
router.post('/', (req, res) => {
  if (req.body.location) {
    console.log('test route, location : ' + req.body.location)
    jsonFunc.searchSnpByLocation(req.body.location, res)
  }
})
router.get('/', (req, res) => {
  //  res.render('index')
})
module.exports = router
