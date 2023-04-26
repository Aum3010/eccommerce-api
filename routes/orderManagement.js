const express = require('express');
const router = express.Router();
const db = require('../db');
let nextOrderId = 101;

// POST /orders
router.post('/orders', (req, res) => {
  const { amount, address } = req.body;
  const orderId = nextOrderId++; // generate random orderId between 1 and 250
  const sql = 'INSERT INTO Orders (O_id, O_Amount, O_Address) VALUES (?, ?, ?)';
  db.query(sql, [orderId, amount, address], (err, result) => {
    if (err) throw err;
    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertId
    });
  });
});

// GET /orders
router.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM Orders';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
  });

  // GET /orders/:id
router.get('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const sql = 'SELECT * FROM Orders WHERE O_id = ?';
    db.query(sql, [orderId], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  });

  // PUT /orders/:id
router.put('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const { amount, address } = req.body;
    const sql = 'UPDATE Orders SET O_Amount = ?, O_Address = ? WHERE O_id = ?';
    db.query(sql, [amount, address, orderId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(200).json({ message: 'Order updated successfully' });
      }
    });
  });
// DELETE /orders/:id
router.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const sql = 'DELETE FROM Orders WHERE O_id = ?';
    db.query(sql, [orderId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.status(200).json({ message: 'Order deleted successfully' });
      }
    });
  });
    
  // Get the status of a specific order by ID
router.get('/orders/:id/status', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Orders WHERE O_id = ?', id, (err, orderResult) => {
      if (err) throw err;
      if (orderResult.length === 0) {
        res.status(404).send('Order not found!');
      } else {
        db.query('SELECT * FROM UserOrder WHERE O_id = ?', id, (err, userResult) => {
          if (err) throw err;
          if (userResult.length === 0) {
            res.status(500).send('Unexpected error occurred!');
          } else {
            const user_id = userResult[0].U_id;
            db.query('SELECT * FROM User WHERE U_id = ?', user_id, (err, userResult) => {
              if (err) throw err;
              res.send({
                orderId: orderResult[0].O_id,
                status: orderResult[0].O_status,
                user: {
                  id: userResult[0].U_id,
                  name: userResult[0].U_name,
                },
              });
            });
          }
        });
      }
    });
  });
// Get all orders for a specific user by ID
router.get('/users/:id/orders', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM UserOrder WHERE U_id = ?', id, (err, result) => {
      if (err) throw err;
      const orderIds = result.map((row) => row.O_id);
      if (orderIds.length === 0) {
        res.send([]);
      } else {
        db.query(`SELECT * FROM Orders WHERE O_id IN (${orderIds.join(',')})`, (err, orderResult) => {
          if (err) throw err;
          const orders = orderResult.map((order) => {
            const userOrder = result.find((row) => row.O_id === order.O_id);
            return {
              orderId: order.O_id,
              amount: order.O_Amount,
              address: order.O_Address,
              status: userOrder.O_status,
            };
          });
          res.send(orders);
        });
      }
    });
  });
  module.exports = router;