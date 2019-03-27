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
    it('has middleware intercept a desired route', function testPath(done) {
        request(server)
            .get('/middleware', {})
            .end (function (err, res) {
                 assert.equal('Middleware intercept', res.text);
                 done();
             });
    });
});
