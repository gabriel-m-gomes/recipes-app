import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
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

    const pageTitle = screen.getByTestId('pagle-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Meals');

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history).toHaveTextContent('Profile');
    expect(history.location.pathname).toBe('/profile');

    act(() => {
      history.push('/');
    });
  });
  it('Teste o click do Search Bar', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(searchBar).not.toBeInTheDocument();
  });
});
