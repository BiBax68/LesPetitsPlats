import { recipes } from '../json/recipes.js';
import { displayRecipes } from './scripts.js';
import { getCurrentRecipes } from './search.js';

console.log('Recettes filtrées actuelles:', getCurrentRecipes());

// Stockage pour les ingrédients, appareils et ustensiles sélectionnés
export const selectedFilters = {
    ingredients: [],
    appliances: [],
    ustensils: []
};

// Fonction pour initialiser tous les dropdowns
export function initializeDropdowns() {
    initializeIngredientsList();
    initializeAppliancesList();
    initializeUtensilsList();
    attachEventListeners();
}

// Fonction pour ouvrir/fermer un dropdown spécifique
function toggleDropdown(event) {
    const header = event.currentTarget;
    console.log(event.currentTarget);
    const content = header.nextElementSibling;
    console.log(header.nextElementSibling);

    // Vérifier si ce dropdown est déjà ouvert
    const isOpen = content.style.display === "block";

    // Fermer tous les dropdowns d'abord
    document.querySelectorAll(".dropdown-content").forEach(dropdown => {
        dropdown.style.display = "none";
    });

    // Ouvrir ce dropdown s'il n'était pas déjà ouvert
    if (!isOpen) {
        content.style.display = "block";
    }
}

// Fonction pour sélectionner un élément dans n'importe quel dropdown
function selectItem(element, type) {
    const listId = element.parentElement.id;
    const previouslySelected = document.querySelector(`#${listId} .selected`);
    const selectedItemDisplay = element.closest('.dropdown').querySelector(".dropdown-header span");

    if (previouslySelected === element) {
        clearSelection(null, type);
    } else {
        // Supprime la classe 'selected' de tous les éléments de la liste
        document.querySelectorAll(`#${listId} li`).forEach(li => {
            li.classList.remove("selected");
            li.innerHTML = li.textContent; // Supprime la croix précédemment ajoutée
        });

        // Ajoute la classe 'selected' à l'élément cliqué
        element.classList.add("selected");

        // Crée l'élément span pour la croix
        const clearBtn = document.createElement("span");
        clearBtn.classList.add("clear-selection");
        clearBtn.textContent = "✖";
        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            clearSelection(e, type);
        });

        // Sauvegarde le texte original
        const originalText = element.textContent;

        // Ajoute l'élément au tableau de filtres sélectionnés
        if (!selectedFilters[type].includes(originalText)) {
            selectedFilters[type].push(originalText);
        }

        // Vide l'élément
        element.textContent = originalText + " ";
        // Ajoute le bouton à l'élément
        element.appendChild(clearBtn);

        // Met à jour l'affichage du texte sélectionné en haut du menu déroulant
        selectedItemDisplay.textContent = originalText;

        // Filtrer les recettes selon les filtres sélectionnés
        filterRecipes();
    }

    // Ferme le menu après la sélection
    element.closest('.dropdown-content').style.display = "none";
}

// Fonction pour effacer la sélection d'un type spécifique
function clearSelection(event, type) {
    if (event) {
        event.stopPropagation();
    }

    const listSelector = type === 'ingredients' ? '#ingredientList' :
        type === 'appliances' ? '#applianceList' : '#utensilList';

    const previouslySelected = document.querySelector(`${listSelector} .selected`);
    const dropdownSelector = type === 'ingredients' ? '.dropdown-ingredients' :
        type === 'appliances' ? '.dropdown-appareils' : '.dropdown-ustensiles';

    const selectedItemDisplay = document.querySelector(`${dropdownSelector} .dropdown-header span`);

    if (previouslySelected) {
        previouslySelected.classList.remove("selected");
        previouslySelected.innerHTML = previouslySelected.textContent.replace(" ✖", "");

        // Retirer l'élément des filtres sélectionnés
        const text = previouslySelected.textContent.trim();
        const index = selectedFilters[type].indexOf(text);
        if (index > -1) {
            selectedFilters[type].splice(index, 1);
        }
    }

    // Réinitialiser le texte affiché
    if (type === 'ingredients') {
        selectedItemDisplay.textContent = "Ingrédients";
    } else if (type === 'appliances') {
        selectedItemDisplay.textContent = "Appareils";
    } else {
        selectedItemDisplay.textContent = "Ustensiles";
    }

    // Filtrer les recettes selon les filtres mis à jour
    filterRecipes();
}

// Fonction pour filtrer les éléments dans un dropdown spécifique
function filterItems(event) {
    const input = event.target;
    const searchText = input.value.toLowerCase();
    const dropdownContent = input.closest('.dropdown-content');
    const items = dropdownContent.querySelectorAll('li');

    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(searchText) ? "block" : "none";
    });
}

