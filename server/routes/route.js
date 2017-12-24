const superagent = require('superagent')
const gtex = 'rest.ensembl.org/variation/human/'
const gwas = 'www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/'
async function testApi(api, res) {
    if (api === 'gwas_api') {
        // Return some information about the API (just for testing)
        // const data = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api') -> Bonne addresse: ebi.ac.uk/gwas/beta/rest/api
        const data = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/rs6538678').set('Accept', 'application/json')
        res.render('test', {
            data: JSON.stringify(data.body)
            , name: 'GWAS'
        })
    }
    if (api === 'gtex_api') {
        // Return the version of the api (just for testing) faire un attention à la version (soit 37, 38)!
        // const data = await superagent.get('grch37.rest.ensembl.org/variation/human/rs4646963').set('Accept', 'application/json')
        const data = await superagent.get('rest.ensembl.org/variation/human/rs6538678').set('Accept', 'application/json') 
        let result = {
            name: data.body.name, // gene: geneId.body.genomicContext
            location: data.body.mappings[0].location
            , start: data.body.mappings[0].start
            , end: data.body.mappings[0].end
            , seq: data.body.mappings[0].seq_region_name
            , allele: data.body.mappings[0].allele_string
            , variant: data.body.synonyms
        }
        res.render('result', {
            data: result
            , name: 'GTEX'
        })
    }
}
// Reseach function with RS id given by the user
async function searchRs(rs, res) {    
    const gt = await superagent.get(gtex + rs).set('Accept', 'application/json')
    const gw = await superagent.get(gwas + rs).set('Accept', 'application/json')
    const gwAsso = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api/associations/search/findByRsId?rsId=' + rs).set('Accept','application/json')    
    let geneList = []
    let geneNameList = []    
    let asso = {
      snp : ''
      , pvalue : ''
      , location : ''
    }
    for (let i in gwAsso.body._embedded.associations){    
      asso.snp = gwAsso.body._embedded.associations[i].loci[0].strongestRiskAlleles[0].riskAlleleName
      asso.pvalue = gwAsso.body._embedded.associations[i].pvalue     
    }
    console.log('test_snp : ' + asso.snp)
    console.log('test_pvalue : ' + asso.pvalue)
    for (let i in gw.body.genomicContexts) {
        if (typeof (gw.body.genomicContexts[i].gene.geneName) !== 'undefined') {           
            geneNameList.push(gw.body.genomicContexts[i].gene.geneName)
        }
        if (typeof (gw.body.genomicContexts[i].gene.ensemblGeneIds[0]) !== 'undefined') {
            geneList.push(gw.body.genomicContexts[i].gene.ensemblGeneIds[0].ensemblGeneId)
        }
        else {
            geneList.push('NAN')
        }
    }   
    let result = {
        name: gt.body.name
        , location: gt.body.mappings[0].location
        , start: gt.body.mappings[0].start
        , end: gt.body.mappings[0].end
        , seq: gt.body.mappings[0].seq_region_name
        , allele: gt.body.mappings[0].allele_string
        , variant: gt.body.synonyms
        , genesName: geneNameList
        , genes: geneList
        , assoSnp: asso.snp
        , assopValue: asso.pvalue
    }
    res.render('result', {
        data: result        
    })
}
module.exports.testApi = testApi
module.exports.searchRs = searchRs