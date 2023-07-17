import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchId } from '../services/fetchApi';
import '../style/line.css';

function RecipesInProgress({ id, path, rota }) {
  const [mealsProgress, setMealsProgress] = useState();
  const [ingredientList, setIngredientList] = useState();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchId(id, path);
      setMealsProgress(data[rota]);
      //
      const ingredientKeys = Object.keys(data[rota][0])
        .filter((key) => key.includes('strIngredient'));
      const ingredients = ingredientKeys
        .map((key) => data[rota][0][key])
        .filter((ingredient) => ingredient !== '' && ingredient !== null);
      return setIngredientList(ingredients);
    };

    fetchData();
  }, [id, path, rota]);

  const handleIngredientCheck = (index) => {
    if (selectedIngredients.includes(index)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== index));
    } else {
      setSelectedIngredients([...selectedIngredients, index]);
    }
  };

  const strRecipe = rota === 'meals' ? 'strMeal' : 'strDrink';
  const strCategory = rota === 'meals' ? 'strCategory' : 'strAlcoholic';
  const strInstru = rota === 'meals' ? 'strInstructions' : 'strInstructions';
  const strImg = rota === 'meals' ? 'strMealThumb' : 'strDrinkThumb';

  return (
    <div>
      <br />
      {mealsProgress && mealsProgress.map((data) => (
        <div key="name">
          <p data-testid="recipe-title" key={ `name-${data[strRecipe]}` }>
            {data[strRecipe]}
          </p>
          <img data-testid="recipe-photo" src={ data[strImg] } alt="foto da comida" />
          <p data-testid="recipe-category">{data[strCategory]}</p>
          <p data-testid="instructions">{data[strInstru]}</p>
          <br />
          {ingredientList && (
            <ul>
              {ingredientList.map((ingredient, index) => (
                <li
                  key={ ingredient }
                >
                  <label
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                    name="ingredientes"
                    className={ selectedIngredients.includes(index) ? 'linha' : '' }

                  >
                    <input
                      type="checkbox"
                      name="ingredientes"
                      checked={ selectedIngredients.includes(index) }
                      onChange={ () => handleIngredientCheck(index) }
                    />
                    {ingredient}
                  </label>
                </li>
              ))}
            </ul>
          )}
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
