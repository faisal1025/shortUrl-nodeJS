const express = require('express')
const urlRoutes = require('./routers/urls')
const userRoutes = require('./routers/users')
const connectMongoDb = require('./connection')
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const path = require('path')
const { restrictLoggedIn, isLoggedIn } = require('./middlewares/auth')
const URL = require('./models/urls')

const app = express()
const port = 8000

connectMongoDb("mongodb://127.0.0.1:27017/url-short").then(()=>{
    console.log('Mongodb Connected');
})

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', restrictLoggedIn, async (req, res)=>{
    const result = await URL.find({createdBy: req.user.id});
    res.status(200).render('home', {
        url: result,
        user: req.user
    })
})

app.use('/url', restrictLoggedIn, urlRoutes)
app.use('/user', userRoutes)


app.listen(port, ()=>console.log(`Server is running on port ${port}`))