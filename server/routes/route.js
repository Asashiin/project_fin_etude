const superagent = require('superagent')

async function testApi (api, res) {
  if (api === 'gwas_api') {
    // Return some information about the API (just for testing)
    const data = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api')
    res.render('test', {
      data: JSON.stringify(data.body),
      name: 'GWAS'
    })
  }
  if (api === 'gtex_api') {
    // Return the version of the api (just for testing)
    const data = await superagent.get('rest.ensembl.org/info/rest').set('Accept', 'application/json')
    res.render('test', {
      data: JSON.stringify(data.body),
      name: 'GTEX'
    })
  }
}
module.exports.testApi = testApi
