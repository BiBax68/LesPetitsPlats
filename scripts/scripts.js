import { recipes } from '../json/recipes.js';
import { handleSearch } from './search.js';



export function displayRecipes(recipesToDisplay = recipes) {
    const recipeCardArea = document.querySelector('.recipe_card_area');
    const recipeCounter = document.querySelector('.nbr_recettes');
    recipeCardArea.innerHTML = ''; // Vide la zone avant d'ajouter les nouvelles recettes

    //Initialisation du tableau de recettes
    let recipesArray = [...recipesToDisplay];
    // Mise à jour du compteur de recettes
    recipeCounter.textContent = `${recipes.length} recettes`;

    recipesArray.forEach(recipe => {
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

document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();// Initialisation des recettes
    handleSearch();// Initialisation de la recherche
});
