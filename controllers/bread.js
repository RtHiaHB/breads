const router = require('express').Router()
const Bread = require('../models/bread')
const seedData = require('../models/seedData')

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
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('edit', {
        bread
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

router.get('/data/seed', async (req, res) => {
    await Bread.insertMany(seedData)
    res.redirect('/breads')
})

router.get('/data/delete', async (req,res) => {
    await Bread.deleteMany()
    res.redirect('/breads')
})

router.post('/', async (req, res) => {
    const { hasGluten, image } = req.body
    if(!image) req.body.image = undefined
    if (hasGluten === 'on') {
        req.body.hasGluten = true;
    } else {
        req.body.hasGluten = false;
    }
    
    await Bread.create(req.body)
    res.redirect('/breads')
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { image, hasGluten } = req.body
    if (!image) req.body.image = 'https://suebeehomemaker.com/wp-content/uploads/2021/10/sliced-french-bread.jpg'
    if (hasGluten === 'on') {
        req.body.hasGluten = true;
    } else {
        req.body.hasGluten = false;
    }
    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)
})

// DELETE a bread
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Bread.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
})

module.exports = router