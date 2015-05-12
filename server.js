process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose();
var app = express(db);
var app = express();
var passport = passport();

app.listen(8080);

console.log('Server running at http://localhost:8080/');

module.exports = app;
