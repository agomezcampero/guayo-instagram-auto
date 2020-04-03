const fs = require('fs');
const request = require('request');
const im = require('imagemagick');

const download = function (uri, filename, callback) {
  request.head(uri, (err, res, body) => {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
};

const resize = function (callback) {
  im.convert(
    [
      'foto.jpeg',
      '-resize',
      '1080x1080^',
      '-gravity',
      'center',
      '-crop',
      '1080x1080+0+0',
      '+repage',
      'foto1080.jpg',
    ],
    callback,
  );
};

const join = function (color, callback) {
  im.convert(
    [
      'foto1080.jpg',
      `marco-${color}.png`,
      '-composite',
      'banner.png',
      '-composite',
      `foto1080${color}.jpg`,
    ],
    callback,
  );
};

const addText = function (discount, color, callback) {
  im.convert(
    [
      `foto1080${color}.jpg`,
      '-background',
      'transparent',
      '-pointsize',
      '40',
      '-font',
      'Helvetica-Bold',
      '-fill',
      'white',
      '-weight',
      '700',
      `label: -${discount}%`,
      '-geometry',
      '+930+22',
      '-composite',
      `foto1080${color}.jpg`,
    ],
    callback,
  );
};

const colors = ['verde', 'azul', 'negro', 'naranjo'];

const generateImages = async (imageUrl, discount, callback) => {
  let itemsProcessed = 0;
  download(imageUrl, 'foto.jpeg', () => {
    console.log('downloaded');
    resize((err, stdout) => {
      if (err) throw err;
      console.log('resized');
      colors.forEach((c) => {
        join(c, (err, stdout) => {
          if (err) throw err;
          console.log('joined');
          addText(discount, c, (err, stdout) => {
            if (err) throw err;
            console.log('text added');
            itemsProcessed += 1;
            if (itemsProcessed === 4) callback();
          });
        });
      });
    });
  });
};

module.exports.generateImages = generateImages;
