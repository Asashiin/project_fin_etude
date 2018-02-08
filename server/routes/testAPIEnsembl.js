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
// le POST est maintenant sur la page index
/*
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
}) */
module.exports = router
