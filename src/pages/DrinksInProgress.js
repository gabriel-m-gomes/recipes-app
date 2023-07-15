import PropTypes from 'prop-types';
import RecipesInProgress from './RecipesInProgress';

function DrinksInProgress({ match: { params: { id } } }) {
  const { pathname } = window.location;
  const rota = 'drinks';
  return (
    <div>
      <RecipesInProgress id={ id } path={ pathname } rota={ rota } />
    </div>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default DrinksInProgress;
