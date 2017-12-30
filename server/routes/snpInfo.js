var express = require('express')
const jsonFunc = require('jsonFunc')
var router = express.Router()
router.get('/', (req, res) => {
  //res.render('result')
})
router.post('/', (req, res) => {
  console.log("test route")
  if (req.body.rs) {
    console.log("test route" + req.body.rs)
    jsonFunc.searchRs(req.body.rs, res)
    jsonFunc.searchRSNcbi(req.body.rs, res)
  }
})
module.exports = router
