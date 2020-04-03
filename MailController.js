const { generateImages } = require('./imageHandler');
const { sendMail } = require('./mailer');
const { sendConfirmationMail } = require('./confirmationMailer');

const confirmation = (req, res) => {
  const discount = getDiscount(req.body.promotionPrice, req.body.refPrice);
  const mailInfo = {
    to: req.body.to,
    productName: req.body.productName,
    promotionPrice: req.body.promotionPrice,
    refPrice: req.body.refPrice,
    permalink: req.body.permalink,
  };
  console.log('---------------------------------');
  console.log({ mailInfo });
  sendConfirmation(req.body.image, discount, mailInfo).then(() => {
    res.status(200).send({ message: 'ok' });
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};

const instagram = (req, res) => {
  const discount = getDiscount(req.body.promotionPrice, req.body.refPrice);
  const mailInfo = {
    to: req.body.to,
    companyName: req.body.companyName,
    productName: req.body.productName,
    promotionPrice: req.body.promotionPrice,
    refPrice: req.body.refPrice,
    productDescription: req.body.productDescription,
    companyDescription: req.body.companyDescription,
  };
  sendInstagramMail(req.body.image, discount, mailInfo).then(() => {
    res.status(200).send({ message: 'ok' });
  }).catch((err) => {
    res.status(500).send(err);
  });
};

const sendInstagramMail = async (image, discount, mailInfo) => {
  await generateImages(image, discount);
  await sendMail(mailInfo);
};

const sendConfirmation = async (image, discount, mailInfo) => {
  await generateImages(image, discount);
  await sendConfirmationMail(mailInfo);
};

const getDiscount = (promotionPrice, refPrice) => {
  return Math.round(
    100 - (100 * (promotionPrice / refPrice)),
  );
};


module.exports = {
  confirmation,
  instagram,
};
