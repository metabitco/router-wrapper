# What is @kbco/router?

Well it's a way to simply define routes, and return the result.

## Why?
Honestly, it's because I'm a PHP (Laravel) developer trying to make the switch to Node, and there are things I miss like being able to return from my controllers or routes and not have to worry about typing `res.send`.

## How to use?
A very simple example (modified from [express's hello world example](http://expressjs.com/en/starter/hello-world.html)).
```node
const express = require('express')

const app = express()

const router = require('@kbco/router')(app);

router.get('/', (req, res) => ('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```
Using older syntax you can accomplish the same as the above with:

```node
var express = require('express')

var app = express()

var router = require('@kbco/router')(app);

router.get('/', function(req, res) {
    return 'Hello World!';
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
}):
```

This package will automatically convert returned objects to json and set the approprate headers for a json response. Every closure from the router will get the request and response objects from express.

### What about resources?
If you wish to declare a more "RESTful" resource use

```node
router.resource('resource_name', {
    index() {},
    store() {},
    update() {},
    destroy() {},
    show() {}
})
```
It will automatically declare the corresponding get/post/put/delete/get requests so you can type a little less and get the same functionallity as every other route.

# Other frameworks
I made sure to test with other frameworks and wanted to be able to have a more fluent interface across the board. If you're looking to use a framework that isn't offically supported, or needs custom configuration, then you're welcome to submit a PR.

### Tested frameworks 
 - [Hapi](https://github.com/hapijs/hapi)
```node
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

const router = require('@kbco/router')(null, function (method, path, handler) {
    return server.route({
        method,
        path,
        handler: function (response, reply) {
            return reply(handler(response, reply));
        });
    });
});

router.get('/', function(req, res) {
    return 'Hello World!';
});

server.start((err) => console.log(err || `Server running at: ${server.info.uri}`));

```
 - [Express](https://github.com/expressjs/express)
See the "How to use" section.
