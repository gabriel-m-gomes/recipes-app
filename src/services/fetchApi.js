const erro = 'Error ao obter dados da API.';
const fetchIngredient = async (ingredient, pathname) => {
  const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  let apiUrl = '';

  if (pathname === '/meals') {
    apiUrl = `${baseUrl}/filter.php?i=${ingredient}`;
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(erro);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const fetchName = async (name, pathname) => {
  let apiUrl = '';

  if (pathname === '/meals') {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(erro);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const fetchFirstLetter = async (firstLetter, pathname) => {
  let apiUrl = '';

  if (pathname === '/meals') {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(erro);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {
  fetchIngredient,
  fetchName,
  fetchFirstLetter,
};
