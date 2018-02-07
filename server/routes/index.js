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
        let test = JSON.stringify(result)
        let wPath = 'public/snpi.txt'
        /* fs.writeFile(wPath, test, 'utf-8', (err) => {
           console.log('test appendfile 1 ')
           if (err) {
             console.log('err writefile : ' + err)
           } else {
             console.log('succeed at :  ' + wPath)
           }
         })
      
      fs.appendFile(wPath, test, 'utf-8', (err) => {
          console.log('test appendfile 1 ')
          if (err) {
            console.log('err writefile : ' + err)
          } else {
            console.log('succeed at :  ' + wPath)
          }
        })*/

        //stream
        let wstream = fs.createWriteStream(wPath);
        wstream.write(test)
        wstream.end()
        setTimeout(function () {}, 1000)
      })
    }
  })
  res.render('index')
})
module.exports = router
