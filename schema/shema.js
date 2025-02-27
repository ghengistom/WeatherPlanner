const sqlite3 = require('sqlite3').verbose();

//Connect to Database
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });

function schema() {

    let userType = {
        id: 0,
        ipaddress: 0,
        gpsx: 0,
        gpsy: 0
    }
    
    db.run("CREATE TABLE IF NOT EXISTS users (id integer NOT NULL, ipaddress text NOT NULL, gpsx REAL, gpsy REAL);");
    
    const user = { name: 'John Doe', email: 'john.doe@example.com' };
    const sql = "INSERT INTO users (userType.id, userType.ipaddress, ipaddress.gpsx, ipaddress.gpsy) VALUES (?, ?, ?, ?)";
    
    db.run(sql, [user.name, user.email], function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    
    db.close();
}

module.exports = schema;