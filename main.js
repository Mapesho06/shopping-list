// Constant variables for category form (global selectors)
const formNuevaCategoria = document.querySelector('#nueva-categoria');
const inputNuevaCategoria = formNuevaCategoria.querySelector('input');
const contenedorCategorias = document.querySelector('.contenedor-categoria');

// FUNCTION TO UPDATE THE GLOBAL SUMMARY LIST (IMPLEMENTATION)

// Summary list selector
const listaResumen = document.querySelector('#lista-resumen');

// Function that checks and collects non-purchased items (pending)
function actualizarListaResumen() {
  // 1. Clear the summary list to prevent duplicates
  listaResumen.innerHTML = '';

  // 2. Find all "Pending" checkboxes
  const checkboxesMarcados = document.querySelectorAll(
    '.lista-productos input[type="checkbox"]:not(:checked)'
  );

  // 3. Iterate through each pending checkbox and create its <li> in the summary
  checkboxesMarcados.forEach(function (checkbox) {
    // Get product text from sibling <span> inside the same <li>
    const elementoLiOriginal = checkbox.closest('li');
    const textoProducto = elementoLiOriginal.querySelector('span').textContent;

    // Create <li> element for the summary
    const itemResumen = document.createElement('li');
    itemResumen.textContent = textoProducto;

    // Append to the summary list
    listaResumen.appendChild(itemResumen);
  });
}

// FUNCTION TO REUSE STEPS ACROSS ANY CARD (DRY PRINCIPLE)
function configurarTarjeta(nuevaTarjeta) {
  // Step 3: Configure DELETE CATEGORY button
  const btnEliminar = nuevaTarjeta.querySelector('.btn-eliminar-categoria');
  if (btnEliminar) {
    btnEliminar.addEventListener('click', function (eventoDelBoton) {
      eventoDelBoton.stopPropagation(); // Prevents details toggle open/close
      nuevaTarjeta.remove(); // Removes card from DOM

      actualizarListaResumen(); // If category is deleted, clear its products from summary
    });
  }

  // Constant variables for product list form
  const formProducto = nuevaTarjeta.querySelector('form');
  const inputProducto = formProducto.querySelector('input');
  const listaProductos = nuevaTarjeta.querySelector('.lista-productos');

  // Step 4: Configure internal form to prevent page reload on Enter
  formProducto.addEventListener('submit', function (eventoDelProducto) {
    eventoDelProducto.preventDefault(); // Prevents default form submission reload

    const nombreProducto = inputProducto.value.trim();
    if (nombreProducto === '') return;

    // 4.1: Create <li> element
    const nuevoElementoLista = document.createElement('li');

    // 4.2: Define inner content (checkbox, text, and delete button)
    nuevoElementoLista.innerHTML = `
      <input type="checkbox">
      <span>${nombreProducto}</span>
      <button type="button" class="btn-eliminar">X</button>
    `;

    // 4.3: Configure product's delete button
    const btnEliminarProd = nuevoElementoLista.querySelector('.btn-eliminar');
    btnEliminarProd.addEventListener('click', function () {
      nuevoElementoLista.remove();

      actualizarListaResumen(); // If a checked item is removed, update summary
    });

    // 4.4: Configure checkbox to strike through text when marked as purchased
    const checkboxProducto = nuevoElementoLista.querySelector('input[type="checkbox"]');
    const textoProducto = nuevoElementoLista.querySelector('span');

    checkboxProducto.addEventListener('change', function () {
      // Toggle .producto-comprado class based on checkbox state
      textoProducto.classList.toggle('producto-comprado', checkboxProducto.checked);

      actualizarListaResumen(); // Update summary list with current pending products
    });

    // 4.5: Append to category list
    listaProductos.appendChild(nuevoElementoLista);

    actualizarListaResumen(); // Trigger summary update when product is initially created

    // 4.6: Clear input field
    inputProducto.value = '';
  });
}

// INITIALIZE CARDS ALREADY PRESENT IN ORIGINAL HTML
const tarjetasIniciales = document.querySelectorAll('.tarjeta-categoria');
tarjetasIniciales.forEach(function (tarjeta) {
  configurarTarjeta(tarjeta);
});

// STEPS TO CREATE AND DELETE DYNAMIC CARDS
formNuevaCategoria.addEventListener('submit', function (eventoDelFormulario) {
  eventoDelFormulario.preventDefault(); // Stop default browser reload

  const nombreCategoria = inputNuevaCategoria.value.trim(); // Read text and trim whitespace
  // Validation: do nothing if input is empty
  if (nombreCategoria === '') return;

  // Step 1: Create base <details> element for new cards
  const nuevaTarjeta = document.createElement('details');
  nuevaTarjeta.classList.add('tarjeta-categoria');

  // Step 2: Define internal markup using identical HTML structure
  nuevaTarjeta.innerHTML = `
    <summary>
      <span>${nombreCategoria}</span>
      <button type="button" class="btn-eliminar-categoria" title="Eliminar categoría">×</button>
    </summary>
    <form>
      <input type="text" placeholder="Ej. Nuevo producto...">
      <button type="submit">Añadir</button>
    </form>
    <ul class="lista-productos"></ul>
  `;

  // Attach full card handlers (deletion and product listeners)
  configurarTarjeta(nuevaTarjeta);

  // Step 5: Append card into main container
  contenedorCategorias.appendChild(nuevaTarjeta);

  // Step 6: Reset input field ready for next use
  inputNuevaCategoria.value = '';
});
