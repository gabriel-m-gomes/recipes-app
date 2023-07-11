import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const history = useHistory();

  const title = {
    '/meals': 'Meals',
    '/drinks': 'Drinks',
    '/profile': 'Profile',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',

  };
  const path = location.pathname;

  const pageTitle = title[path] || '';

  const [searchIsVisible, setSeachIsVisible] = useState(false);

  const visibleSeachIcon = ['/meals', '/drinks'].includes(path);

  const handleProfileClick = () => {
    history.push('/profile');
  };
  const handleSearchClick = () => {
    setSeachIsVisible(!searchIsVisible);
  };
  return (
    <header>
      <input
        type="image"
        alt="profile"
        src={ profileIcon }
        data-testid="profile-top-btn"
        onClick={ handleProfileClick }
      />

      {visibleSeachIcon && (
        <>
          <input
            type="image"
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
            onClick={ handleSearchClick }

          />
          {searchIsVisible && (
            <SearchBar />
          )}
        </>
      )}
      <h1 data-testid="page-title">{pageTitle}</h1>
    </header>
  );
}

export default Header;
