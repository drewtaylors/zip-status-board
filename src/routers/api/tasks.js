const express = require('express')
const Task = require('../../models/task')
const router = new express.Router()

router.post('/', async (req, res) => {
    const task = new Task({
        ...req.body
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.zipNumber) {
        match.zipNumber = req.query.zipNumber
    }

    if (req.query.isComplete) {
        match.isComplete = req.query.isComplete === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const tasks = await Task.find(match, null, {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        })

        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (!task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['isComplete']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id })
    
        if (!task) {
            return res.status(404)
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        await task.remove()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router