const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config');
const connection = require('./db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const employee = require('./routes/employeeManagement');
const order = require('./routes/orderManagement');
const userOrder = require('./routes/userOrderManagement');
const orderItems = require('./routes/orderItems');
const products = require('./routes/products');


// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const express = require('express');

const app = express();


async function main() {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Define session store
  const sessionStore = new MySQLStore({
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
      tableName: 'Session',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  }, connection);

  // Initialize passport
  require('./passport')(passport, connection);

  // Define middleware
  app.use(express.json());
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  require('./passport')(passport, connection);

  // Define routes
  app.use('/', authRoutes);
  app.use('/users', userRoutes);
  app.use('/', employee);
  app.use('/', order);
  app.use('/', userOrder);
  app.use('/orderItems', orderItems);
  app.use('/products', products);
 

  // Start server
  app.listen(3000, () => {
    console.log('Server started on port 3000.');
  });
}

main().catch(console.error);
