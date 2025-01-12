const { Pool } = require('pg');
const axios = require('axios');

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',      // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'pokemon_bd', // Replace with your database name
  password: 'kishore', // Replace with your PostgreSQL password
  port: 5432,
});

async function seedDatabase() {
  try {
    for (let i = 1; i <= 50; i++) { // Fetch data for the first 50 Pokémon
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemon = response.data;

      const name = pokemon.name;
      const type = pokemon.types[0].type.name;
      const image_url = pokemon.sprites.front_default;
      const height = pokemon.height;
      const weight = pokemon.weight;
      const hp = pokemon.stats[0].base_stat;
      const attack = pokemon.stats[1].base_stat;
      const defense = pokemon.stats[2].base_stat;
      const special_attack = pokemon.stats[3].base_stat;
      const special_defense = pokemon.stats[4].base_stat;

      await pool.query(
        `INSERT INTO pokemon (name, type, image_url, height, weight, hp, attack, defense, special_attack, special_defense) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [name, type, image_url, height, weight, hp, attack, defense, special_attack, special_defense]
      );

      console.log(`Inserted ${name}`);
    }

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    pool.end();
  }
}

seedDatabase();
