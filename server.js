import apiRouter from './api/index';
const apiRouter = require('./api');
const express = require('express');
const bodyParser =  require('body-parser');

const server = express();
const port = process.env.PORT ||  5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

// server.use('/api', apiRouter)

server.listen(port, () => console.log(`Listening on port ${port}`));