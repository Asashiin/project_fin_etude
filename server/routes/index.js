var express = require('express')
var router = express.Router()
const jsonFunc = require('jsonFunc')
var fs = require('fs')
var formidable = require('formidable')
/**********/
router.get('/', (req, res) => {
  let popu = req.query.pop
  let size = req.query.size
  let rs = req.query.rs
  if ((rs) && (size) && popu) {
    console.log('test : ' + rs + '; ' + popu + '; ' + size)
    let tab = [rs]
    jsonFunc.APIEnsembl(tab, popu, size).then(result => {
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
        res.render('testAPIEnsembl', {
          data: result
        })
      }
    })
  } else {
    jsonFunc.searchPopu().then(result => {
      const tab = result
      res.render('index', {
        data: tab
      })
    })
  }
})
router.post('/fileup', (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) throw err
    let pth = files.fileToUpload.path
    let data = fs.readFileSync(pth, {
      encoding: 'utf-8'
    })
    // OS UBUNTU
    // let listId = data.split('\n')
    // OS WINDOWS
    let listId = data.split('\r\n')
    jsonFunc.APIEnsembl(listId, fields.population, fields.size).then(result => {
      if (typeof result === 'string') {
        console.log(result)
        res.render('index')
      }
      let wPath = 'public/SNPInfo.txt'
      // stream
      let wstream = fs.createWriteStream(wPath)
      jsonFunc.writeFile(wstream, result)
      /* for (let i = 0; i < result.length; i++) {
        console.log(result[i].name)
        let json = JSON.stringify(result[i])
        wstream.write(json)
        wstream.write('\r\n')
        wstream.write('\r\n')
        wstream.write('\r\n')
      } */
      wstream.end()
      // setTimeout(function () {}, 1000)
      res.render('testAPIEnsembl', {
        data: result
      })
    })
  })
})
module.exports = router
