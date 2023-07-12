import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWith';

describe('Profile', () => {
  it('should render the profile page', () => {
    renderWithRouter(<Profile />);
    const profileTitle = screen.getByText(/Profile/i);
    expect(profileTitle).toBeInTheDocument();
  });
  it('should render the email input', () => {
    renderWithRouter(<Profile />);
    const emailInput = screen.getByTestId('profile-email');
    expect(emailInput).toBeInTheDocument();
  });
  it('should render the save button', () => {
    renderWithRouter(<Profile />, '/profile');

    const doneButton = screen.getByTestId('profile-done-btn');
    const favoritesButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(doneButton).toBeInTheDocument();
    expect(favoritesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    doneButton.click();
    favoritesButton.click();
    logoutButton.click();
  });
});
