"use strict";
// Global DOM selectors with explicit element types
const newCategoryForm = document.querySelector('#nueva-categoria');
const newCategoryInput = newCategoryForm.querySelector('input');
const categoriesContainer = document.querySelector('.contenedor-categoria');
const summaryList = document.querySelector('#lista-resumen');
// 1. Updates the global summary list with products that are not yet marked as purchased.
const updateSummaryList = () => {
    // Clear previous items to avoid duplicates
    summaryList.innerHTML = '';
    // Select all unchecked product checkboxes
    const pendingCheckboxes = document.querySelectorAll('.lista-productos input[type="checkbox"]:not(:checked)');
    pendingCheckboxes.forEach((checkbox) => {
        // Traverse to parent <li> to extract the product label
        const originalListItem = checkbox.closest('li');
        if (!originalListItem)
            return;
        const productSpan = originalListItem.querySelector('span');
        const productName = productSpan ? productSpan.textContent : '';
        // Create summary <li> item and append it
        const summaryItem = document.createElement('li');
        summaryItem.textContent = productName;
        summaryList.appendChild(summaryItem);
    });
};
/* Configures event listeners for a category card (deletion and product addition).
  @param cardElement The HTML details element representing the category.
*/
const setupCard = (cardElement) => {
    // 1. Configure category deletion button
    const deleteCategoryButton = cardElement.querySelector('.btn-eliminar-categoria');
    if (deleteCategoryButton) {
        deleteCategoryButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents details toggle open/close
            cardElement.remove();
            updateSummaryList();
        });
    }
    // 2. Select inner form elements for adding products
    const productForm = cardElement.querySelector('form');
    const productInput = cardElement.querySelector('input');
    const productsList = cardElement.querySelector('.lista-productos');
    // Guard clause to ensure all elements exist before attaching listeners
    if (!productForm || !productInput || !productsList) {
        return;
    }
    // 3. Configure form submission to add new products
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productName = productInput.value.trim();
        if (productName === '') {
            return;
        }
        // 3.1 Create <li> container
        const productItem = document.createElement('li');
        // 3.2 Define internal HTML structure
        productItem.innerHTML = `
      <input type="checkbox">
      <span>${productName}</span>
      <button type="button" class="btn-eliminar">X</button>
    `;
        // 3.3 Configure product delete button
        const deleteProductButton = productItem.querySelector('.btn-eliminar');
        if (deleteProductButton) {
            deleteProductButton.addEventListener('click', () => {
                productItem.remove();
                updateSummaryList();
            });
        }
        // 3.4 Configure checkbox to strike through text and update summary
        const productCheckbox = productItem.querySelector('input[type="checkbox"]');
        const productSpan = productItem.querySelector('span');
        if (productCheckbox && productSpan) {
            productCheckbox.addEventListener('change', () => {
                productSpan.classList.toggle('producto-comprado', productCheckbox.checked);
                updateSummaryList();
            });
        }
        // 3.5 Append product to category list and update global summary
        productsList.appendChild(productItem);
        updateSummaryList();
        // 3.6 Reset input field
        productInput.value = '';
    });
};
// INITIALIZATION AND GLOBAL EVENT LISTENERS 
// Initialise cards already defined in the static HTML markup
const initialCards = document.querySelectorAll('.tarjeta-categoria');
initialCards.forEach((card) => {
    setupCard(card);
});
// Configure creation of new dynamic categories
newCategoryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const categoryName = newCategoryInput.value.trim();
    if (categoryName === '') {
        return;
    }
    // Create category wrapper using semantic HTMLDetailsElement
    const newCard = document.createElement('details');
    newCard.classList.add('tarjeta-categoria');
    // Define inner template matching original markup
    newCard.innerHTML = `
    <summary>
      <span>${categoryName}</span>
      <button type="button" class="btn-eliminar-categoria" title="Eliminar categoría">×</button>
    </summary>
    <form>
      <input type="text" placeholder="Ej. Nuevo producto...">
      <button type="submit">Añadir</button>
    </form>
    <ul class="lista-productos"></ul>
  `;
    // Attach event handlers to the newly instantiated card
    setupCard(newCard);
    // Append new card into DOM container and reset input field
    categoriesContainer.appendChild(newCard);
    newCategoryInput.value = '';
});
//# sourceMappingURL=index.js.map