import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchId } from '../services/fetchApi';
import '../style/line.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipesInProgress({ id, path, rota }) {
  const [mealsProgress, setMealsProgress] = useState();
  const [ingredientList, setIngredientList] = useState();
  const [selectedIngredients, setSelectedIngredients] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes'))?.[rota]?.[id] || [],
  );
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
    inProgressRecipes[rota][id] = selectedIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    //
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesLocalStorage) {
      const isAlreadyFavorite = favoritesLocalStorage
        .some((favorite) => favorite.id === id);
      setIsFavorite(isAlreadyFavorite);
    }
    //
  }, [id, rota, selectedIngredients]);

  const handleIngredientCheck = (index) => {
    if (selectedIngredients.includes(index)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== index));
    } else {
      setSelectedIngredients([...selectedIngredients, index]);
    }
  };

  const handleShare = async () => {
    setCopied(true);
    const url = `http://localhost:3000/${rota}/${id}`;
    copy(url);
  };
  const idStr = rota === 'meals' ? 'idMeal' : 'idDrink';
  const verifyAlcool = rota === 'meals' ? '' : 'strAlcoholic';
  const strRecipe = rota === 'meals' ? 'strMeal' : 'strDrink';
  const strCategory = 'strCategory';
  const strInstru = rota === 'meals' ? 'strInstructions' : 'strInstructions';
  const strImg = rota === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nationality = 'strArea';
  //
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(!isFavorite);

    const novoObj = {
      id: mealsProgress[0][idStr],
      type: rota === 'meals' ? 'meal' : 'drink',
      nationality: rota === 'meals' ? mealsProgress[0][nationality] : '',
      category: mealsProgress[0][strCategory],
      alcoholicOrNot: rota === 'meals' ? '' : mealsProgress[0][verifyAlcool],
      name: mealsProgress[0][strRecipe],
      image: mealsProgress[0][strImg],
    };
    const isDuplicate = favorites.some((favorite) => favorite.id === id);

    if (!isDuplicate) {
      const updatedFavorites = [...favorites, novoObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    } else {
      const allButNotFavorites = favorites.filter((notFavorite) => notFavorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(allButNotFavorites));
    }
  };

  const finishRecipe = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    let arrayTags = [];
    if (rota === 'meals') {
      const { strTags } = mealsProgress[0];
      const tagsArray = strTags.split(',');
      arrayTags = tagsArray.map((tag) => tag.trim());
    }

    const novoObj = {
      id: mealsProgress[0][idStr],
      type: rota === 'meals' ? 'meal' : 'drink',
      nationality: rota === 'meals' ? mealsProgress[0][nationality] : '',
      category: mealsProgress[0][strCategory],
      alcoholicOrNot: rota === 'meals' ? '' : mealsProgress[0][verifyAlcool],
      name: mealsProgress[0][strRecipe],
      image: mealsProgress[0][strImg],
      doneDate: new Date(),
      tags: rota === 'meals' ? arrayTags : [],
    };
    const isDuplicate = done.some((favorite) => favorite.id === id);

    if (!isDuplicate) {
      const updatedFavorites = [...done, novoObj];
      localStorage.setItem('doneRecipes', JSON.stringify(updatedFavorites));
    }
    window.location.href = '/done-recipes';
  };

  const isFinishButtonEnabled = ingredientList && selectedIngredients
  && ingredientList.length === selectedIngredients.length;

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
          <button data-testid="share-btn" onClick={ handleShare }>Compartilhar</button>
          <button onClick={ handleFavorite }>
            { isFavorite ? (
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="favoritar"
              />

            )
              : (
                <img
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  alt="favoritar"
                />
              )}
          </button>
          <button
            data-testid="finish-recipe-btn"
            disabled={ !isFinishButtonEnabled }
            onClick={ finishRecipe }
          >
            Finalizar

          </button>
          { copied && <p>Link copied!</p>}
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
