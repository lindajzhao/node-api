const config = require('../../config/db');
var ObjectID = require('mongodb').ObjectID;

// In Express, routes are wrapped in a function, which takes 
// the Express instance and a database as arguments.
module.exports = function(app, db) {
    // Specify collection in cluster to interact with
    const collection = db.collection(config.defaultCollection);

    // When the app recieves a `post` request to `localhost:8000/notes`,
    // it will execute the code inside and send the request and 
    // return a response
    app.post('/notes', (request, response) => {
        const { body = {} } = request;
        const { title, contents } = body;
        
        if (title) {
            const note = { title, contents };

            collection.insert(note, (err, result) => {
                if (err) { 
                  response.send({ 'error': `An error has occurred while POSTing: ${err}` }); 
                } else {
                  response.send(result.ops[0]);
                }
            });
        } else {
            response.send('Failed to post. Needs a title'); 
        }
    })

    // Read (retrieve) from collection
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        collection.findOne(details, (err, item) => {
          if (err) {
            res.send({ 'error': `An error has occurred while GETing: ${err}` }); 
          } else {
            res.send(item);
          } 
        });
      });

      // Delete
      app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        collection.remove(details, (err, item) => {
          if (err) {
            res.send({ 'error': `An error has occurred while DELETEing: ${err}` }); 
          } else {
            res.send('Note ' + id + ' deleted!');
          } 
        });
      });
}