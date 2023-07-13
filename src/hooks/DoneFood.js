export default function DoneFood(id, url) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const inProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || undefined;
  let inProgress = false;
  if (inProgressRecipes !== undefined) {
    inProgress = Object.keys(inProgressRecipes[url]).some((recipe) => recipe === id);
    console.log(inProgress);
  }
  const button = doneRecipes.some((recipe) => recipe === id);
  return {
    button,
    textButton: !inProgress,
  };
}
