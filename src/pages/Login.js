import PropTypes from 'prop-types';
import useFormInput from '../hooks/useFormInput';
import '../style/login.css';

function Login({ history }) {
  const password = useFormInput('');
  const email = useFormInput('');

  const verifyLogin = () => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const verifyEmail = emailRegex.test(email.value);
    const numMin = 6;
    return verifyEmail && password.value.length > numMin;
  };

  function handleButton(e) {
    e.preventDefault();
    const user = {
      email: email.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  }
  return (

    <div className="pai">
      <div>
        <input
          className="input"
          type="email"
          value={ email.value }
          onChange={ email.onChange }
          data-testid="email-input"
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          value={ password.value }
          onChange={ password.onChange }
          data-testid="password-input"
        />
      </div>
      <input
        type="submit"
        className="submit"
        disabled={ !verifyLogin() }
        onClick={ handleButton }
        data-testid="login-submit-btn"
      />
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
