
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const MailController = require('./MailController');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.post('/', async (req, res) => {
  console.log('vmaos aca');
  MailController.instagram(req, res);
});

app.post('/confirmationMail', async (req, res) => {
  MailController.confirmation(req, res);
});

app.get('/', (req, res) => {
  res.send('hello world');
});


module.exports = server;
