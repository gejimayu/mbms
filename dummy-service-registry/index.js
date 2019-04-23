const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('wow')
})

app.post('/', (request, response) => {
  console.log('\n==== New method chunk has been published ! =====\n')
  console.log(request.body)
  console.log('\n')
  response.send('Success')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})