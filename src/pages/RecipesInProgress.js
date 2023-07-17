import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchId } from '../services/fetchApi';

function RecipesInProgress({ id, path, rota }) {
  const [mealsProgress, setMealsProgress] = useState();

  useEffect(() => {
    const teste = async () => {
      const data = await fetchId(id, path);
      setMealsProgress(data[rota]);
    };
    teste();
  }, [id, path, rota]);
  const strRecipe = rota === 'meals' ? 'strMeal' : 'strDrink';
  const strCategory = rota === 'meals' ? 'strCategory' : 'strAlcoholic';
  const strInstru = rota === 'meals' ? 'strInstructions' : 'strInstructions';
  const strImg = rota === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  return (
    <div>
      <br />
      {mealsProgress && mealsProgress.map((data, index) => (
        <div key={ `name-${index}` }>
          {' '}
          <p
            data-testid="recipe-title"
            key={ `name-${data[strRecipe]}` }
          >
            {data[strRecipe]}

          </p>
          <p data-testid="recipe-category">{data[strCategory]}</p>
          <p data-testid="instructions">{data[strInstru]}</p>
          {' '}
          <img data-testid="recipe-photo" src={ data[strImg] } alt="foto da comida" />
          {' '}
          <br />
          <button data-testid="share-btn">Compartilhar</button>
          <button data-testid="favorite-btn">favoritar</button>
          <button data-testid="finish-recipe-btn">Finalizar</button>
        </div>
      ))}

    </div>
  );
}

RecipesInProgress.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  rota: PropTypes.string.isRequired,
};

export default RecipesInProgress;
