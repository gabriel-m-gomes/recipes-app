import { useState } from 'react';
import { fetchIdDrinks, fetchIdMeals } from '../services/FethIdFoods';

export default function Details() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  const ingredienteRecipe = (data) => {
    const keysIngredient = Object.keys(data)
      .filter((key) => key.includes('strIngredient'));
    const kesMeasure = Object.keys(data).filter((key) => key.includes('strMeasure'));

    const ingredientsFilter = keysIngredient.map((key) => {
      if (data[key] !== '') {
        return data[key];
      }
      return null;
    }).filter((ingredient) => ingredient !== null);
    const measureFilter = kesMeasure.map((key) => {
      if (data[key] !== '') {
        return data[key];
      }
      return null;
    }).filter((ingredient) => ingredient !== null);
    setIngredients(ingredientsFilter);
    setMeasure(measureFilter);
  };
  const searchIdFood = async (url, id) => {
    if (url === 'meals') {
      const data = await fetchIdMeals(id);
      ingredienteRecipe(data.meals[0]);
      setRecipe(data.meals[0]);
    } else {
      const data = await fetchIdDrinks(id);
      ingredienteRecipe(data.drinks[0]);
      setRecipe(data.drinks[0]);
    }
  };

  return {
    recipe,
    ingredients,
    measure,
    setRecipe,
    searchIdFood,
  };
}
