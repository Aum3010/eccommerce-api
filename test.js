const db = require('./db');

// Test connection
db.getConnection().then((connection) => {
  connection.query('show tables', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
}).catch((error) => {
  console.log(error);
});
