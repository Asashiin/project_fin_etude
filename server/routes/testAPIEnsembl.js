var express = require('express')
const jsonFunc = require('jsonFunc')
var router = express.Router()
/*****/
router.post('/', (req, res) => {
  let data = req.body.rs
  let listId = data.split('/')
  let pop = req.body.population
  let size = req.body.size
  // console.log('Population name: ' + pop)
  if (listId) {
    jsonFunc.APIEnsembl(listId, pop, size).then(result => {
      if (typeof result === 'string') {
        console.log(result)
        // res.render('index')
        jsonFunc.searchPopu().then(result => {
          const tab = result
          res.render('index', {
            data: tab
          })
        })
      } else {
        // console.log(result)
        res.render('testAPIEnsembl', {
          data: result
        })
      }
    })
  }
})
module.exports = router
