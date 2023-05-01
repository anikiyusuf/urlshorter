require('dotenv').config()
const express =  require("express")
const ShortUrl = require('./model/urlShorter')
const { connectionMongoDB  } = require("./db")
const app = express()
PORT = process.env.PORT || 3334


connectionMongoDB()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


// app.get("/" , (req,res) => {
//     res.render("index")
// })
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
  
app.listen(process.env.PORT, () => {
    console.log(`server running on localhost:${process.env.PORT}`)
})