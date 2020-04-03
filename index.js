
const express = require('express');
const { generateImages } = require('./imageHandler');
const { sendMail } = require('./mailer');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post('/', async (req, res) => {
  const discount = Math.round(
    100 - (100 * (req.body.promotionPrice / req.body.refPrice)),
  );
  const mailInfo = {
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

console.log('TERMINAMOS)');


module.exports = server;
