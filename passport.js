const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const config = require('./config');

module.exports = (passport, connection) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      connection.query('SELECT * FROM User WHERE U_name = ?', [username], (err, results) => {
        if (err) return done(err);
        if (!results.length) return done(null, false, { message: 'Incorrect username.' });
        const user = results[0];
        bcrypt.compare(password, user.U_pass, (err, result) => {
          if (err) return done(err);
          if (!result) return done(null, false, { message: 'Incorrect password.' });
          return done(null, user);
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.U_id);
  });

  passport.deserializeUser((id, done) => {
    connection.query('SELECT * FROM User WHERE U_id = ?', [id], (err, results) => {
      if (err) return done(err);
      done(null, results[0]);
    });
  });
};
