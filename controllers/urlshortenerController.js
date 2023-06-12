const ShortUrl = require("../model/urlShorter")



async function getShortUrls(req, res) {
    try {
      const shortUrls = await ShortUrl.find();
      res.render('index', { shortUrls: shortUrls });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

// async function createShortUrl(req, res) {
//      const newUrl =  await ShortUrl.create({ full: req.body.fullUrl })
//       console.log(JSON.stringify(newUrl))
//      .then(() => {
//       res.redirect('/');
//     })
//     .catch((error) => {
//       // Handle any error that occurred during the database operation
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     });
   
//   }
async function createShortUrl(req,res){
  ShortUrl.create({ full : req.body.fullUrl})
  res.redirect('/')
}


async function redirectToFullUrl(req, res) {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);
  
    shortUrl.clicks++;
    shortUrl.save();
  
    res.redirect(shortUrl.full);
    
  }
  

module.exports = {
     getShortUrls,
     createShortUrl,
    redirectToFullUrl }