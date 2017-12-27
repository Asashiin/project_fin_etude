const superagent = require('superagent')
const gtex = 'rest.ensembl.org/variation/human/'
const gwas = 'www.ebi.ac.uk/gwas/beta/rest/api/singleNucleotidePolymorphisms/'
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
}
//search liste snp by location
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
async function searchAssociationsByTraits(trait, res) {
  const gw = await superagent.get('https://www.ebi.ac.uk/gwas/beta/rest/api/associations/search/findByEfoTrait?efoTrait=' + trait).set('Accept', 'application/json')
  let assoSnp = []
  let assoPvalue = []
  let reportedGeneList = []
  let mappedGeneList = []
  let locationEachRs = []
  let geneNameList = []
  for (let i in gw.body._embedded.associations) {
    assoSnp.push(gw.body._embedded.associations[i].loci[0].strongestRiskAlleles[0].riskAlleleName)
    assoPvalue.push(gw.body._embedded.associations[i].pvalue)
  }
  console.log('snp' + assoSnp[0])
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
// Reseach function with RS id given by the user
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
  res.render('result', {
    data: result
  })
}
module.exports.testApi = testApi
module.exports.searchRs = searchRs
module.exports.searchAssociationsByTraits = searchAssociationsByTraits
module.exports.searchSnpByLocation = searchSnpByLocation
