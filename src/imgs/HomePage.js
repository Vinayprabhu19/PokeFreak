import React, { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { TextField, Button, Grid } from '@mui/material'; // Changed Grid2 to Grid
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from '../imgs/background.jpg';
import goIcon from '../imgs/pokeball.png'; // Import the image for the Go button
import '../App.css';
import BrightnessController from '../Components/Game/CircularContainer';
import Crossword from '../Components/Game/CrosswordContainer';
import nextIcon from '../imgs/next.svg';

// Styled container for the homepage
const HomePageContainer = styled('div')({
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center vertically
  alignItems: 'center', // Center horizontally
  color: 'white',
  backdropFilter: 'blur(50px)',
});

// Add styling for the PokeFreak title
const Title = styled('h1')({
  fontFamily: 'Pokemon Solid, sans-serif',  // Apply the custom Pokemon Solid font
  fontSize: '64px',
  color: '#FFCB05',  // Color similar to the Pokémon theme
  marginBottom: '20px',  // Add some space below the title
  textShadow: '4px 9px 1px #3B4CCA',  // Add a slight shadow for effect
});

const GoButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: 'black',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  '& img': {
    marginRight: '10px',
    width: '25px', // Set the image width
    height: '25px', // Set the image height
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px', // Space between buttons
  margin: '20px 10px 10px 10px',

});

const HomePage = () => {
  const history = useNavigate(); // Get history object

  const [pokemonData, setPokemonData] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [brightness, setBrightness] = useState(null);
  const [crosswordString, setCrosswordString] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [charRevealed, setCharRevealed] = useState(1);

  // Fetch and read the JSON file
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('../json/pokemon.json');
        const data = await response.json();
        setPokemonData(data);
        // Randomly pick a Pokémon
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomBG = Math.floor(Math.random() * 8) + 1;
        setBackgroundImg('background/BG' + randomBG + '.jpg');
        setRandomPokemon(data[randomIndex]);
        setBrightness(0);
        setCrosswordString('*'.repeat(data[randomIndex].name.length));
      } catch (error) {
        console.error('Error fetching the Pokemon data:', error);
      }
    };
    fetchPokemonData();
  }, []);

  const handleRevealClick = () => {
    setCrosswordString(randomPokemon.name);
    setReveal(true);
  };

  const handleRevealCharClick = () => {
    if (charRevealed < randomPokemon.name.length + 1) {
      setCharRevealed(charRevealed + 1);
      const revString = randomPokemon.name.substr(0, charRevealed) + "*".repeat(randomPokemon.name.length - charRevealed);
      setCrosswordString(revString);
      setReveal(true);
    }
  };

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const randomBG = Math.floor(Math.random() * 8) + 1;
    setBackgroundImg('background/BG' + randomBG + '.jpg');
    setRandomPokemon(pokemonData[randomIndex]);
    setBrightness(0);
    setCrosswordString('*'.repeat(pokemonData[randomIndex].name.length));
    setReveal(false);
    setCharRevealed(1);
  };

  return (
    <HomePageContainer>
      <Title>PokeFREAK</Title> {/* Title with Pokemon Solid font */}
      {randomPokemon && (
        <div>
          <BrightnessController brightness={brightness} backgroundImage={backgroundImg} innerImage={'Pokemon Dataset/' + randomPokemon["file_path"]} />
        </div>
      )}
      {randomPokemon && (
        <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Crossword pokemonName={crosswordString} reveal={reveal} />
          <div style={{ display: "block", textAlign: "center" }}>
              {/* Container for the first two buttons */}
              <ButtonContainer>
                <GoButton variant="contained" onClick={handleRevealCharClick}>
                  <img src={goIcon} alt="Go Icon" />
                  Reveal one
                </GoButton>
                <GoButton variant="contained" onClick={handleRevealClick}>
                  <img src={goIcon} alt="Go Icon" />
                  Reveal
                </GoButton>
              </ButtonContainer>
              
              {/* Centered Next button */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <GoButton variant="contained" onClick={handleNextClick}>
                  <img src={nextIcon} alt="Go Icon" />
                </GoButton>
              </div>
            </div>
        </div>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
