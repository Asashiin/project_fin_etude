var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
/*****/
router.post('/', (req, res) => {
  /*****/
  let data = req.body.location
  let max = req.body.location_nbMax
  console.log('nb_max' + req.body.location_nbMax)
  let listLoc = data.split('/')
  jsonFunc.searchSnpByLocation(listLoc, max).then(result => {
    if (typeof result === 'string') {
      console.log(result)
      res.render('index')
    } else {
      console.log(result)
      res.render('location', {
        data: result
      })
    }
  })
})
module.exports = router
