const request = require('supertest');
const app = require('../api');

describe('api server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    test('responds to get / with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })

    test('responds to invalid method request with 404', (done) => {
        request(api)
            .post('/')
            .expect(404, done)
    })


    test('responds to delete /geojson/:id with status 404', (done) => {
        request(api)
            .delete('/geojson/:id')
            .expect(404, done)
        .expect
    })



    
    
})
