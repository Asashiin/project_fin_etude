const superagent = require('superagent')
async function testApi(api, res) {
    if (api === 'gwas_api') {
        // Return some information about the API (just for testing)
        const data = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/rs6538678')
        let association = {
            id_rs: data.body.rsId
            , func_class: data.body.functionalClass
            , lastUp: data.body.lastUpdateDate
            , location: data.body.locations[0]
        }
        res.render('test', {
            data: JSON.stringify(association)
            , name: 'GWAS'
        })
    }
    if (api === 'gtex_api') {
        // Return the version of the api (just for testing)
        const data = await superagent.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/').set('Accept', 'application/json')
        res.render('test', {
            data: JSON.stringify(data.body)
            , name: 'GTEX'
        })
    }
}
module.exports.testApi = testApi