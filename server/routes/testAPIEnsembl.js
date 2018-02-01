var express = require('express')
const jsonFunc = require('jsonFunc')
const excel = require('rwExcel')
var router = express.Router()
router.post('/', (req, res) => {
  console.log('test route')
  if (req.body.rs) {
    jsonFunc.APIEnsembl(req.body.rs).then(result => {
      if (typeof result === 'string') {
        console.log(result)
        res.render('index')
      } else {
        res.render('testAPIEnsembl', {
          data: result
        })
      }
    })
  }
})
router.post('/fileup', (req, res) => {
  console.log('test route fileup')
})
module.exports = router
