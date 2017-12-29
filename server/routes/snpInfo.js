var express = require('express')
const superagent = require('superagent')
const gtex = 'rest.ensembl.org/variation/human/'
const gwas = 'www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/'
var router = express.Router()
router.get('/', (req, res) => {
  //res.render('result')
})
router.post('/', (req, res) => {
  /* // GWAS Catalog REST API
  route.testApi(req.body.gwas_api, res)
  // GTEX REST API
  route.testApi(req.body.gtex_api, res) */
  console.log("test route")
  if (req.body.rs) {
    console.log("test route" + req.body.rs)
    searchRs(req.body.rs, res)
    searchRSNcbi(req.body.rs, res)
  }
})
//test ncbi API
async function searchRSNcbi(rs, res) {
  let rsId = rs.substr(2, rs.length)
  const ncbi = await superagent.get('https://api.ncbi.nlm.nih.gov/variation/v0/beta/refsnp/' + rsId).set('Accept', 'application/json')
  console.log('test ncbi_snp' + ncbi.body.refsnp_id)
  let previousMergeList = []
  for (let i in ncbi.body.dbsnp1_merges) {
    previousMergeList.push('rs' + ncbi.body.dbsnp1_merges[i].merged_rsid)
  }
  let result = {
    name: 'rs' + ncbi.body.refsnp_id,
    previousMerge: previousMergeList
  }
  console.log('test result' + result.name + result.previousMerge[0])
  /*
  res.render('snpInfo', {
    data: result
  })*/
}
async function searchRs(rs, res) {
  const gt = await superagent.get(gtex + rs).set('Accept', 'application/json')
  const gw = await superagent.get(gwas + rs).set('Accept', 'application/json')
  const gwAsso = await superagent.get('www.ebi.ac.uk/gwas/beta/rest/api/associations/search/findByRsId?rsId=' + rs).set('Accept', 'application/json')
  let geneList = []
  let geneNameList = []
  let asso = {}
  for (let i in gwAsso.body._embedded.associations) {
    asso.snp = gwAsso.body._embedded.associations[i].loci[0].strongestRiskAlleles[0].riskAlleleName
    asso.pvalue = gwAsso.body._embedded.associations[i].pvalue
  }
  for (let i in gw.body.genomicContexts) {
    if (typeof (gw.body.genomicContexts[i].gene.geneName) !== 'undefined') {
      geneNameList.push(gw.body.genomicContexts[i].gene.geneName)
    }
    if (typeof (gw.body.genomicContexts[i].gene.ensemblGeneIds[0]) !== 'undefined') {
      geneList.push(gw.body.genomicContexts[i].gene.ensemblGeneIds[0].ensemblGeneId)
    } else {
      geneList.push('NAN')
    }
  }
  let result = {
    name: gt.body.name,
    location: gt.body.mappings[0].location,
    start: gt.body.mappings[0].start,
    end: gt.body.mappings[0].end,
    seq: gt.body.mappings[0].seq_region_name,
    allele: gt.body.mappings[0].allele_string,
    variant: gt.body.synonyms,
    genesName: geneNameList,
    genes: geneList,
    assoSnp: asso.snp,
    assopValue: asso.pvalue
  }
  res.render('snpInfo', {
    data: result
  })
}
module.exports = router
