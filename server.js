var express = require('./config/express');
var app = express();

app.listen(8080);
console.log('Server running at http://localhost:8080/');

module.exports = app;
