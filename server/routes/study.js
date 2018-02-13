var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
/**********/
router.post('/', (req, res) => {
  let test = 'test'
  res.render('study')
})
router.get('/', (req, res) => {
  res.render('study')
})
module.exports = router
