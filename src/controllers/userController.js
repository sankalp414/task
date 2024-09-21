const pool = require('../models/db');

// Create a user and an address
const createUserAndAddress = async (req, res) => {
  const { name, address } = req.body;

  try {
    // Start transaction
    await pool.query('BEGIN');

    // Insert user into the users table
    const userResult = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING id',
      [name]
    );
    const userId = userResult.rows[0].id;

    // Insert address into the addresses table
    await pool.query(
      'INSERT INTO addresses (user_id, address) VALUES ($1, $2)',
      [userId, address]
    );

    // Commit transaction
    await pool.query('COMMIT');

    res.status(201).json({ message: 'User and address saved successfully' });
  } catch (error) {
    // Rollback transaction in case of error
    await pool.query('ROLLBACK');
    res.status(500).json({ error: 'Error saving user and address' });
  }
};

module.exports = { createUserAndAddress };
