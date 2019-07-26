const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const Zip = require('../src/models/zip')
const {
    zipOne,
    zipTwo,
    zipThree,
    taskOne,
    taskTwo,
    taskThree,
    taskFour,
    taskFive,
    taskSix,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for zip', async () => {
    const response = await request(app)
        .post('/api/tasks')
        .send({
            zipNumber: 1,
            description: 'New task',
            isBlocking: false
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.isComplete).toEqual(false)
})

test('Should fetch all tasks', async () => {
    const response = await request(app)
        .get('/api/tasks')
        .expect(200)

    expect(response.body.length).toEqual(6)
})

test('Should delete a task', async () => {
    console.log(taskOne._id)
    await request(app)
        .delete('/api/tasks/' + taskOne._id)
        .expect(200)

    const task = await Task.findById(taskOne._id)
    expect(task).toBeNull()
})

test('Should delete tasks of zip when zip is deleted', async () => {
    await request(app)
        .delete('/api/zips/1')
        .expect(200)

    const response = await request(app)
        .get('/api/tasks')
        .expect(200)

    expect(response.body.length).toEqual(4)
})

test('Should update zip health status when task is updated to complete', async () => {
    // Status of Zip Three starts off as unhealthy

    await request(app)
        .patch('/api/tasks/' + taskSix._id)
        .send({
            isComplete: true
        })
        .expect(200)

    const zip = await Zip.findOne({ zipNumber: 3})
    expect(zip.isHealthy).toEqual(true)
})

test('Should update zip health status when task is added', async () => {
    // Status of Zip One starts off as healthy

    await request(app)
        .post('/api/tasks')
        .send({
            zipNumber: 1,
            description: 'New task',
            isBlocking: true
        })
        .expect(201)

    const zip = await Zip.findOne({ zipNumber: 1})
    expect(zip.isHealthy).toEqual(false)
})

test('Should update zip health status when task is removed', async () => {
    // Status of Zip Three starts off as unhealthy

    await request(app)
        .delete('/api/tasks/' + taskSix._id)
        .expect(200)

    const zip = await Zip.findOne({ zipNumber: 3})
    expect(zip.isHealthy).toEqual(true)
})