var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
var fs = require('fs')
var formidable = require('formidable')
  /**********/
router.get('/', (req, res) => {
  res.render('index')
})
router.post('/fileup', (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) throw err
    let pth = files.fileToUpload.path
    let data = fs.readFileSync(pth, {
      encoding: 'utf-8'
    })
    let listId = data.split('\n')
    jsonFunc.APIEnsembl(listId).then(result => {
      if (typeof result === 'string') {
        console.log(result)
        res.render('index')
      }
      let wPath = 'public/snpi.txt'
        // stream
      let wstream = fs.createWriteStream(wPath)
      for (let i = 0; i < result.length; i++) {
        let test = JSON.stringify(result[i])
        wstream.write(test)
        wstream.write('\n')
        wstream.write('\n')
        wstream.write('\n')
      }
      wstream.end()
        // setTimeout(function () {}, 1000)
      res.render('testAPIEnsembl', {
        data: result
      })
    })
  })
})
module.exports = router
