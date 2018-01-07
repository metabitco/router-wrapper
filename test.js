const express = require('express')

const app = express()

const router = require('./index')(app);

router.get('/', (req, res) => ('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))