var express = require('express')
const jsonFunc = require('jsonFunc')
const excel = require('rwExcel')
var fs = require('fs')
var router = express.Router()
var formidable = require('formidable')
/*****/
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
/******/
router.post('/fileup', (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    console.log(files.fileToUpload.path)
    let pth = files.fileToUpload.path;
    excel.readFichierLine(pth)
  })
})
module.exports = router
/******/
/* var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
fs.rename(pth, newpath, function (err) {
  if (err) throw err;
  res.write('File uploaded and moved!');
})*/
