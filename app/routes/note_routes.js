//  In Express, routes are wrapped in a function, which takes 
// the Express instance and a database as arguments.

module.exports = function(app, db) {
    console.log('____ note routes.js. app', app)
    console.log('____ note routes.js. db', db)
}