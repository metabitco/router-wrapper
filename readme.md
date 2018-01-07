# What is @kbco/router?

Well it's a way to simply define routes, and return the result.

## Why?
Honestly, it's because I'm a PHP (Laravel) developer trying to make the switch to Node, and there are things I miss like being able to return from my controllers or routes and not have to worry about typing `res.send`.

## How to use?
A very simple example (modified from [express's hello world example](http://expressjs.com/en/starter/hello-world.html)).
```node
const express = require('express')

const app = express()

const router = require('@kbco/auth')(app);

router.get('/', (req, res) => ('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```
Using older syntax you can accomplish the same as the above with:

```node
var express = require('express')

var app = express()

var router = require('@kbco/auth')(app);

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
