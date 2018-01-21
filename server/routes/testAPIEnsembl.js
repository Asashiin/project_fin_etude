var express = require('express')
const jsonFunc = require('jsonFunc')
const excel = require('rwExcel')
let path = require('path')
let filePath = path.join('~/SNP.txt')
var router = express.Router()
/*router.get('/', (req, res) => {
  res.render('testAPIEnsembl')
})*/
router.post('/', (req, res) => {
  console.log('test route')
  let datal = []
  let listRS = []
  if (req.body.rs) {
    //console.log('test route' + req.body.rs)
    // POUR l'instant ca lit juste un rs, le rs qu'on rentre dans la recherche
    // faudra passer ca sur un fonction sur le bouton que j'ai mis a la page APIEnsembl
    jsonFunc.APIEnsembl(req.body.rs).then(result => {
      res.render('testAPIEnsembl', {
        data: result
      })
      console.log(result.name);
      datal.push(result)
      console.log('test' + JSON.stringify(datal))
      excel.writeFichier(JSON.stringify(datal))
    })
    listRS.push(excel.readFichier())
  }
})
module.exports = router
