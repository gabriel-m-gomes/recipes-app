import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Header from '../Components/Header';

describe('Teste do Header', () => {
  it('Teste o Componente Header', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const pageTitle = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Meals');

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');

    act(() => {
      history.push('/');
    });
  });
});
