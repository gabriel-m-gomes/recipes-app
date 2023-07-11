import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [user, setUser] = useState('!');
  const [recipes, setRecipes] = useState([]);

  const store = useMemo(() => ({
    user,
    setUser,
    recipes,
    setRecipes,
  }), [user, setUser, recipes, setRecipes]);

  return (
    <FoodContext.Provider value={ store }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
