# Tu Cesta de la Compra

Aplicación web interactiva desarrollada para gestionar listas de compra organizadas por categorías dinámicas y sincronizadas en tiempo real con una lista resumen global de productos pendientes.

## Tecnologías
* HTML5 semántico
* CSS3 (Diseño responsivo, Flexbox)
* JavaScript moderno (Manipulación del DOM y eventos nativos)

## Funcionalidades
* **Categorías dinámicas:** Creación y eliminación de categorías personalizadas implementadas con la etiqueta semántica nativa `<details>`.
* **Gestión de productos por categoría:** Adición y borrado individual de artículos sin recargar la página (`preventDefault`).
* **Lista resumen reactiva:** Filtro dinámico en tiempo real que captura únicamente los productos pendientes de compra (`:not(:checked)`) y los retira automáticamente al marcarlos como completados.

## Instalación y ejecución
1. Clona el repositorio desde la terminal:
   ```bash
   git clone https://github.com/Mapesho06/shopping-list.git

