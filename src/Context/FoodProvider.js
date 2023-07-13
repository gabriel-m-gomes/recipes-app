import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import FoodContext from './FoodContext';

export default function FoodProvider({ children }) {
  const location = useLocation();
  const { pathname } = location;

  const [user, setUser] = useState('!');
  const [recipes, setRecipes] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [category, setCategory] = useState([]);

  const store = useMemo(() => ({
    user,
    setUser,
    recipes,
    setRecipes,
    pedido,
    setPedido,
    category,
    setCategory,
  }), [user, setUser, recipes, setRecipes, pedido, setPedido, setCategory, category]);

  useEffect(() => {
    const searchRecipes = async () => {
      const verifyPath = pathname === '/meals' ? 'meal' : 'cocktail';
      const urlRecipe = `https://www.the${verifyPath}db.com/api/json/v1/1/search.php?s=`;
      const data = await fetch(urlRecipe);
      const response = await data.json();
      const noMagicNumber = 12;
      const recebido = (response.meals || response.drinks)
        ?.slice(0, noMagicNumber)?.map((item) => item);
      setPedido(recebido);
      setRecipes(recebido);
    };
    searchRecipes();
  }, [pathname]);

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
