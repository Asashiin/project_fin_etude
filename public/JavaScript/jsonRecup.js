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
  res.render('snpInfo', {
    data: result
  })
}
module.exports.searchRSNcbi = searchRSNcbi
