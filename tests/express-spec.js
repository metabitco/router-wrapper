const request = require('supertest');
const chai = require('chai');

const assert = chai.assert;

describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./express-server');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('can receive a post request', function testPath(done) {
        request(server)
            .post('/post', {})
            .expect(200, done);
    });

    it('can receive a put request', function testPath(done) {
        request(server)
            .put('/put', {})
            .expect(200, done);
    });

    it('can receive a delete request', function testPath(done) {
        request(server)
            .delete('/delete', {})
            .expect(200, done);
    });

    it('can receive a patch request', function testPath(done) {
        request(server)
            .patch('/patch', {})
            .expect(200, done);
    });

    it('gets intercepted by middleware method for a desired route', (done) => {
        request(server)
            .get('/middleware-method', {})
            .end (function (err, res) {
                assert.equal('Middleware intercept', res.text);
                done();
            });
    });

    it('responds to / on resource route', function testSlash(done) {
        request(server)
            .get('/api')
            .expect(200, done);
    });

    it('can receive a post request on resource route', function testPath(done) {
        request(server)
            .post('/api', {})
            .expect(200, done);
    });

    it('can receive a put request on resource route', function testPath(done) {
        request(server)
            .put('/api/a', {})
            .expect(200, done);
    });

    it('can receive a delete request on resource route', function testPath(done) {
        request(server)
            .delete('/api/a', {})
            .expect(200, done);
    });

    it('can receive a patch request on resource route', function testPath(done) {
        request(server)
            .patch('/api/a', {})
            .expect(200, done);
    });
});
