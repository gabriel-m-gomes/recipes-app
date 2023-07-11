import PropTypes from 'prop-types';
import React from 'react';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const [user, setUser] = useState('!');

  const store = useMemo(() => ({
    user,
    setUser,
  })[user]);

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
