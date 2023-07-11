import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import RecipesFavorites from './pages/RecipesFavorites';
import DoneRecipes from './pages/DoneRecipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import FoodProvider from './Context/FoodProvider';
import Drinks from './pages/Drinks';

function App() {
  return (
    <div className="meals">
      <Switch>
        <FoodProvider>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Recipes } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/meals/:id" component={ RecipesDetails } />
          <Route path="/drinks/:id" component={ RecipesDetails } />
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
