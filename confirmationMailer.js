const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  service: 'gmail',
  auth: {
    user: process.env.CONFIRMATION_EMAIL,
    pass: process.env.CONFIRMATION_PASSWORD,
  },
  debug: false,
  logger: true,
});

const TEMPLATE = `
<p>Hola!</p>
<p>Hemos subido exitosamente tu producto a la plataforma guayo. Puedes ver en este <a href="$PERMALINK$"> LINK </a> la publicación.</p>
<p>Para mejorar la difusión te recomendamos que subas a tus RR.SS. un post informando que ahora formas parte de la comunidad Guayo. Adjunto van unas gráficas explicativas de la plataforma guayo más unas gráficas de tu producto. Ten toda la libertad de usarlas para comunicarle a tu comunidad lo que estamos haciendo.</p>
<p>Saludos,</p>
<p>El equipo guayo</p>
`;

// eslint-disable-next-line max-lines-per-function
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
  },
  {
    filename: 'Gráfica explicativa 1.png',
    path: `${__dirname}/images/grafica1.png`,
  },
  {
    filename: 'Gráfica explicativa 2.png',
    path: `${__dirname}/images/grafica2.png`,
  }];
};


const getMessage = (data) => {
  data = data || {};
  let text = `${TEMPLATE}`;
  text = text.replace('$PERMALINK$', data.permalink);
  const message = {
    from: '¡Bienvenido a Guayo!',
    to: data.to,
    subject: '¡Bienvenido a Guayo!',
    html: text,
    attachments: getAttachments(data.productName),
  };
  return message;
};

const sendConfirmationMail = (data) => {
  return new Promise((resolve, reject) => {
    const message = getMessage(data);
    console.log({ message });
    transport.sendMail(message, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

module.exports.sendConfirmationMail = sendConfirmationMail;
