const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 3000 });

// Replace "../index" with @kbco/router
const router = require('../index')(null, function (method, path, handler, middleware) {
    return server.route({
        method, 
        path, 
        handler: (resp, reply) => {
            let middlewareResponse = null;
            if (middleware) {
                return middleware(resp, reply, handler);
            }
            return reply(handler(resp, reply))
        }

    });
});

router.get('/', (req, res) => ('Hello World!'))

router.post('/post', (req, res) => ('Hello post!'))

router.put('/put', (req, res) => ('Hello put!'))

router.delete('/delete', (req, res) => ('Hello delete!'))

router.patch('/patch', (req, res) => ('Hello patch!'))

router.get('/middleware', (req, res) => ('Hello World!'), (request, reply, next) => {
    return reply('Middleware intercept');
    /*
    You could also do some things before you reply, like:
    
    if (request.params.hasOwnProperty('name')) {
        return reply('Unauthenticate');
    }
    
    return next(request, reply);
    */
})

module.exports = server;
