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
  var form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    console.log(files.fileToUpload.path)
    var pth = files.fileToUpload.path;
    //déplacer fichier si on veut le save sur le serveur/qqc part -->>dossier a lire
    /* var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
    fs.rename(pth, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
    })*/
    excel.readFichier(pth)
    // --> a voir sin crrée directement l'appel a l'écriture des résultats en asynchrones ici ou à un autre endroit
  })
})
module.exports = router
