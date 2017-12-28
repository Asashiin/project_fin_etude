var express = require('express')
var router = express.Router()
const superagent = require('superagent')
const gtex = 'rest.ensembl.org/variation/human/'
const gwas = 'www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/'
/*
async function testApi(api, res) {
  if (api === 'gwas_api') {
    // Return some information about the API (just for testing)
    // const data = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api') -> Bonne addresse: ebi.ac.uk/gwas/beta/rest/api
    const data = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/rs6538678').set('Accept', 'application/json')
    res.render('test', {
      data: JSON.stringify(data.body),
      name: 'GWAS'
    })
  }
  if (api === 'gtex_api') {
    // Return the version of the api (just for testing) faire un attention à la version (soit 37, 38)!
    // const data = await superagent.get('grch37.rest.ensembl.org/variation/human/rs4646963').set('Accept', 'application/json')
    const data = await superagent.get('rest.ensembl.org/variation/human/rs6538678').set('Accept', 'application/json')
    let result = {
      name: data.body.name, // gene: geneId.body.genomicContext
      location: data.body.mappings[0].location,
      start: data.body.mappings[0].start,
      end: data.body.mappings[0].end,
      seq: data.body.mappings[0].seq_region_name,
      allele: data.body.mappings[0].allele_string,
      variant: data.body.synonyms
    }
    res.render('result', {
      data: result,
      name: 'GTEX'
    })
  }
}*/
//module.exports.testApi = testApi
module.exports = router
