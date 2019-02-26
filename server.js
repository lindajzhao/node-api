const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const app = express();

const port = 8000;

// use package to parse URL encoded form request bodies
app.use(bodyParser.urlencoded({ extended: true }));

routes(app, {});
app.listen(port, () => {
    console.log('We are live on', port)
})