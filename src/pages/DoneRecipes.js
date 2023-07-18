import { useState } from 'react';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [copied, setCopied] = useState(false);

  const arrayMeals = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleShare = async ({ target }) => {
    setCopied(true);
    const url = `http://localhost:3000/${target.className}s/${target.id}`;
    copy(url);
  };
  return (
    <div className="meals">
      <Header />
      { arrayMeals
      && arrayMeals
        .map((
          { image, category, name, type, id, doneDate, tags, nationality,
            alcoholicOrNot },
          index,
        ) => (
          <div key={ `name-${index}` }>
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </p>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="foto da receita"
            />
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
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      { copied && <p>Link copied!</p>}
    </div>
  );
}

export default DoneRecipes;
