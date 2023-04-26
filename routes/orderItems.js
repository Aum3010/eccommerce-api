const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all OrderItems
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM OrderItems';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// GET a specific OrderItem by order ID and product ID
router.get('/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  const sql = 'SELECT * FROM OrderItems WHERE O_id = ? AND P_id = ?';
  db.query(sql, [orderId, productId], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ message: 'Order item not found.' });
    } else {
      res.json(result[0]);
    }
  });
});
// CREATE a new OrderItem
router.post('/', (req, res) => {
  const { orderId, productId, quantity } = req.body;
  if (!orderId || !productId) {
    return res.status(400).json({ message: 'Order ID and product ID are required.' });
  }
  const sql = 'INSERT INTO OrderItems (O_id, P_id, OI_qty) VALUES (?, ?, ?)';
  db.query(sql, [orderId, productId, quantity], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Order item created.', id: result.insertId });
  });
});

// UPDATE an existing OrderItem
router.put('/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity } = req.body;
  if (!quantity) {
    return res.status(400).json({ message: 'Quantity is required.' });
  }
  const sql = 'UPDATE OrderItems SET OI_qty = ? WHERE O_id = ? AND P_id = ?';
  db.query(sql, [quantity, orderId, productId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Order item not found.' });
    } else {
      res.json({ message: 'Order item updated.' });
    }
  });
});

// DELETE an existing OrderItem
router.delete('/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  const sql = 'DELETE FROM OrderItems WHERE O_id = ? AND P_id = ?';
  db.query(sql, [orderId, productId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Order item not found.' });
    } else {
      res.json({ message: 'Order item deleted.' });
    }
  });
});

module.exports = router;
