const express = require('express');
const router = express.Router();
const connection = require('../db');

// Search for products by name, category, price range
router.get('/', (req, res) => {
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