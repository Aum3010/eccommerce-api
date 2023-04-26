const express = require('express');
const router = express.Router();
const db = require('../db');
let empId = 101;

// Get all employees
router.get('/employees', (req, res) => {
  db.query('SELECT * FROM Employee', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Get a specific employee by ID
router.get('/employees/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Employee WHERE E_id = ?', id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Create a new employee
router.post('/employees', (req, res) => {
  const { name, password } = req.body;
  const EmployeeId = empId++;
  const values = [EmployeeId, name, password];
  db.query('INSERT INTO Employee (E_id,E_name, E_pass) VALUES (?,?, ?)', values, (err, result) => {
    if (err) throw err;
    res.send('New employee added to the database!');
  });
});

// Update an existing employee by ID
router.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const { name, password } = req.body;
  const values = [name, password, id];
  db.query('UPDATE Employee SET E_name = ?, E_pass = ? WHERE E_id = ?', values, (err, result) => {
    if (err) throw err;
    res.send('Employee information updated successfully!');
  });
});

// Delete an existing employee by ID
router.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Employee WHERE E_id = ?', id, (err, result) => {
    if (err) throw err;
    res.send('Employee deleted from the database!');
  });
});

module.exports = router;
