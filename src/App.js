import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './imgs/HomePage';
import PokemonDetails from './Components/Game/PokemonDetails'; // Create this component for the Pokémon details
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from root path to HomePage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route for Pokémon details based on ID */}
        <Route path="/Pokemon/:id" element={<PokemonDetails />} />

        {/* Redirect to HomePage for any unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
