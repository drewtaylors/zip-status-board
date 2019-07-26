const express = require('express')
const Zip = require('../../models/zip')
const Task = require('../../models/task')
const router = new express.Router()

router.post('/', async (req, res) => {
    const zip = new Zip({
        ...req.body
    })

    try {
        await zip.save()
        res.status(201).send(zip)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.isHealthy) {
        match.isHealthy = req.query.isHealthy === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const zips = await Zip.find(match, null, {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        })

        res.send(zips)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:zipNumber', async (req, res) => {
    try {
        const zip = await Zip.findOne({ zipNumber: req.params.zipNumber })

        if (!zip) {
            return res.status(404).send()
        }

        res.send(zip)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/:zipNumber', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['isHealthy']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const zip = await Zip.findOne({ zipNumber: req.params.zipNumber })

        if (!zip) {
            return res.status(404)
        }

        updates.forEach((update) => zip[update] = req.body[update])
        await zip.save()
        res.send(zip)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/:zipNumber', async (req, res) => {
    try {
        const zip = await Zip.findOne({ zipNumber: req.params.zipNumber })

        if (!zip) {
            return res.status(404).send()
        }

        await zip.remove()
        await Task.deleteMany({ zipNumber: zip.zipNumber })
        
        res.send(zip)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router