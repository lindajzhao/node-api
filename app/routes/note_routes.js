//  In Express, routes are wrapped in a function, which takes 
// the Express instance and a database as arguments.

module.exports = function(app, db) {
    // When the app recieves a `post` request to `localhost:8000/notes`,
    // it will execute the code inside and send the request and 
    // return a response
    app.post('/notes', (request, response) => {
        console.log(request.body)
        response.send('Hello')
    })
}