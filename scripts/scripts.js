import { recipes } from '../json/recipes.js';

// Exemple d'utilisation :
async function displayRecipes() {
    recipes.forEach(recipe => {
        console.log(recipe);
        
    });
}

displayRecipes();

async function init () {
    const recipes = await displayRecipes();
}

init();