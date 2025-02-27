//server.js
var sqlite3 = require('sqlite3');
var express = require('express');
const router = express.Router();
//const app = express();
//app.use('/user', router);

//Connect to Database
// const db = new sqlite3.Database('users.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected to the database.');
//   });

  let userType = {
    id: 0,
    ipaddress: 0,
    gpsx: 0,
    gpsy: 0
}


//function apiRoutes () {

    console.log('Inside apiRoutes daddy');
    // const sql = 'INSERT INTO users(id, ipaddress, gpsx, gpsy) VALUES(?, ?, ?, ?)';
    // const data = [1, '123.312', 123.256, 62.3659];

    // db.run(sql, data, function(err) {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log(`A row has been inserted with rowid ${this.lastID}`);
    // });


    // router.post('/api/user', async (req, res) => {
    //     try {
    //         console.log('req.body', req.body);
    //         console.log('Inside router.post');
    //         res.send('<p>Hellow world<p>');
    //       res.status(201).json(rows[0]);
    //     } catch (err) {
    //       console.error(err);
    //       console.error(err.body);

    //       res.status(500).send('Server error');
    //     }
    
    // });

//}

module.exports = router;
