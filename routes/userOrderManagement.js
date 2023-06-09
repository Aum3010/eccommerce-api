const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all user-orders
router.get('/user-orders', (req, res) => {
  const sql = 'SELECT * FROM UserOrder';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error retrieving user-orders.',
        error: err
      });
    }
    res.json(result);
  });
});

// Assign an order to a user
router.post('/user-orders/', (req, res) => {
  const { orderId, userId } = req.body;

  const checkSql = 'SELECT O_id FROM orders WHERE O_id = ?';
  db.query(checkSql, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error assigning order to user.',
        error: err
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        message: `Order with ID ${orderId} not found.`
      });
    }
    const sql = 'INSERT INTO UserOrder (O_id, U_id) VALUES (?, ?)';
    db.query(sql, [orderId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Error assigning order to user.',
          error: err
        });
      }
      res.json({ message: 'Order assigned to user successfully.' });
    });
  });
});

// Update the assignment of an order to a user
router.put('/user-orders/:orderId/:userId', (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.params.userId;

  const checkSql = 'SELECT O_id FROM orders WHERE O_id = ?';
  db.query(checkSql, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error updating order assignment.',
        error: err
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        message: `Order with ID ${orderId} not found.`
      });
    }

    const sql = 'UPDATE UserOrder SET U_id = ? WHERE O_id = ?';
    db.query(sql, [userId, orderId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Error updating order assignment.',
          error: err
        });
      }
      res.json({ message: 'Order assignment updated successfully.' });
    });
  });
});

// Remove an order from a user
router.delete('/user-orders/remove/:orderId/:userId', (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.params.userId;

  const checkSql = 'SELECT O_id FROM orders WHERE O_id = ?';
  db.query(checkSql, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error removing order from user.',
        error: err
      });
    }
    if (result.length === 0) {
      return res.status(400).json({
        message: `Order with ID ${orderId} not found.`
      });
    }

    const sql = 'DELETE FROM UserOrder WHERE O_id = ? AND U_id = ?';
    db.query(sql, [orderId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Error removing order from user.',
          error: err
        });
      }
      res.json({ message: 'Order removed from user successfully.' });
    });
  });
});

module.exports = router;


