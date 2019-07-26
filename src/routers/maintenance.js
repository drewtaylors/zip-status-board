const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.get('/', (req, res) => {
    res.render('maintenance', {
        title: 'Maintenance Tasks'
    })
})

router.get('/add', (req, res) => {
    res.render('add_task', {
        title: 'Add a Task'
    })
})

router.get('/delete', (req, res) => {
    res.render('delete_task', {
        title: 'Delete a Task'
    })
})

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        res.render('task', {
            title: `Task ${req.params.id}`
        })
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/update/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (!task) {
            return res.status(404).send()
        }

        res.render('update_task', {
            title: `Update Task ${req.params.id}`
        })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router