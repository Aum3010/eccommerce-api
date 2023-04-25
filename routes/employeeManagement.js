const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all carts
router.get('/carts', (req, res) => {
  db.query('SELECT * FROM Cart', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Get a specific cart by ID
router.get('/carts/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Cart WHERE cart_id = ?', id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Create a new cart
router.post('/carts', (req, res) => {
  const { user_id } = req.body;
  const values = [user_id];
  db.query('INSERT INTO Cart (user_id) VALUES (?)', values, (err, result) => {
    if (err) throw err;
    res.send('New cart added to the database!');
  });
});

// Update an existing cart by ID
router.put('/carts/:id', (req, res) => {
  const id = req.params.id;
  const { user_id } = req.body;
  const values = [user_id, id];
  db.query('UPDATE Cart SET user_id = ? WHERE cart_id = ?', values, (err, result) => {
    if (err) throw err;
    res.send('Cart information updated successfully!');
  });
});

// Delete an existing cart by ID
router.delete('/carts/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Cart WHERE cart_id = ?', id, (err, result) => {
    if (err) throw err;
    res.send('Cart deleted from the database!');
  });
});

module.exports = router;
