const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('./config');

const db = require('./db');

const app = express();

app.use(bodyParser.json({limit: '200mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
app.use(require('./routes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(config.serverPort, () => console.log(`Server running on port ${config.serverPort}`));
