const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const request = http.request({
    hostname: 'www.ebi.ac.uk',
    port: 80,
    path: '/gwas/rest/api/',
    method: 'GET'
  }, async (resp) => {
    let err
    if (resp.statusCode !== 200) {
      console.log(`Status Code : ${resp.statusCode}`)
      err = new Error('Request failed.\n' + `Message : ${resp.statusMessage}`)
    }
    if (err) {
      console.log(err.message)
      console.log(`Headers : ${JSON.stringify(resp.headers)}`)
      return
    }
    let rawData = ''
    try {
      resp.setEncoding('utf8')
      resp.on('data', (chunk) => { rawData += chunk })
      resp.on('end', () => { console.log('No more data') })
      // console.log(rawData.toString())
      await res.render('test', { data: rawData })
    } catch (err) {
      console.error('Something wrong : ', err)
    }
  })
  request.on('error', (e) => { console.log(`Got error: ${e.message}`) })
  request.end()
})

app.get('/test', (req, res) => {
  res.render('test')
})

app.listen(port, () => {
  console.log('Server is running')
})
