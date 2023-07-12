import Header from '../Components/Header';
import '../style/recipes.css';
import Footer from '../Components/Footer';
import Recipe from '../Components/Recipes';

function Meals() {
  return (
    <div className="card-container">
      <Header />
      Recipes

      <Recipe />
      <Footer />
    </div>
  );
}

export default Meals;
