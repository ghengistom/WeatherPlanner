
/**
 * Module dependencies.
 */
var apiRoutes = require('./apiRoutes.js')
var sqlite3 = require('sqlite3')
var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

const cors = require('cors');
var app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// Enable CORS for all origins
app.use(cors());
// const port = process.env.port || 5000
const port = 5000;

//Connect to Database
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });


app.post('/api/user', jsonParser, async (req, res) => {
  try {
      console.log('req.body', req.body);
      console.log('Inside router.post');
      const sql = 'INSERT INTO users(id, ipaddress, gpsx, gpsy) VALUES(?, ?, ?, ?)';
      const data = [req.body.id, req.body.ipaddress, req.body.gpsx, req.body.gpsy];
  
      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });

      res.send(JSON.stringify('200'));
    res.status(201);
  } catch (err) {
    console.error(err);
    console.error(err.body);

    res.status(500).send('Server error');
  }

});

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

// app.post('/user', async (req, res) => {
//   try {
//       console.log('req.body', req.body);
//       console.log('Inside router.post');
//     res.status(201).json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }

// });



app.listen(port);
