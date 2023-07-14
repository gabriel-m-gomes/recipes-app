import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom.min';
import FoodContext from '../Context/FoodContext';
import { fetchCategory } from '../services/fetchApi';
import '../style/Recipes.css';

function Recipe() {
  const location = useLocation();
  const { pathname } = location;
  const { recipes, pedido, setRecipes } = useContext(FoodContext);
  const [categories, setCategories] = useState([]);
  const [arrayCategory, setArrayCategory] = useState([]);
  const [toogle, setToogle] = useState(true);
  //
  const verifyArray = arrayCategory.length > 0 ? arrayCategory : '';
  const novoRecipes = recipes?.meals || recipes?.drinks || verifyArray;
  const strRecipe = pathname === '/meals' ? 'strMeal' : 'strDrink';
  const strImg = pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const strId = pathname === '/meals' ? 'idMeal' : 'idDrink';
  const rota = pathname === '/meals' ? 'meals' : 'drinks';

  const map = novoRecipes || pedido;
  const numSlice = 12;

  useEffect(() => {
    const fetchCategoryButton = async () => {
      const numCategory = 5;
      const path = pathname === '/meals' ? 'themeal' : 'thecocktail';
      const responseCategory = await fetch(`https://www.${path}db.com/api/json/v1/1/list.php?c=list`);
      const dataCategory = await responseCategory.json();
      const filterCategory = dataCategory[rota]
        .slice(0, numCategory).map((data) => data);

      setCategories(filterCategory);
    };
    fetchCategoryButton();
  }, [rota, pathname]);

  const handleBut = async ({ target: { name } }) => {
    const dataCategory = (await fetchCategory(name, pathname));
    setToogle(!toogle);
    if (toogle) {
      const filterCategory = dataCategory[rota].slice(0, numSlice).map((data) => data);
      setArrayCategory(filterCategory);
    } else {
      setArrayCategory(pedido);
    }
  };

  const handleAll = () => {
    setArrayCategory(pedido);
    setRecipes(pedido);
  };

  return (
    <div className="recipes">
      { map
         && map.slice(0, numSlice).map((recipe, index) => (

           <Link
             key={ `recipe-card-${index}` }
             className="teste"
             data-testid={ `${index}-recipe-card` }
             to={ `${pathname}/${recipe[strId]}` }
           >
             <p
               key={ `card-name-${index}` }
               data-testid={ `${index}-card-name` }
             >
               {recipe[strRecipe]}
             </p>
             <img
               key={ `card-img-${index}` }
               data-testid={ `${index}-card-img` }
               src={ recipe[strImg] }
               alt="foto da receita"
             />

           </Link>
         ))}
      <div className="buts">
        {categories.map((categoryName, index) => (
          <button
            className="red"
            key={ index }
            data-testid={ `${categoryName.strCategory}-category-filter` }
            name={ categoryName.strCategory }
            onClick={ handleBut }
          >
            {categoryName.strCategory}
          </button>
        ))}
        <button onClick={ handleAll } data-testid="All-category-filter">All</button>
      </div>
    </div>
  );
}

export default Recipe;
