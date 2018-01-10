const request = require('supertest');
const hapiTest = require('hapi-test');
const assert = require('chai').assert;

describe('loading hapi', function () {
    var server;
    beforeEach(function () {
        server = require('./hapi-server');
        server.start();
    });
    afterEach(function () {
        server.stop();
    });
    it('responds to /', (done) => {
        hapiTest({server})
            .get('/')
            .end(function (result) {
                assert(result.statusCode === 200);
                done();
            });
    });
    it('can recieve a post request', (done) => {
        hapiTest({server})
            .post('/post', {})
            .end(function (result) {
                assert(result.statusCode === 200);
                done();
            });
    });
    it('can recieve a put request', (done) => {
        hapiTest({server})
            .put('/put', {})
            .end(function (result) {
                assert(result.statusCode === 200);
                done();
            });
    });
    it('can recieve a delete request', (done) => {
        hapiTest({server})
            .delete('/delete', {})
            .end(function (result) {
                assert(result.statusCode === 200);
                done();
            });
        });
    it('can recieve a patch request', (done) => {
        hapiTest({server})
            .patch('/patch', {})
            .end(function (result) {
                assert(result.statusCode === 200);
                done();
            });
    });
    it('has middleware intercept a desired route', (done) => {
        hapiTest({server})
            .get('/middleware')
            .end(function (result) {
                assert.equal('Middleware intercept', result.result);
                assert(result.statusCode === 200);
                done();
            });
    });
});
