import { recipes } from '../json/recipes.js';
import { displayRecipes } from './scripts.js';

// Variable to store current filtered recipes
let currentFilteredRecipes = [...recipes];

export function handleSearch() {
    // Sélectionne l'input de recherche
    const searchInput = document.querySelector('.search_input');
    const searchResults = document.querySelector('.recipe_card_area');

    // Vérification que les éléments sont trouvés
    if (!searchInput || !searchResults) {
        console.error('Éléments DOM non trouvés');
        return;
    } else {
        console.log('Éléments DOM trouvés');
    }

    // Afficher toutes les recettes au départ
    displayRecipes(recipes);

    function filterData(e) {
        const searchedString = e.target.value.toLowerCase().trim(); // Ajout de trim()

        // Ne filtrer que si la recherche a au moins 3 caractères
        if (searchedString.length >= 3) {
            const filteredArray = recipes.filter(recipe => {
                return recipe.name.toLowerCase().includes(searchedString)
                    || recipe.description.toLowerCase().includes(searchedString)
                    || recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchedString));
            });

            // Vider et mettre à jour l'affichage
            searchResults.innerHTML = '';

            if (filteredArray.length === 0) {
                searchResults.innerHTML = '<p>Aucune recette ne correspond à votre recherche</p>';
            } else {
                displayRecipes(filteredArray);
                // Update the current filtered recipes
                currentFilteredRecipes = filteredArray;
                console.log('Recettes filtrées :', filteredArray);
            }

        } else if (searchedString.length === 0) {
            // Réafficher toutes les recettes si le champ est vide
            searchResults.innerHTML = '';
            displayRecipes(recipes);
            // Reset to all recipes
            currentFilteredRecipes = [...recipes];
        }
    }

    // Initialise un écouteur d'événement
    searchInput.addEventListener('input', filterData);

    // Return the handler for method access
    return {
        getRecipes: () => currentFilteredRecipes
    };

}

// Export a standalone function to get current recipes
export function getCurrentRecipes() {
    return currentFilteredRecipes;
}