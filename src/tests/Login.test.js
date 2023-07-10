import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/renderWith';

describe('Testes do Login', () => {
  it('Testa se, ao renderizar a rota /, o componente Login é renderizado', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('Testando Email e Senha Inválidos', () => {
    const passwordInvalid = 'navio';
    const emailInvalid = 'navioInvalido.com';
    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);

    act(() => {
      userEvent.type(emailInput, emailInvalid);
      userEvent.type(passwordInput, passwordInvalid);
    });
    const loginButton = screen.getByRole('button', {
      name: /submit/i,
    });
    expect(loginButton).toBeDisabled();
  });

  it('Testando Email e Senha válidos', () => {
    const passwordValid = 'navio1234';
    const emailValid = 'navioValido@gmail.com';

    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    act(() => {
      userEvent.type(emailInput, emailValid);
      userEvent.type(passwordInput, passwordValid);
    });
    const loginButton = screen.getByRole('button', {
      name: /submit/i,
    });
    expect(loginButton).not.toBeDisabled();
  });

  it('Testa se a rota é alterada', () => {
    const passwordValid = 'navio123';
    const emailValid = 'navioValido@gmail.com';
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole('button', {
      name: /submit/i,
    });

    act(() => {
      userEvent.type(emailInput, emailValid);
      userEvent.type(passwordInput, passwordValid);
      userEvent.click(loginButton);
    });

    expect(history.location.pathname).toBe('/meals');
  });
});
