import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const arrayMeals = JSON.parse(localStorage.getItem('doneRecipes'));
  const [arrayFood, setArrayFod] = useState(arrayMeals);
  const [copied, setCopied] = useState(false);

  const handleShare = async ({ target }) => {
    setCopied(true);
    const url = `http://localhost:3000/${target.className}s/${target.id}`;
    copy(url);
  };

  const handleMels = () => {
    const novoArray = JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((data) => data.type === 'meal');
    setArrayFod(novoArray);
  };

  const handleDrink = () => {
    const novoArray = JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((data) => data.type === 'drink');
    setArrayFod(novoArray);
  };

  const handleAll = () => {
    setArrayFod(arrayMeals);
  };
  return (
    <div className="meals">
      <Header />
      { arrayFood
      && arrayFood
        .map((
          { image, category, name, type, id, doneDate, tags, nationality,
            alcoholicOrNot },
          index,
        ) => (
          <div key={ `name-${index}` }>
            <Link
              to={ `${type}s/${id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>

            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </p>
            <Link to={ `${type}s/${id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt="foto da receita"
              />
            </Link>
            <br />
            <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
            {tags && tags.length > 0 && (
              <div>
                {tags.map((tagName, tagIndex) => (
                  <p
                    key={ `${index}-tag-${tagIndex}` }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    {tagName}
                  </p>
                ))}
              </div>
            ) }

            <input
              id={ id }
              className={ type }
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              alt="foto"
              src={ shareIcon }
              onClick={ handleShare }
            />
          </div>
        ))}
      <br />
      <button data-testid="filter-by-all-btn" onClick={ handleAll }>All</button>
      <button data-testid="filter-by-meal-btn" onClick={ handleMels }>Meals</button>
      <button data-testid="filter-by-drink-btn" onClick={ handleDrink }>Drinks</button>
      { copied && <p>Link copied!</p>}
    </div>
  );
}

export default DoneRecipes;
