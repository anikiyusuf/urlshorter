const ShortUrl = require("../model/urlShorter")
const QRCode = require("qrcode-generator");
const fs = require("fs");



async function getShortUrls(req, res) {
    try {
      const shortUrls = await ShortUrl.find();
      res.render('index', { shortUrls: shortUrls });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  

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

  async function generateQRCode(req, res){
            try{
              const shortUrl = await ShortUrl.findOne({ short : req.params.shortUrl})
                  if( shortUrl == null ) return res.sendStatus(404)
                   
                  const qrCodeData = shortUrl.full;
                  const qrCodePath = `public/qrcodes/${shortUrl.short}.png`;
           
                    const qrCode = QRCode(O , 'L');
                    qrCode.addData(qrCodeData);
                    qrCode.make();
                    
                    const qrCodeImage = qrCode.createDataURL(10);

                    fs.writeFileSync(qrCodePath , qrCodeImage.split('.')[1], 'base64')

                    res.download(qrCodePath , 'qrcode.png' , (error) => {
                      if(error){
                        console.error(error)
                        res.status(500).send("Internal Server Error")
                      }
                        // Delete the QR code image file after download
                      fs.unlinkSync(qrCodePath)
                    })
             }catch(error){
              console.error(error)
              res.status(500).send('Internal Server Error')
             }
  }
  

module.exports = {
     getShortUrls,
     createShortUrl,
     redirectToFullUrl,
     generateQRCode
    }