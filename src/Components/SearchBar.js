import React, { useState } from 'react';
import { fetchIngredient, fetchName, fetchFirstLetter } from '../services/fetchApi';

function SearchBar() {
  const [radio, setRadio] = useState('');
  const [pedido, setPedido] = useState([]);
  const [input, setInput] = useState('');

  const handleInput = ({ target }) => {
    const { id } = target;
    setRadio(id);
  };

  const firstLetter = 'first-letter';

  const searchRecipes = async () => {
    if (radio === firstLetter && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const { pathname } = window.location;

    switch (radio) {
    case 'ingredient':
      setPedido(await fetchIngredient(input, pathname));
      break;

    case 'name':
      setPedido(await fetchName(input, pathname));
      break;

    case firstLetter:
      setPedido(await fetchFirstLetter(input, pathname));
      break;
    default:
    }
  };

  const changeInput = ({ target }) => {
    setInput(target.value);
  };

  console.log(pedido);
  return (
    <div>
      <div>
        <input type="text" data-testid="search-input" onChange={ changeInput } />
      </div>
      <label htmlFor="ingredient">Ingrediente</label>
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        onChange={ handleInput }
        checked={ radio === 'ingredient' }
        id="ingredient"
      />
      <label htmlFor="name">Nome</label>
      <input
        type="radio"
        onChange={ handleInput }
        data-testid="name-search-radio"
        checked={ radio === 'name' }
        id="name"
      />
      <label htmlFor="first-letter">Primeira letra</label>
      <input
        type="radio"
        onChange={ handleInput }
        checked={ radio === 'first-letter' }
        data-testid="first-letter-search-radio"
        id="first-letter"
      />
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipes }
      >
        Buscar

      </button>
    </div>
  );
}

export default SearchBar;
