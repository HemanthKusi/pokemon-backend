import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [similarPokemon, setSimilarPokemon] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pokemon/${id}`);
      setPokemon(response.data);

      // Fetch similar Pokémon by type
      const similarResponse = await axios.get(
        `http://localhost:3000/pokemon?type=${response.data.type}`
      );
      setSimilarPokemon(similarResponse.data.filter((p) => p.id !== parseInt(id)));
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image_url} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.type}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>HP: {pokemon.hp}</p>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Special Attack: {pokemon.special_attack}</p>
      <p>Special Defense: {pokemon.special_defense}</p>

      <h2>Similar Pokémon</h2>
      <div>
        {similarPokemon.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id}>
            <div style={{ border: '1px solid black', margin: '10px' }}>
              <img src={p.image_url} alt={p.name} />
              <p>ID: {p.id}</p>
              <p>Name: {p.name}</p>
              <p>Type: {p.type}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default PokemonDetail;

