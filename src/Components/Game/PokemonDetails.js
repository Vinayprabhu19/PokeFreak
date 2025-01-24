import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Pokémon Details for ID: {id}</h1>
      {/* Fetch and display Pokémon details based on the ID */}
      {/* This is where you can add your logic to fetch and display specific Pokémon details */}
    </div>
  );
};

export default PokemonDetails;