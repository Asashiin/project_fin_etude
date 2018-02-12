var express = require('express')
const jsonFunc = require('jsonFunc')
var router = express.Router()
/*****/
router.post('/', (req, res) => {
  let data = req.body.rs
  let listId = data.split('/')
  if (listId) {
    jsonFunc.APIEnsembl(listId).then(result => {
      if (typeof result === 'string') {
        console.log(result)
        res.render('index')
      } else {
        console.log(result)
        res.render('testAPIEnsembl', {
          data: result
        })
      }
    })
  }
})
module.exports = router
