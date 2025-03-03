// Objective: Events for the website
import { displayRecipes } from './scripts.js';
import { handleSearch } from './search.js';
import { initializeDropdowns } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();

    // On stocke l’objet renvoyé par handleSearch
    const searchHandler = handleSearch();

    // À chaque mise à jour de la recherche, réinitialiser les dropdowns
    document.querySelector('.search_input')
        .addEventListener('input', () => {
            initializeDropdowns();
        });

    initializeDropdowns();
});