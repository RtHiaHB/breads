const router = require('express').Router()
const Bread = require('../models/bread')

router.get('/', (req, res) => {
    res.render('index', {
        breads: Bread
    })

})

// Get:create new bread page
router.get('/new', (req, res) => {
    res.render('new')
})

//query parameter
router.get('/:index', (req, res) => {
    const { index } = req.params;
    res.render('show', {
        bread: Bread[index]
    })
    //res.send(Bread[index]);
})

router.post('/', (req, res) => {
    const { hasGluten, image } = req.body
    if (!image) req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg'
    if (hasGluten === 'on') {
        req.body.hasGluten = true;
    } else {
        req.body.hasGluten = false;
    }
    try {
        new URL(image)
    } catch (error) {
        console.log('error saving image:', error)
        res.render('new', {
            error: 'not a valid image'
        })
        return
    }
    Bread.push(req.body)
    res.redirect('/breads')
})

module.exports = router