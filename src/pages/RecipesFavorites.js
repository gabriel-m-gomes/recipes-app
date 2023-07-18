import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipesFavorites() {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const [favorit, setFavorit] = useState(false);
  const [dataFavorite, setDataFavorite] = useState([]);

  const handleShare = async ({ target }) => {
    setCopied(true);
    const url = `http://localhost:3000/${target.className}s/${target.id}`;
    copy(url);
  };

  const removeFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favorites);
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    console.log(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorit(!favorit);
  };
  const handleMels = () => {
    const novoArray = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((data) => data.type === 'meal');
    setDataFavorite(novoArray);
  };

  const handleDrink = () => {
    const novoArray = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((data) => data.type === 'drink');
    setDataFavorite(novoArray);
  };

  const handleAll = () => {
    const novoArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setDataFavorite(novoArray);
  };

  useEffect(() => {
    const Lstorge = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setDataFavorite(Lstorge);
  }, [favorit]);

  return (
    <div className="meals">
      <div>
        <Header />
        RecipesFavorites
      </div>

      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleAll }
        >
          All
        </button>
        {' '}
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ handleMels }
        >
          Meals
        </button>
        {' '}
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ handleDrink }
        >
          Drinks
        </button>
      </div>
      {
        dataFavorite.map((obj, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ () => history.push(`${obj.type}s/${obj.id}`) }
            >
              <img
                src={ obj.image }
                alt={ obj.name }
                data-testid={ `${index}-horizontal-image` }
                // className={ obj.type }
                // id={ obj.id }
              />

            </button>

            {' '}
            <p data-testid={ `${index}-horizontal-top-text` }>
              { obj.type === 'drink' ? `${obj.alcoholicOrNot}`
                : `${obj.nationality} - ${obj.category}`}
            </p>

            {' '}
            <button
              type="button"
              onClick={ () => history.push(`${obj.type}s/${obj.id}`) }
            >
              <p
                data-testid={ `${index}-horizontal-name` }
                // id={ obj.id }
                // className={ obj.type }
              >
                {obj.name}
              </p>
            </button>
            {' '}
            <button
              type="button"
              onClick={ handleShare }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                alt="shareIcon"
                src={ shareIcon }
                className={ obj.type }
                id={ obj.id }
              />

            </button>
            {' '}
            <button
              type="button"
              onClick={ () => removeFavorite(obj.id) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                alt="blackHeartIcon"
                src={ blackHeartIcon }
              />
            </button>
          </div>

        ))
      }
      { copied && <p>Link copied!</p>}
    </div>
  );
}

export default RecipesFavorites;
