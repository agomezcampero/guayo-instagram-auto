const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  debug: false,
  logger: true,
});

const TEMPLATE = `
<p>Hola!</p>
<p>Hemos subido exitosamente tu producto a la plataforma guayo. Puedes ver en este <a href="$PERMALINK$"> LINK </a> la publicación.</p>
<p>Para mejorar la difusión te recomendamos que subas a tus RR.SS. un post informando que ahora formas parte de la comunidad Guayo. Adjunto van unas gráficas explicativas de la plataforma guayo. Ten toda la libertad de usarlas para comunicarle a tu comunidad lo que estamos haciendo.</p>
<p>Saludos,</p>
<p>El equipo guayo</p>
`;

const getAttachments = (productName) => {
  return [{
    filename: `${productName}verde.jpg`,
    path: `${__dirname}/foto1080verde.jpg`,
  },
  {
    filename: `${productName}naranjo.jpg`,
    path: `${__dirname}/foto1080naranjo.jpg`,
  },
  {
    filename: `${productName}negro.jpg`,
    path: `${__dirname}/foto1080negro.jpg`,
  },
  {
    filename: `${productName}azul.jpg`,
    path: `${__dirname}/foto1080azul.jpg`,
  }];
};


const getMessage = (to, permalink, productName) => {
  let text = `${TEMPLATE}`;
  text = text.replace('$PERMALINK$', permalink);
  const message = {
    from: '¡Bienvenido a Guayo!',
    to,
    subject: '¡Bienvenido a Guayo!',
    text,
    attachments: getAttachments(productName),
  };
  return message;
};

const sendConfirmationMail = (mailInfo) => {
  return new Promise((resolve, reject) => {
    transport.sendMail(getMessage(mailInfo), (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

module.exports.sendConfirmationMail = sendConfirmationMail;
