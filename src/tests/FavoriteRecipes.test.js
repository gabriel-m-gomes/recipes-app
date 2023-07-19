import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';
import { act } from 'react-dom/test-utils';
import FoodProvider from '../Context/FoodProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const filterAll = 'filter-by-all-btn';
const filterByMeals = 'filter-by-meal-btn';
const filterByDrinks = 'filter-by-drink-btn';
const favoriteRicipes = '/favorite-recipes';

const history = createMemoryHistory();
const fetchAndSetLocalStorage = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  localStorage.setItem('favoriteRecipes', JSON.stringify(data.drinks));
};

describe('Teste da tela de receitas favoritas', () => {
  it('Testa se os botões da página de favoritos é renderizado', async () => {
    history.push(favoriteRicipes);
    await fetchAndSetLocalStorage();
    render(
      <Router history={ history }>
        <FoodProvider>
          <FavoriteRecipes />
        </FoodProvider>
      </Router>,
    );
    const title = screen.getByText('Favorite Recipes');
    const all = screen.getByTestId(filterAll);
    const meals = screen.getByTestId(filterByMeals);
    const drinks = screen.getByTestId(filterByDrinks);

    expect(title).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
  });
  it('Testa se os botões de filtro funcionam', async () => {
    history.push(favoriteRicipes);

    const setupLocalStorage = () => {
      const favoriteRecipes = [
        { id: 1, name: 'Receita 1', type: 'meal', image: 'url_da_imagem_1' },
        { id: 2, name: 'Receita 2', type: 'drink', image: 'url_da_imagem_2' },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    };

    setupLocalStorage();

    render(
      <Router history={ history }>
        <FoodProvider>
          <FavoriteRecipes />
        </FoodProvider>
      </Router>,
    );

    const all = screen.getByTestId(filterAll);
    const meals = screen.getByTestId(filterByMeals);
    const drinks = screen.getByTestId(filterByDrinks);

    act(() => {
      userEvent.click(all);
    });

    await waitFor(() => {
      const favoriteRecipe1 = screen.getByText('Receita 1');
      const favoriteRecipe2 = screen.getByText('Receita 2');

      expect(favoriteRecipe1).toBeInTheDocument();
      expect(favoriteRecipe2).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(meals);
    });

    await waitFor(() => {
      const favoriteRecipe1 = screen.getByText('Receita 1');
      const favoriteRecipe2 = screen.queryByText('Receita 2');

      expect(favoriteRecipe1).toBeInTheDocument();
      expect(favoriteRecipe2).not.toBeInTheDocument();
    });

    act(() => {
      userEvent.click(drinks);
    });

    await waitFor(() => {
      const favoriteRecipe1 = screen.queryByText('Receita 1');
      const favoriteRecipe2 = screen.getByText('Receita 2');

      expect(favoriteRecipe1).not.toBeInTheDocument();
      expect(favoriteRecipe2).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(all);
    });

    await waitFor(() => {
      const favoriteRecipe1 = screen.getByText('Receita 1');
      const favoriteRecipe2 = screen.getByText('Receita 2');

      expect(favoriteRecipe1).toBeInTheDocument();
      expect(favoriteRecipe2).toBeInTheDocument();
    });
  });
  it('Testa se a receita favorita é removida ao clicar no botão de coração preenchido', async () => {
    history.push(favoriteRicipes);

    const setupLocalStorage = () => {
      const favoriteRecipesData = [
        { id: 1, name: 'Receita 1', type: 'meal', image: 'url_da_imagem_1' },
        { id: 2, name: 'Receita 2', type: 'drink', image: 'url_da_imagem_2' },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesData));
    };
    setupLocalStorage();

    render(
      <Router history={ history }>
        <FoodProvider>
          <FavoriteRecipes />
        </FoodProvider>
      </Router>,
    );

    await waitFor(() => {
      const favoriteRecipe1 = screen.getByText('Receita 1');
      const favoriteRecipe2 = screen.getByText('Receita 2');

      expect(favoriteRecipe1).toBeInTheDocument();
      expect(favoriteRecipe2).toBeInTheDocument();
    });

    act(() => {
      const filledHeartButton = screen.getByTestId('0-horizontal-favorite-btn');
      userEvent.click(filledHeartButton);
    });

    await waitFor(() => {
      const favoriteRecipe1 = screen.queryByText('Receita 1');
      expect(favoriteRecipe1).not.toBeInTheDocument();
    });

    const updatedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(updatedFavoriteRecipes).toHaveLength(1);
    expect(updatedFavoriteRecipes[0].name).toEqual('Receita 2');

    act(() => {
      const filledHeartButton = screen.getByTestId('0-horizontal-favorite-btn');
      userEvent.click(filledHeartButton);
    });

    await waitFor(() => {
      const favoriteRecipe2 = screen.queryByText('Receita 2');
      expect(favoriteRecipe2).not.toBeInTheDocument();
    });

    const emptyFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(emptyFavoriteRecipes).toHaveLength(0);
  });
});