// Fonction pour filtrer les recettes selon les filtres sélectionnés
function filterRecipes() {
    // Get current recipes from search
    let filteredRecipes = getCurrentRecipes();

    // Filtre par ingrédients
    if (selectedFilters.ingredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return selectedFilters.ingredients.every(ing =>
                recipe.ingredients.some(recipeIng =>
                    recipeIng.ingredient.toLowerCase() === ing.toLowerCase()));
        });
    }

    // Filtre par appareils
    if (selectedFilters.appliances.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return selectedFilters.appliances.some(app =>
                recipe.appliance.toLowerCase() === app.toLowerCase());
        });
    }

    // Filtre par ustensiles
    if (selectedFilters.ustensils.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return selectedFilters.ustensils.every(ust =>
                recipe.ustensils.some(recipeUst =>
                    recipeUst.toLowerCase() === ust.toLowerCase()));
        });
    }

    // Afficher les recettes filtrées
    displayRecipes(filteredRecipes);

    // Mettre à jour les listes de filtres
    initializeIngredientsList();
    initializeAppliancesList();
    initializeUtensilsList();
}

// Fonction pour initialiser la liste des ingrédients
function initializeIngredientsList() {
    // Créer un Set pour stocker les ingrédients uniques
    const uniqueIngredients = new Set();

    // Récupérer les recettes actuellement filtrées (toujours à jour)
    const currentRecipes = getCurrentRecipes();
    console.log(currentRecipes.length, 'test');

    // Récupérer tous les ingrédients uniques
    currentRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            uniqueIngredients.add(ingredient.ingredient);
        });
    });

    // Convertir le Set en tableau et trier les ingrédients par ordre alphabétique
    const sortedIngredients = [...uniqueIngredients].sort();
    const ingredientList = document.getElementById("ingredientList");

    // Vider la liste avant d'ajouter les nouveaux éléments
    ingredientList.innerHTML = '';

    // Créer les éléments de liste pour chaque ingrédient unique
    sortedIngredients.forEach(ingredientName => {
        const li = document.createElement("li");
        li.textContent = ingredientName;
        li.classList.add("dropdown-item");
        li.addEventListener("click", () => selectItem(li, 'ingredients'));
        ingredientList.appendChild(li);
    });
}

// Fonction pour initialiser la liste des appareils
function initializeAppliancesList() {
    // Créer un Set pour stocker les appareils uniques
    const uniqueAppliances = new Set();

    // Récupérer les recettes actuellement filtrées (toujours à jour)
    const currentRecipes = getCurrentRecipes();
    console.log('Mise à jour de la liste d\'ingrédients avec', currentRecipes.length, 'recettes');

    // Récupérer tous les ingrédients uniques
    currentRecipes.forEach(recipe => {
        uniqueAppliances.add(recipe.appliance);
    });

    // Convertir le Set en tableau et trier par ordre alphabétique
    const sortedAppliances = [...uniqueAppliances].sort();
    const applianceList = document.getElementById("applianceList");

    // Vider la liste avant d'ajouter les nouveaux éléments
    applianceList.innerHTML = '';

    // Créer les éléments de liste pour chaque appareil unique
    sortedAppliances.forEach(applianceName => {
        const li = document.createElement("li");
        li.textContent = applianceName;
        li.classList.add("dropdown-item");
        li.addEventListener("click", () => selectItem(li, 'appliances'));
        applianceList.appendChild(li);
    });
}

// Fonction pour initialiser la liste des ustensiles
function initializeUtensilsList() {
    // Créer un Set pour stocker les ustensiles uniques
    const uniqueUtensils = new Set();
    const currentRecipes = getCurrentRecipes();

    // Récupérer tous les ustensiles uniques
    currentRecipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
            uniqueUtensils.add(utensil);
        });
    });

    // Convertir le Set en tableau et trier par ordre alphabétique
    const sortedUtensils = [...uniqueUtensils].sort();
    const utensilList = document.getElementById("utensilList");

    // Vider la liste avant d'ajouter les nouveaux éléments
    utensilList.innerHTML = '';

    // Créer les éléments de liste pour chaque ustensile unique
    sortedUtensils.forEach(utensilName => {
        const li = document.createElement("li");
        li.textContent = utensilName;
        li.classList.add("dropdown-item");
        li.addEventListener("click", () => selectItem(li, 'ustensils'));
        utensilList.appendChild(li);
    });
}

// Fonction pour attacher les écouteurs d'événements
function attachEventListeners() {
    // Ajouter des écouteurs d'événements aux headers des dropdowns
    document.querySelectorAll(".dropdown-header").forEach(header => {
        header.addEventListener("click", toggleDropdown);
    });

    // Ajouter des écouteurs d'événements aux barres de recherche
    document.querySelectorAll(".searchInput").forEach(input => {
        input.addEventListener("keyup", filterItems);
    });

    // Fermer les menus si on clique ailleurs sur la page
    document.addEventListener("click", (event) => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll(".dropdown-content").forEach(content => {
                content.style.display = "none";
            });
        }
    });
}