const fs = require('fs');
const request = require('request');
const im = require('imagemagick');

const download = (uri, filename, callback) => {
  request.head(uri, () => {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on('close', callback);
  });
};

const resize = (callback) => {
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

const join = (color, callback) => {
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

// eslint-disable-next-line max-lines-per-function
const addText = (discount, color, callback) => {
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

const generateImages = (imageUrl, discount) => {
  let itemsProcessed = 0;
  return new Promise((resolve, reject) => {
    download(imageUrl, 'foto.jpeg', () => {
      resize((downloadError) => {
        if (downloadError) return reject(downloadError);
        colors.forEach((c) => {
          join(c, (joinError) => {
            if (joinError) return reject(joinError);
            addText(discount, c, (textError) => {
              if (textError) return reject(textError);
              itemsProcessed += 1;
              if (itemsProcessed === 4) resolve();
            });
          });
        });
      });
    });
  });
};

module.exports.generateImages = generateImages;
