import { recipes } from '../../json/recipes.js';

recipes.forEach(recipe => { // Pour chaque recette, récupérer les ingrédients
    recipe.ingredients.forEach(ingredient => {
        // Crée un nouvel élément de liste
        const li = document.createElement("li");
        // Ajoute le texte de l'ingrédient
        li.textContent = ingredient.ingredient;
        // Ajoute un écouteur d'événement pour la sélection
        li.addEventListener("click", () => selectItem(li));
        // Ajoute l'élément à la liste
        document.getElementById("ingredientList").appendChild(li);
    });
});

function toggleDropdown() {
    // Sélectionne le menu déroulant
    const dropdown = document.querySelector(".dropdown-content");
    // Alterne l'affichage du menu déroulant entre visible et caché
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}
toggleDropdown();

function selectItem(element) {
    // Récupère l'élément actuellement sélectionné
    const previouslySelected = document.querySelector("#ingredientList .selected");
    const selectedItemDisplay = document.querySelector(".dropdown-header span");
    
    if (previouslySelected === element) {
        // Si l'élément sélectionné est cliqué à nouveau, on réinitialise la sélection
        clearSelection();
    } else {
        // Supprime la classe 'selected' de tous les éléments de la liste
        document.querySelectorAll("#ingredientList li").forEach(li => {
            li.classList.remove("selected");
            li.innerHTML = li.textContent; // Supprime la croix précédemment ajoutée
        });
        
        // Ajoute la classe 'selected' à l'élément cliqué
        element.classList.add("selected");
        // Ajoute une croix à côté du texte pour indiquer la possibilité de désélectionner
        element.innerHTML = element.textContent + ' <span class="clear-selection" onclick="clearSelection(event)">✖</span>';
        
        // Met à jour l'affichage du texte sélectionné en haut du menu déroulant
        selectedItemDisplay.textContent = element.textContent;
    }
    
    // Ferme le menu après la sélection
    document.querySelector(".dropdown-content").style.display = "none";
}

function clearSelection(event) {
    if (event) {
        // Empêche la fermeture immédiate du menu lors du clic sur la croix
        event.stopPropagation();
    }
    // Récupère l'élément actuellement sélectionné
    const previouslySelected = document.querySelector("#ingredientList .selected");
    const selectedItemDisplay = document.querySelector(".dropdown-header span");
    
    if (previouslySelected) {
        // Retire la classe 'selected'
        previouslySelected.classList.remove("selected");
        // Supprime la croix en restaurant seulement le texte de l'élément
        previouslySelected.innerHTML = previouslySelected.textContent.replace(" ✖", "");
    }
    
    // Réinitialise le texte affiché en haut du menu
    selectedItemDisplay.textContent = "Ingrédients";
}

function filterItems() {
    // Récupère la valeur de la barre de recherche en minuscules
    const input = document.getElementById("searchInput").value.toLowerCase();
    // Sélectionne tous les éléments de la liste
    const items = document.querySelectorAll("#ingredientList li");

    // Parcourt tous les éléments et les affiche ou les cache selon le filtre
    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
    });
}
filterItems();

// Ferme le menu si on clique ailleurs sur la page
document.addEventListener("click", (event) => {
    // Récupère le menu principal
    const dropdown = document.querySelector(".dropdown");
    // Si le clic n'est pas dans le menu, on ferme la liste déroulante
    if (!dropdown.contains(event.target)) {
        document.querySelector(".dropdown-content").style.display = "none";
    }
});