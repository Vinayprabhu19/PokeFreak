import React, { useState } from 'react';
import { styled } from '@mui/system';

// Styled container for the crossword grid
const CrosswordContainer = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px', // Space between the input boxes
  marginTop: '20px',
  marginRight:"10px",
  marginLeft:"10px",
  gridTemplateColumns: (props) => `repeat(${props.columns}, 40px)`, // Dynamically set the number of columns
  '@media (max-width: 600px)': {
    gridTemplateColumns: (props) => `repeat(${props.columns}, 30px)`, // Adjust for small screens
  },
});

// Styled input box to look like a crossword cell
const CrosswordCell = styled('input')({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  border: '2px solid black',
  borderRadius: '4px',
  outline: 'none',
  backgroundColor: 'white',

  // Size for large screens
  width: '40px',
  height: '40px',

  // Responsive for small screens
  '@media (max-width: 600px)': {
    width: '30px',
    height: '30px',
  },
});

const Crossword = ({ pokemonName, reveal }) => {
  // Create an array of empty cells and dynamically fill them with the Pokémon name
  const renderCells = () => {
    return pokemonName.split('').map((char, index) => (
      <CrosswordCell
        key={index}
        type="text"
        value={reveal ? pokemonName[index] : ''} // Display the corresponding letter or keep it blank
        readOnly // Make the cell read-only
      />
    ));
  };

  return (
    <CrosswordContainer columns={pokemonName.length}>
      {renderCells()}
    </CrosswordContainer>
  );
};

export default Crossword;
