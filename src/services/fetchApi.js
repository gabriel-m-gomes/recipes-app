const erro = 'Error ao obter dados da API.';
const fetchIngredient = async (ingredient, pathname) => {
  let apiUrl = '';

  if (pathname === '/meals') {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
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

const fetchCategory = async (category, pathname) => {
  let apiUrl = '';
  if (pathname === '/meals') {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    console.log(apiUrl);
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
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
const fetchId = async (id, pathname) => {
  let apiUrl = '';
  if (pathname === `/meals/${id}/in-progress`) {
    apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
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
  fetchCategory,
  fetchIngredient,
  fetchName,
  fetchFirstLetter,
  fetchId,
};
