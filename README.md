# MOBILAR

## 🛋️ Sobre el proyecto

Mobilar es un proyecto web orientado a la venta de muebles, productos para el hogar, oficina y tecnología.

El objetivo es desarrollar una tienda online moderna, responsive e intuitiva, aplicando progresivamente HTML5, CSS3, Bootstrap y JavaScript.

---

## 👥 Integrante

* Xavier Dantur

---

## 🛠️ Tecnologías

* HTML5
* CSS3
* Bootstrap
* JavaScript
* Git
* GitHub
* Netlify

---

# 📚 Trabajos Prácticos

## TP1 — Estructura HTML

En el primer trabajo práctico se desarrolló la estructura inicial de Mobilar utilizando HTML5 y etiquetas semánticas.

Se definieron las principales secciones:

* Header
* Navbar
* Inicio
* Categorías
* Productos
* Ofertas
* Nosotros
* Contacto
* Footer

---

## TP2 — CSS y Responsive Design

En el segundo trabajo práctico se transformó la estructura HTML en una interfaz web completa mediante CSS3.

### Variables CSS

Se utilizaron variables mediante `:root` y `var()` para mantener una identidad visual consistente.

Se definieron variables para:

* Colores.
* Espaciados.
* Bordes.
* Radios.
* Sombras.
* Transiciones.

Ejemplo:

```css
:root {
    --color-primary: #111827;
    --color-secondary: #d97706;
    --color-white: #ffffff;
    --border-radius: 12px;
    --transition: all 0.3s ease;
}
```

---

### Flexbox

Se utilizó Flexbox para organizar diferentes elementos del sitio.

Principalmente:

* Navbar.
* Categorías.
* Sección de ofertas.
* Sección Nosotros.
* Elementos de productos.
* Formulario.

Ejemplo:

```css
.offer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
```

---

### CSS Grid

CSS Grid se utilizó principalmente para organizar el catálogo de productos y el footer.

Ejemplo:

```css
.products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
```

---

### Box Model

Se aplicó el modelo de caja mediante:

* `margin`
* `padding`
* `border`
* `box-sizing`

Se estableció:

```css
* {
    box-sizing: border-box;
}
```

---

### Unidades utilizadas

El proyecto utiliza diferentes unidades de medida:

* `px`
* `%`
* `rem`
* `vh`
* `vw`
* `fr`

También se utilizaron funciones CSS como `clamp()` para adaptar algunos tamaños de forma responsive.

---

### Responsive Design

Se implementaron Media Queries para adaptar la página a diferentes dispositivos.

El diseño contempla:

* Computadoras.
* Tablets.
* Celulares.

El catálogo de productos modifica la cantidad de columnas según el ancho disponible.

---

# 🚀 TP3 — Bootstrap

En el tercer trabajo práctico se realizará una refactorización del proyecto utilizando Bootstrap.

El CSS desarrollado durante el TP2 será conservado y comentado.

Se incorporarán componentes de Bootstrap como:

* Navbar.
* Cards.
* Buttons.
* Grid.
* Modal.
* Formulario.

Finalmente, el proyecto será publicado utilizando Netlify.

---

# ⚡ TP4 — JavaScript y DOM

En el cuarto trabajo práctico se incorporarán funcionalidades mediante JavaScript y manipulación del DOM.

Entre las funcionalidades previstas:

* Buscador de productos.
* Filtros por categoría.
* Ordenamiento.
* Carrito de compras.
* Agregar productos.
* Eliminar productos.
* Favoritos.
* Eventos e interacción con el usuario.

---

## 🌐 Deploy

El proyecto será publicado mediante Netlify.

---

