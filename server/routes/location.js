var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
/*****/
router.post('/', (req, res) => {
  /*****/
  let data = req.body.location
  let max = req.body.location_nbMax
  let pop = req.body.population
  let size = req.body.size
  let listLoc = data.split('/')
  jsonFunc.searchSnpByLocation(listLoc, pop, size, max).then(result => {
    if (typeof result === 'string') {
      console.log(result)
      res.render('index')
    } else {
      // console.log(result)
      // console.log(JSON.stringify(result[0].snp[0]))
      res.render('location', {
        loc: listLoc,
        data: result,
        nbMaxi: max
      })
    }
  })
})
module.exports = router
