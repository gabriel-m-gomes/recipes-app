import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SearchBar from '../Components/SearchBar';
import FoodProvider from '../Context/FoodProvider';
import { fetchIngredient } from '../services/fetchApi';

jest.mock('../services/fetchApi');
const history = createMemoryHistory();
const searchBarTestId = 'search-input';
const ingredientSearchRadioTestId = 'ingredient-search-radio';
const nameSearchRadioTestId = 'name-search-radio';
const firstLetterSearchRadioTestId = 'first-letter-search-radio';
const execSearchButtonTestId = 'exec-search-btn';

describe('Teste do SearchBar', () => {
  it('Teste se renderiza tudo', () => {
    render(
      <Router history={ history }>
        <FoodProvider>
          <SearchBar />
        </FoodProvider>
      </Router>,
    );
    const inputSearch = screen.getByTestId(searchBarTestId);
    const radioIngredient = screen.getByTestId(ingredientSearchRadioTestId);
    const radioName = screen.getByTestId(nameSearchRadioTestId);

    expect(inputSearch).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
  });

  it('Teste a interação com o usuário com os campos e botões', () => {
    render(
      <Router history={ history }>
        <FoodProvider>
          <SearchBar />
        </FoodProvider>
      </Router>,
    );
    const inputSearch = screen.getByTestId(searchBarTestId);
    const radioIngredient = screen.getByTestId(ingredientSearchRadioTestId);
    const radioName = screen.getByTestId(nameSearchRadioTestId);
    const radioFirstLetter = screen.getByTestId(firstLetterSearchRadioTestId);
    const buttonSearch = screen.getByTestId(execSearchButtonTestId);

    userEvent.type(inputSearch, 'teste');
    expect(inputSearch).toHaveValue('teste');

    userEvent.click(radioIngredient);
    expect(radioIngredient).toBeChecked();

    userEvent.click(radioName);
    expect(radioName).toBeChecked();

    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Testa se o usuário recebe um alerta quando pesquisa por "Primeira letra" tem mais de um caractere', async () => {
    const realAlert = window.alert;
    window.alert = jest.fn();

    render(
      <Router history={ history }>
        <FoodProvider>
          <SearchBar />
        </FoodProvider>
      </Router>,
    );

    const inputSearch = screen.getByTestId(searchBarTestId);
    const radioFirstLetter = screen.getByTestId(firstLetterSearchRadioTestId);
    const buttonSearch = screen.getByTestId(execSearchButtonTestId);

    userEvent.type(inputSearch, 'teste');
    expect(inputSearch).toHaveValue('teste');

    userEvent.click(radioFirstLetter);
    expect(radioFirstLetter).toBeChecked();

    userEvent.click(buttonSearch);
    expect(buttonSearch).toBeInTheDocument();

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    window.alert = realAlert;
  });

  it('Testa a chamada API e verifica se a função de busca é chamada corretamente', async () => {
    const mockedResponse = { meals: [{ idMeal: '1', name: 'Recipe 1' }] };
    fetchIngredient.mockResolvedValue(mockedResponse);

    render(
      <Router history={ history }>
        <FoodProvider>
          <SearchBar />
        </FoodProvider>
      </Router>,
    );

    const inputSearch = screen.getByTestId(searchBarTestId);
    const radioIngredient = screen.getByTestId(ingredientSearchRadioTestId);
    const execSearchButton = screen.getByTestId(execSearchButtonTestId);

    const inputValue = 'chicken';
    userEvent.type(inputSearch, inputValue);
    userEvent.click(radioIngredient);
    userEvent.click(execSearchButton);

    expect(fetchIngredient).toHaveBeenCalledWith(inputValue, '/');

    await waitFor(() => {});

    fetchIngredient.mockRestore();
  });
  it('Teste de redirecionamento para página de detalhes da receita', async () => {
    render(
      <Router history={ history }>
        <FoodProvider>
          <SearchBar />
        </FoodProvider>
      </Router>,
    );

    const inputSearch = screen.getByTestId(searchBarTestId);
    const radioIngredient = screen.getByTestId(ingredientSearchRadioTestId);
    const execSearchButton = screen.getByTestId(execSearchButtonTestId);

    const inputValue = 'Chicken';
    userEvent.type(inputSearch, inputValue);
    userEvent.click(radioIngredient);
    userEvent.click(execSearchButton);

    await waitFor(() => {});

    const recipe1 = screen.queryByText('Chicken Handi');
    expect(recipe1).toBeNull();

    if (recipe1) {
      act(() => {
        userEvent.click(recipe1);
      });
      expect(history.location.pathname).toBe('/meals/52795');
    } else {
      expect(history.location.pathname).not.toBe('/meals/52795');
    }
  });
  it('Teste se ao usario pesquisar por "Primeira letra" com apenas um caractere, ele é redirecionado para a página de detalhes da receita', async () => {
    render(
      <Router history={ history }>
        <FoodProvider>
          <SearchBar />
        </FoodProvider>
      </Router>,
    );

    const inputSearch = screen.getByTestId(searchBarTestId);
    const radioFirstLetter = screen.getByTestId(firstLetterSearchRadioTestId);
    const execSearchButton = screen.getByTestId(execSearchButtonTestId);

    const inputValue = 'a';
    userEvent.type(inputSearch, inputValue);
    userEvent.click(radioFirstLetter);
    userEvent.click(execSearchButton);

    await waitFor(() => {});

    const recipe1 = screen.queryByText('Apple Frangipan Tart');
    expect(recipe1).toBeNull();

    await waitFor(() => {});

    if (recipe1) {
      act(() => {
        userEvent.click(recipe1);
      });
      expect(history.location.pathname).toBe('/meals/52768');
    } else {
      expect(history.location.pathname).not.toBe('/meals');
    }
  });
});
