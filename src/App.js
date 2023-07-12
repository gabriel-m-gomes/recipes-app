import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipesFavorites from './pages/RecipesFavorites';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/DrinksDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import FoodProvider from './Context/FoodProvider';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import MealsDetails from './pages/MealsDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        <FoodProvider>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ MealsDetails } />
          <Route exact path="/drinks/:id" component={ DrinkDetails } />
          <Route path="/meals/:id/in-progress" component={ RecipesInProgress } />
          <Route path="/drinks/:id/in-progress" component={ RecipesInProgress } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ RecipesFavorites } />
        </FoodProvider>
      </Switch>
    </div>
  );
}

export default App;
