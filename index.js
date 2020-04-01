const express = require('express');

const app = express();
app.use(express.json());
const { generateImages } = require('./imageHandler');
const { sendMail } = require('./mailer');

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post('/', async (req, res) => {
  const discount = Math.round(
    100 - 100 * (req.body.promotionPrice / req.body.refPrice),
  );
  mailInfo = {
    to: req.body.to,
    companyName: req.body.companyName,
    productName: req.body.productName,
    promotionPrice: req.body.promotionPrice,
    refPrice: req.body.refPrice,
    productDescription: req.body.productDescription,
    companyDescription: req.body.companyDescription,
  };
  generateImages(req.body.image, discount, () => {
    sendMail(mailInfo);
  });

  res.send('hello world');
});

app.get('/', (req, res) => {
  res.send('hello world');
});
