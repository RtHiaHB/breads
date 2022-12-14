const router = require('express').Router()
const Baker = require('../models/baker')
const bakerSeedData = require('../models/bakerSeedData')

router.get('/data/seed', async (req, res) => {
    await Baker.insertMany(bakerSeedData)
    res.redirect('/breads')
})

module.exports = router