import { recipes } from '../json/recipes.js';


function displayRecipes() {
    const recipeCardArea = document.querySelector('.recipe_card_area');
    const recipeCounter = document.querySelector('.nbr_recettes');
    recipeCardArea.innerHTML = ''; // Vide la zone avant d'ajouter les nouvelles recettes

    // Mise à jour du compteur de recettes
    recipeCounter.textContent = `${recipes.length} recettes`;

    recipes.forEach(recipe => {
        const recipeCard = `
            <article class="recipe_card">
                <img src="./pictures/recipes/${recipe.image}" alt="${recipe.name}" />
                <span class="temps_recette">${recipe.time}min</span>
                <div class="text_recette">
                <h2>${recipe.name}</h2>
                <h3>recette</h3>
                <p class="extrait_recette">${recipe.description}</p>
                <h3>ingrédients</h3>
                <ul class="liste_ingredients">
                    ${recipe.ingredients.map(ing => `
                        <li>${ing.ingredient} <br><span>${ing.quantity ? + ing.quantity : ''}${ing.unit ? ' ' + ing.unit : ''}</span></li>
                    `).join('')}
                </ul>
                </div>

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
// async function displayRecipes() {  ' : '
//     recipes.forEach(recipe => {
//         console.log(recipe);
//     });
// }

// displayRecipes();

// async function init () {
//     const recipes = await displayRecipes();
// }

// init();

//.include pour récupérer les recettes avec les boutons filtre
//.filter la barre de recherche. Voir video ytb Enzo ecole du web