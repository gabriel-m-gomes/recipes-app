import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Details from '../hooks/DetailsRecipes';
import DoneFood from '../hooks/DoneFood';
import RecommendationFoods from '../hooks/RecommendationFoods';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/Recipes.css';

const copy = require('clipboard-copy');

function DrinkDetails({ match: { params: { id }, url } }) {
  const history = useHistory();
  const { searchIdFood, recipe, ingredients, measure } = Details();
  const { setPath, recipeRecommendations } = RecommendationFoods();
  const { button, textButton } = DoneFood(id, url.split('/')[1]);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,

  } = recipe;

  useEffect(() => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesLocalStorage) {
      const isAlreadyFavorite = favoritesLocalStorage
        .some((favorite) => favorite.id === id);
      setIsFavorite(isAlreadyFavorite);
    }
  }, [id]);

  useEffect(() => {
    setPath(url.split('/')[1]);
    searchIdFood(url.split('/')[1], id);
  }, [id, url, searchIdFood, setPath]);

  const handleShare = () => {
    setCopied(true);
    copy(window.location.href);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const { idDrink } = recipe;
    const novoObj = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    const isDuplicate = favorites.some((favorite) => favorite.id === idDrink);

    if (!isDuplicate) {
      const updatedFavorites = [...favorites, novoObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    } else {
      const allButNotFavorites = favorites.filter((notFavorite) => notFavorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(allButNotFavorites));
    }
  };

  return (
    <div className="conteiner-details">
      <div>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt="foto da receita" />
        <button onClick={ handleShare }>
          <img data-testid="share-btn" src={ shareIcon } alt="compartilhar" />

        </button>

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
      </div>
      <div>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
        <p data-testid="recipe-category">{strAlcoholic}</p>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${ingredient} ${measure[index]}}`}

            </li>
          ))}
        </ul>
        <h4>Intructions</h4>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
      <h3>Remmended</h3>
      <div className="conteiner-recomemended">
        {recipeRecommendations.map((recommended, index) => (
          <div data-testid={ `${index}-recommendation-card` } className="" key={ index }>
            <figure>
              <img src={ recommended.strMealThumb } alt="" />
              <figcaption data-testid={ `${index}-recommendation-title` }>
                { recommended.strMeal }
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      {
        !button && (
          <button
            className="fixed"
            // onClick={ () => history.push('/done-recipes') }
            onClick={ () => (textButton ? history.push(`${url}/in-progress`)
              : history.push('/done-recipes')) }
            data-testid="start-recipe-btn"
          >
            {textButton ? 'Start Recipe' : 'Continue Recipe'}

          </button>

        )
      }
      { copied && <p>Link copied!</p>}

    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkDetails;
