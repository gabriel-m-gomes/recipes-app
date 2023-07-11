import { useContext } from 'react';
import Header from '../Components/Header';
import FoodContext from '../Context/FoodContext';

function Drinks() {
  const { recipes } = useContext(FoodContext);
  const verifyRecipes = recipes.drinks !== undefined && recipes.drinks !== null;
  const numSlice = 12;
  return (
    <div className="meals">
      <Header />
      drinks
      { verifyRecipes
        ? recipes.drinks.slice(0, numSlice).map(({ strDrinkThumb, strDrink }, index) => (
          <div
            key={ index }
            className="teste"
            data-testid={ `${index}-recipe-card` }
          >
            <p
              key={ index }
              data-testid={ `${index}-card-name` }
            >
              {strDrink}
            </p>
            <img
              key={ index }
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt="foto da receita"
            />
          </div>
        ))
        : ''}
    </div>
  );
}

export default Drinks;
