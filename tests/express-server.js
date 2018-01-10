const express = require('express')

const app = express()

// Replace "../index" with @kbco/router
const router = require('../index')(app);

router.get('/', (req, res) => ('Hello World!'))

router.post('/post', (req, res) => ('Hello post!'))

router.put('/put', (req, res) => ('Hello put!'))

router.delete('/delete', (req, res) => ('Hello delete!'))

router.patch('/patch', (req, res) => ('Hello patch!'))

router.get('/middleware', (req, res) => ('Hello World!'), (req, res) => {
    return res.send('Middleware intercept');
})

module.exports = app.listen(3000, () => console.log('Example app listening on port 3000!'))

