const express = require('express');
require('dotenv').config();

const breadRoutes = require('./controllers/bread')

const app = express();

// MIDDLEWARE
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//Routes
app.use('/breads', breadRoutes)

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('<h1>main page</h1>')
})

app.listen(PORT, console.log(`Listening on port ${PORT}`))