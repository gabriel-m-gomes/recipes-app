import { useContext } from 'react';
import Header from '../Components/Header';
import FoodContext from '../Context/FoodContext';
import '../style/recipes.css';

function Recipes() {
  const { recipes } = useContext(FoodContext);

  const verifyRecipes = recipes.meals !== undefined && recipes.meals !== null;
  const numSlice = 12;
  return (
    <div className="card-container">
      <Header />
      Recipes
      { verifyRecipes
        ? recipes.meals.slice(0, numSlice).map(({ strMeal, strMealThumb }, index) => (
          <div
            key={ index }
            className="teste"
            data-testid={ `${index}-recipe-card` }
          >
            <p
              key={ index }
              data-testid={ `${index}-card-name` }
            >
              {strMeal}
            </p>
            <img
              key={ index }
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt="foto da receita"
            />
          </div>
        ))
        : ''}
    </div>
  );
}

export default Recipes;
