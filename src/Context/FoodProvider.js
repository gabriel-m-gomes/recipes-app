import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [user, setUser] = useState('!');
  const [recipes, setRecipes] = useState([]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const store = {
    user,
    setUser,
    recipes,
    setRecipes,
  };
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
