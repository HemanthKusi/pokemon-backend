const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',      // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'pokemon_bd', // Replace with your database name
  password: 'kishore', // Replace with your PostgreSQL password
  port: 5432,
});

// Sample route to fetch Pokémon
app.get('/pokemon', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemon');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/pokemon`);
});
