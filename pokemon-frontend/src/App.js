import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pokemon');
      setPokemonList(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterType(e.target.value);
  };

  const filteredPokemon = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pokemon) =>
      filterType ? pokemon.type.toLowerCase() === filterType.toLowerCase() : true
    );

  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredPokemon.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokémon App</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select onChange={handleFilter} value={filterType}>
        <option value="">All Types</option>
        <option value="grass">Grass</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="bug">Bug</option>
        <option value="electric">Electric</option>
        <option value="rock">Rock</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
      </select>
      <div>
        {paginatedPokemon.map((pokemon) => (
          <div key={pokemon.id} style={{ border: '1px solid black', margin: '10px' }}>
            <img src={pokemon.image_url} alt={pokemon.name} />
            <p>ID: {pokemon.id}</p>
            <p>Name: {pokemon.name}</p>
            <p>Type: {pokemon.type}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={currentPage * itemsPerPage >= filteredPokemon.length}
      >
        Next
      </button>
    </div>
  );
}

export default App;