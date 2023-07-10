/* import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [user, setUser] = useState('!');

  const store = {

  };

  return (
    <FoodContext.Provider value={ { usuario: user } }>
      <div>
        { children }
      </div>
    </FoodContext.Provider>
  );
}

FoodProvider.prototype = {
  children: PropTypes.node.isRequired,
}; */
