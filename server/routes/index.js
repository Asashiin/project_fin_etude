var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
const excel = require('rwExcel')
var fs = require('fs')
var formidable = require('formidable')
/**********/
router.get('/', (req, res) => {
  res.render('index')
})
router.post('/fileup', (req, res) => {
  let listId = []
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    let pth = files.fileToUpload.path
    let data = fs.readFileSync(pth, {
      encoding: 'utf-8'
    })
    let listId = data.split("\n")
    for (let i = 0; i < listId.length; i++) {
      jsonFunc.APIEnsembl(listId[i]).then(result => {
        console.log(result)
      })
    }
  })
  res.render('index')
})
module.exports = router
