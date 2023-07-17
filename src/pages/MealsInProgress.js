import PropTypes from 'prop-types';
import RecipesInProgress from './RecipesInProgress';

function MealsInProgress({ match: { params: { id } } }) {
  const { pathname } = window.location;
  const rota = 'meals';
  return (
    <div>
      <RecipesInProgress id={ id } path={ pathname } rota={ rota } />
    </div>
  );
}

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default MealsInProgress;
