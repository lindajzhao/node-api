// Dependencies
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

// Instantiate Express
const app = express();

// Config
const routes = require('./app/routes');
const db = require('./config/db');
const port = 8000;

// Add middleware to parse URL encoded form request bodies
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) {
        return console.log(err)
    }

    // Specify database name
    const mLabDB = database.db("Cluster0")

    routes(app, mLabDB);
    
    app.listen(port, () => {
        console.log('Listening on port', port)
    })
})