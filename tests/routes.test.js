const request = require('supertest');
const app = require('../app');
describe('Get Endpoints', () => {
    it('should create a new post', async () => {
        const testEmail = 'ptznikko2@gmail.com';
        const testPassword = 'testtest';
        const res = await request(app)
            .post('/api/auth/signup')
            //.send(`email=${testEmail}`, `password=${testPassword}`)
            .type('form')
            .send({ email: testEmail, password: testPassword })
            .expect(function(res) {
                res.body.email = testEmail;
            })
            .expect(200);
    })
});