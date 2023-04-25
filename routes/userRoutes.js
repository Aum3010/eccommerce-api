const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get all users
router.get('/', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await connection.promise().query('SELECT * FROM User WHERE U_id = ?', [userId]);
    res.json(result[0]);
  } catch (error) {
    console.log("getUserById: ", error);
    res.status(500).send('Internal Server Error');
  }
});

// Create new user
router.post('/', (req, res) => {
    const { U_name, U_pass } = req.body;

    // Check if the user already exists
    connection.query('SELECT * FROM User ORDER BY U_id DESC LIMIT 1', (err, results) => {
        if (err) throw err;

        let newUserId = 1; // Default id if no user exists yet

        if (results.length > 0) {
            // Get the last user id and increment it
            newUserId = results[0].U_id + 1;
        }

        // Insert the new user with the incremented id
        connection.query('INSERT INTO User (U_id, U_name, U_pass) VALUES (?, ?, ?)', [newUserId, U_name, U_pass], (err, results) => {
            if (err) throw err;
            res.json({ message: 'User created successfully.', id: newUserId });
        });
    });
});

// Update user by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { U_name,  U_pass } = req.body;
    connection.query('UPDATE User SET U_name = ? , U_pass = ? WHERE U_id = ?', [U_name, U_pass, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'User updated successfully.', affectedRows: results.affectedRows });
    });
});

// Delete user by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM User WHERE U_id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully.', affectedRows: results.affectedRows });
    });
});


// Search for products by name, category, price range
router.get('/products', (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM Product WHERE 1=1';
    if (name) query += ` AND P_name LIKE '%${name}%'`;
    if (category) query += ` AND P_category = '${category}'`;
    if (minPrice) query += ` AND P_price >= ${minPrice}`;
    if (maxPrice) query += ` AND P_price <= ${maxPrice}`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
