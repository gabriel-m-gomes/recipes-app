import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Profile(prop) {
  const user = localStorage.getItem('email');
  const { history } = prop;
  const [userEmail, setUser] = useState('');
  useEffect(() => {
    setUser(user);
  }, [user]);

  function saveEmail() {
    localStorage.setItem('email', 'email@mail.com');
  }
  saveEmail();
  const redirect = ({ target }) => {
    const { name } = target;
    history.push(`/${name}`);
    // window.location.href = `/${name}`;
  };

  function logout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <>
      {/* <Header /> */}
      <div className="profile">
        <div>
          {/* <img src="" alt="" /> */}
          <h2>Profile</h2>
          <p data-testid="profile-email">{userEmail}</p>
        </div>
        <div>
          <button
            onClick={ redirect }
            data-testid="profile-done-btn"
            name="done-recipes"
          >
            Done Recipes
          </button>
          <button
            onClick={ redirect }
            name="favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
          <button
            onClick={ logout }
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </div>

      </div>
      {/* <Footer /> */}
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
