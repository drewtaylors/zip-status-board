const express = require('express')
const Zip = require('../models/zip')
const router = new express.Router()

router.get('/', (req, res) => {
    res.render('fleet', {
        title: 'Zip Fleet'
    })
})

router.get('/add', (req, res) => {
    res.render('add_zip', {
        title: 'Add Zip to Fleet'
    })
})

router.get('/delete', async (req, res) => {
    res.render('delete_zip', {
        title: 'Delete Zip from Fleet'
    })
})

router.get('/:zipNumber', async (req, res) => {
    try {
        const zip = await Zip.findOne({ zipNumber: req.params.zipNumber })

        if (!zip) {
            return res.status(404).send()
        }

        res.render('zip', {
            title: `Zip ${req.params.zipNumber}`
        })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router