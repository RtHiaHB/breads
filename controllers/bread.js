const router = require('express').Router()
const Bread = require('../models/bread')

router.get('/', async (req, res) => {
    const bread = await Bread.find()
    res.render('index', {
        breads: bread
    })

})

// Get:create new bread page
router.get('/new', (req, res) => {
    res.render('new')
})

//Get: Edit bread page
router.get('/:index/edit', (req, res) => {
    const { index } = req.params
    const bread = Bread[index]
    res.render('edit', {
        bread,
        index
    })
} )

//query parameter
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const bread = await Bread.findById(id)
    res.render('show', {
        bread
    })
    //res.send(Bread[index]);
})

router.post('/', async (req, res) => {
    const { hasGluten, image } = req.body
    if(!image) req.body.image = undefined
    if (hasGluten === 'on') {
        req.body.hasGluten = true;
    } else {
        req.body.hasGluten = false;
    }
    
    let mongoRes = await Bread.create(req.body)
    console.log(mongoRes)
    res.redirect('/breads')
})

router.put('/:index', (req, res) => {
    const { index } = req.params
    const { image, hasGluten } = req.body
    if (!image) req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg'
    if (hasGluten === 'on') {
        req.body.hasGluten = true;
    } else {
        req.body.hasGluten = false;
    }

    Bread[index] = req.body
    res.redirect(`/breads/${index}`)
})

// DELETE a bread
router.delete('/:index', (req, res) => {
    const { index } = req.params
    const numIndex = Number(index)
    Bread.splice(numIndex, 1)
    res.status(303).redirect('/breads')
})

module.exports = router