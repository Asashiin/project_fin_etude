const http = require('http')
function testApi (api, res) {
  if (api === 'gwas_api') {
    const request = http.request({
      hostname: 'www.ebi.ac.uk',
      port: 80,
      path: '/gwas/beta/rest/api/', // Return some information about the API (just for testing)
      method: 'GET'
    }, async (resp) => {
      let err
      if (resp.statusCode !== 200) {
        console.log(`Status Code : ${resp.statusCode}`)
        err = new Error('Request failed.\n' + `Error : ${resp.statusMessage}`)
      }
      if (err) {
        console.log(err.message)
        console.log(`Headers : ${JSON.stringify(resp.headers)}`)
        return
      }
      let rawData = ''
      try {
        resp.setEncoding('utf8')
        await resp.on('data', (chunk) => { rawData += chunk })
        resp.on('end', () => { console.log('No more data in the response') })
        // console.log(JSON.parse(rawData))
        res.render('test', {
          data: rawData,
          name: 'GWAS'
        })
      } catch (err) {
        console.error('Something wrong : ', err)
      }
    })
    request.on('error', (e) => { console.log(`Got error : ${e.message}`) })
    request.end()
  }
  if (api === 'gtex_api') {
    const request = http.request({
      hostname: 'rest.ensembl.org',
      port: 80,
      path: '/info/rest', // Return the version of the api (just for testing)
      headers: { 'content-type': 'application/json' },
      method: 'GET'
    }, async (resp) => {
      let err
      if (resp.statusCode !== 200) {
        console.log(`Status Code : ${resp.statusCode}`)
        err = new Error('Request failed.\n' + `Error : ${resp.statusMessage}`)
      }
      if (err) {
        console.log(err.message)
        console.log(`Headers : ${JSON.stringify(resp.headers)}`)
        return
      }
      let rawData = ''
      try {
        resp.setEncoding('utf8')
        await resp.on('data', (chunk) => { rawData += chunk })
        resp.on('end', () => { console.log('No more data in the response') })
        res.render('test', {
          data: rawData,
          name: 'GTEX'
        })
      } catch (err) {
        console.error('Something wrong : ', err)
      }
    })
    request.on('error', (e) => { console.log(`Got error : ${e.message}`) })
    request.end()
  }
}

module.exports.testApi = testApi
