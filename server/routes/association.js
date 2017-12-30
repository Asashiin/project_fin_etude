var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
router.post('/', (req, res) => {
  if (req.body.trait) {
    console.log("test route, trait : " + req.body.trait)
    jsonFunc.searchAssociationsByTraits(req.body.trait, res)
  }
})
router.get('/', (req, res) => {
  //res.render('result')
})
module.exports = router
