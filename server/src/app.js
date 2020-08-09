const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(parser.json());
app.use(cors());

app.get('/api/test', (req, res) => {
  console.log('wörked');
});

app.use('/', express.static(path.join(__dirname, '../../client/dist')));

app.listen(8081);
