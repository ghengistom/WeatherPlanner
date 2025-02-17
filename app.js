
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

const cors = require('cors');
var app = express();

// Enable CORS for all origins
app.use(cors());

const port = process.env.port || 5000

console.log('process.env.PORT', process.env.PORT)
app.set('port', process.env.PORT || 5000);
app.use(favicon(__dirname + '/public/images/favicon.png'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/build')));

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);
