// Faz requisiçao de uma comida pelo id
export const fetchIdMeals = async (idMeals) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`;
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Não foi possível encontrar a receita');
  }
};
// Faz requisiçao de uma bebida pelo id
export const fetchIdDrinks = async (idDrinks) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinks}`;
  try {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Não foi possível encontrar a receita');
  }
};
// Faz requisiçao de todas as comidas
export const fetchMeals = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};
// Faz requisiçao de todas as bebidas
export const fetchDrinks = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};
