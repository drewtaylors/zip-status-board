const request = require('supertest')
const app = require('../src/app')
const Zip = require('../src/models/zip')
const { zipOne, zipTwo, zipThree, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should add a new zip', async () => {
    const response = await request(app).post('/api/zips').send({
        zipNumber: 4
    }).expect(201)

    // Assert that the database was changed correctly
    const zip = await Zip.findOne({ zipNumber: response.body.zipNumber })
    expect(zip).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        zipNumber: 4,
        isHealthy: true
    })
})

test('Should get zip 1', async () => {
    await request(app)
        .get('/api/zips/1')
        .send()
        .expect(200)
})

test('Should delete zip 2', async () => {
    await request(app)
        .delete('/api/zips/2')
        .send()
        .expect(200)

    const zip = await Zip.findOne({ zipNumber: 2 })
    expect(!zip)
})

test('Should update valid zip fields', async () => {
    await request(app)
        .patch('/api/zips/3')
        .send({
            isHealthy: false
        })
        .expect(200)

    const zip = await Zip.findOne({ zipNumber: 3 })
    expect(zip.isHealthy).toEqual(false)
})

test('Should not update invalid zip fields', async () => {
    await request(app)
        .patch('/api/zips/3')
        .send({
            zipNumber: 4
        })
        .expect(400)
})