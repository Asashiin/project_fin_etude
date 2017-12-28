var express = require('express')
var router = express.Router()
const superagent = require('superagent')
router.post('/', (req, res) => {
  if (req.body.trait) {
    console.log("test route, trait : " + req.body.trait)
    searchAssociationsByTraits(req.body.trait, res)
  }
})
router.get('/', (req, res) => {
  //res.render('result')
})
async function searchAssociationsByTraits(trait, res) {
  const gw = await superagent.get('https://www.ebi.ac.uk/gwas/beta/rest/api/associations/search/findByEfoTrait?efoTrait=' + trait).set('Accept', 'application/json')
  let assoSnp = []
  let assoPvalue = []
  /* let reportedGeneList = []
   let mappedGeneList = []
   let locationEachRs = []
   let geneNameList = []*/
  for (let i in gw.body._embedded.associations) {
    assoSnp.push(gw.body._embedded.associations[i].loci[0].strongestRiskAlleles[0].riskAlleleName)
    assoPvalue.push(gw.body._embedded.associations[i].pvalue)
  }
  console.log('snp' + assoSnp[0] + ' ' + assoSnp[3])
  /* for (let i in assoSnp) {
    console.log('test' + i)
    try {
      const gtLoc = await superagent.get(gtex + assoSnp[i]).set('Accept', 'application/json')
      if (gtloc.body.error) {
        locationEachRs.push('NAN' + express)
      }
    } catch (e) {
      console.log('ERROR')
    }
    // console.log('3' + locationEachRs[0])
  }
  console.log('1' + assoSnp[0])
  console.log('2' + assoSnp[3])
  console.log('3' + locationEachRs[0])
  */
  let result = {
    snp: assoSnp,
    pvalue: assoPvalue
  }
  res.render('association', {
    dataAsso: result
  })
}
module.exports = router
