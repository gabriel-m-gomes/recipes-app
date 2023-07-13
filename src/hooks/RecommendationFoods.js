import { useEffect, useState } from 'react';
import { fetchDrinks, fetchMeals } from '../services/FethIdFoods';

export default function RecommendationFoods() {
  const [recipeRecommendations, setRecipesRecommendations] = useState([]);
  const [path, setPath] = useState('');

  const searchIdFood = async () => {
    console.log(path);
    const limit = 6;
    if (path !== 'meals') {
      const data = await fetchMeals();
      setRecipesRecommendations(data.meals.slice(0, limit));
    } else {
      const data = await fetchDrinks();
      setRecipesRecommendations(data.drinks.slice(0, limit));
    }
  };
  useEffect(() => {
    searchIdFood();
  }, [path]);
  return {
    recipeRecommendations,
    setPath,
  };
}
