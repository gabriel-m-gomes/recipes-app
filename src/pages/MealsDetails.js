import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Details from '../hooks/DetailsRecipes';
import RecommendationFoods from '../hooks/RecommendationFoods';
import DoneFood from '../hooks/DoneFood';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function MealsDetails({ match: { params: { id }, url } }) {
  const history = useHistory();
  const { searchIdFood, recipe, ingredients, measure } = Details();
  const { setPath, recipeRecommendations } = RecommendationFoods();
  const { button, textButton } = DoneFood(id, url.split('/')[1]);
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;

  useEffect(() => {
    setPath(url.split('/')[1]);
    searchIdFood(url.split('/')[1], id);
  }, [id, url]);
  console.log(recipeRecommendations);
  return (
    <div className="conteiner-details">
      <div>
        <img data-testid="recipe-photo" src={ strMealThumb } alt="" />
        <img data-testid="share-btn" src={ shareIcon } alt="compartilhar" />
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favoritar" />
      </div>
      <div>
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
        <p data-testid="instructions">{strInstructions}</p>
        {ingredients.map((ingredient, index) => (
          <div key={ index }>
            <p data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
              {' '}
              {measure[index]}
            </p>

          </div>
        ))}
        {strYoutube && (
          <iframe
            data-testid="video"
            title="video"
            width="300"
            height="260"
            src={ strYoutube.replace('watch?v=', 'embed/') }
          />
        ) }

      </div>
      <div className="conteiner-recomemended">
        {recipeRecommendations.map((recommended, index) => (
          <div data-testid={ `${index}-recommendation-card` } className="" key={ index }>
            <figure>
              <img src={ recommended.strDrinkThumb } alt="" />
              <figcaption data-testid={ `${index}-recommendation-title` }>
                { recommended.strDrink }
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
    </div>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default MealsDetails;
