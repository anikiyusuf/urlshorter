require('dotenv').config()
const express =  require("express")
const  rateLimit = require('express-rate-limit')
const router = require('./routes/urlRoutes');
const logger = require("./logger/logger")
const { connectionMongoDB  } = require("./db")
const app = express()
PORT = process.env.PORT || 3334


connectionMongoDB()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// RATE liMITING FOR 15 minutes
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)



app.use('/', router);

// Handle 404
app.get('*', function(req, res) {
  //res.status(404).send('404 Page Not Found.')
  res.status(404).render('404');
})

// app.get('/', async (req, res) => {
//     const shortUrls = await ShortUrl.find()
//     res.render('index', { shortUrls: shortUrls })
//   })
  
//   app.post('/shortUrls', async (req, res) => {
//     await ShortUrl.create({ full: req.body.fullUrl })
  
//     res.redirect('/')
//   })

// app.get('/:shortUrl', async (req, res) => {
//     const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
//     if (shortUrl == null) return res.sendStatus(404)
  
//     shortUrl.clicks++
//     shortUrl.save()
  
//     res.redirect(shortUrl.full)
//   })
  
app.listen(process.env.PORT, () => {
    logger.info(`server running on localhost:${process.env.PORT}`)
})