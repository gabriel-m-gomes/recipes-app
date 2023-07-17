import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
/* import { act } from 'react-dom/test-utils'; */
import Recipes from '../Components/Recipes';
import FoodProvider from '../Context/FoodProvider';
/* import { fetchCategory } from '../services/fetchApi'; */

const history = createMemoryHistory();
const category1 = '0-recipe-card';
const category2 = '1-recipe-card';
const category3 = '2-recipe-card';

describe('Recipes Component', () => {
  it('Testa se os cards são renderizados', async () => {
    render(
      <Router history={ history }>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </Router>,
    );

    await waitFor(() => {
      const card = screen.getByTestId(category1);
      expect(card).toBeInTheDocument();

      const card2 = screen.getByTestId(category2);
      expect(card2).toBeInTheDocument();

      const card3 = screen.getByTestId(category3);
      expect(card3).toBeInTheDocument();
    });
  });
  it('Testa se ao clicar no filter "All" todas as receitas irão na tela', async () => {
    render(
      <Router history={ history }>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </Router>,
    );
    const beefBtn = await screen.findByTestId('All-category-filter');
    expect(beefBtn).toBeInTheDocument();
    userEvent.click(beefBtn);

    await waitFor(() => {
      const card = screen.getByTestId(category1);
      expect(card).toBeInTheDocument();

      const card2 = screen.getByTestId(category2);
      expect(card2).toBeInTheDocument();

      const card3 = screen.getByTestId(category3);
      expect(card3).toBeInTheDocument();
    });
  });
});
