var express = require('express')
var router = express.Router()
const superagent = require('superagent')
router.post('/', (req, res) => {
  if (req.body.location) {
    console.log("test route, location : " + req.body.location)
    searchSnpByLocation(req.body.location, res)
  }
})
router.get('/', (req, res) => {
  //  res.render('index')
})
async function searchSnpByLocation(location, res) {
  const gw = await superagent.get('https://www.ebi.ac.uk/gwas/beta/rest/api/snpLocation/' + location).set('Accept', 'application/json')
  let snpList = []
  for (let i in gw.body._embedded.singleNucleotidePolymorphisms) {
    snpList.push(gw.body._embedded.singleNucleotidePolymorphisms[i].rsId)
  }
  console.log('snp0' + snpList[0])
  let result = {
    snp: snpList
  }
  res.render('location', {
    dataLoc: result
  })
}
module.exports = router
