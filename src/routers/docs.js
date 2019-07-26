const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => {
    res.render('docs', {
        title: 'Docs'
    })
})

module.exports = router