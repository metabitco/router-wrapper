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

router.middleware((req, res) => {
    return res.send('Middleware intercept');
}).get('/middleware-method', (req, res) => ('Hello World!'))

class FakeController {
    index() {
        return 'Hello Api World!'
    }

    store() {
        return 'Hello Api Store!'
    }

    update() {
        return 'Hello Api Update!'
    }

    destroy() {
        return 'Hello Api Destroy!'
    }

    show() {
        return 'Hello Api Show!'
    }
}

router.resource('api', new FakeController(), 'a');

module.exports = app.listen(3000, () => console.log('Example app listening on port 3000!'))

