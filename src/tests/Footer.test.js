import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Components/Footer';

describe('Testando o arquivo Footer.js', () => {
  it('Teste se o arquivo Footer.js contém os 2 ícones, um para comidas e outro para bebidas.', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const drinks = screen.getByTestId('drinks-bottom-btn');
    const meals = screen.getByTestId('meals-bottom-btn');

    expect(drinks).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
  });

  it('Teste se o arquivo Footer.js contém um ícone para explorar bebidas', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const drinks = screen.getByTestId('drinks-bottom-btn');

    expect(drinks).toBeInTheDocument();
  });

  it('Teste se o arquivo Footer.js contém um ícone para explorar comidas', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    const meals = screen.getByTestId('meals-bottom-btn');
    expect(meals).toBeInTheDocument();
  });
});
