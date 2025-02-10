import { recipes } from '../json/recipes.js';


function displayRecipes() {
    const recipeCardArea = document.querySelector('.recipe_card_area');
    recipeCardArea.innerHTML = ''; // Vide la zone avant d'ajouter les nouvelles recettes

    recipes.forEach(recipe => {
        const recipeCard = `
            <article class="recipe_card">
                <img src="./pictures/recipes/${recipe.image}" alt="${recipe.name}" />
                <span class="temps_recette">${recipe.time}min</span>
                <h2>${recipe.name}</h2>
                <p>${recipe.description}</p>
                <ul>
                    ${recipe.ingredients.map(ing => `
                        <li>${ing.ingredient}${ing.quantity ? ' : ' + ing.quantity : ''}${ing.unit ? ' ' + ing.unit : ''}</li>
                    `).join('')}
                </ul>
            </article>
        `;
        recipeCardArea.innerHTML += recipeCard;
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();
});
// Exemple d'utilisation :
// async function displayRecipes() {
//     recipes.forEach(recipe => {
//         console.log(recipe);
//     });
// }

// displayRecipes();

// async function init () {
//     const recipes = await displayRecipes();
// }

// init();