const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
  debug: false,
  logger: true
});

const formatPrice = price => {
  output = "$";
  digits = price.toString();
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) output += ".";
    output += digits[i];
  }
  return output;
};

const getMessage = mailInfo => {
  const {
    to,
    companyName,
    productName,
    promotionPrice,
    refPrice,
    productDescription,
    companyDescription
  } = mailInfo;
  const message = {
    from: "elonmusk@tesla.com",
    to: to,
    subject: `Fotos Guayo: ${companyName} - ${productName}`,
    text: `${companyName} - ${productName}\n\nPrecio promoción: ${formatPrice(
      promotionPrice
    )}\nPrecio referencia: ${formatPrice(
      refPrice
    )}\n\n${productDescription}\n\n${companyDescription}\n\n#hoyportimañanapormi #guayo #guayochile #apoyoalaspymes`,
    attachments: [
      {
        // Use a URL as an attachment
        filename: productName + "verde.jpg",
        path: __dirname + "/foto1080verde.jpg"
      },
      {
        // Use a URL as an attachment
        filename: productName + "naranjo.jpg",
        path: __dirname + "/foto1080naranjo.jpg"
      },
      {
        // Use a URL as an attachment
        filename: productName + "negro.jpg",
        path: __dirname + "/foto1080negro.jpg"
      },
      {
        // Use a URL as an attachment
        filename: productName + "azul.jpg",
        path: __dirname + "/foto1080azul.jpg"
      }
    ]
  };
  return message;
};

const sendMail = mailInfo => {
  transport.sendMail(getMessage(mailInfo), function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports.sendMail = sendMail;
