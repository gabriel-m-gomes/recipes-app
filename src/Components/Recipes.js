import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom.min';
import FoodContext from '../Context/FoodContext';
import '../style/Recipes.css';

function Recipe() {
  const location = useLocation();
  const { pathname } = location;
  const { recipes, pedido } = useContext(FoodContext);

  const novoRecipes = recipes?.meals || recipes?.drinks;
  const strRecipe = pathname === '/meals' ? 'strMeal' : 'strDrink';
  const strImg = pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const strId = pathname === '/meals' ? 'idMeal' : 'idDrink';
  const map = novoRecipes || pedido;
  const numSlice = 12;

  const verifyPedido = pedido !== undefined && pedido !== null;

  return (
    <div className="recipes">
      { verifyPedido
        ? map.slice(0, numSlice).map((recipe, index) => (
          <Link
            key={ `recipe-card-${index}` }
            className="teste"
            data-testid={ `${index}-recipe-card` }
            to={ `${pathname}/${recipe[strId]}` }
          >
            <p
              key={ `card-name-${index}` }
              data-testid={ `${index}-card-name` }
            >
              {recipe[strRecipe]}
            </p>
            <img
              key={ `card-img-${index}` }
              data-testid={ `${index}-card-img` }
              src={ recipe[strImg] }
              alt="foto da receita"
            />

          </Link>
        ))
        : ''}
    </div>
  );
}

export default Recipe;
