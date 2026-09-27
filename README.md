# MOBILAR

##  Sobre el proyecto

Mobilar es un proyecto web orientado a la venta de muebles, productos para el hogar, oficina y tecnología.

El objetivo es desarrollar una tienda online moderna, responsive e intuitiva, aplicando progresivamente HTML5, CSS3, Bootstrap y JavaScript.

---

##  Integrante

* Xavier Dantur

---

##  Tecnologías

* HTML5
* CSS3
* Bootstrap
* JavaScript
* Git
* GitHub
* Netlify

---

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

---

### Responsive Design

Se implementaron Media Queries para adaptar la página a diferentes dispositivos.

El diseño contempla:

* Computadoras.
* Tablets.
* Celulares.

El catálogo de productos modifica la cantidad de columnas según el ancho disponible.

---

## TP3 — Refactorización con Bootstrap

En el TP3 se refactorizó la interfaz desarrollada en el TP2
utilizando Bootstrap 5.3.3.

Se utilizaron principalmente:

- Navbar
- Container
- Grid system
- Cards
- Buttons
- Badges
- Forms
- Modal
- Utilities de spacing
- Utilities de flexbox
- Responsive breakpoints

El objetivo fue reducir la cantidad de CSS personalizado y utilizar
las herramientas proporcionadas por Bootstrap para estructura,
responsive design y componentes visuales.

El CSS personalizado se mantiene únicamente para elementos
específicos de la identidad visual de Mobilar y componentes que
requieren una personalización adicional.

---

## TP4 — JavaScript y DOM

En el TP4 se incorporaron funcionalidades mediante JavaScript,
manipulación del DOM y eventos.

### Funcionalidades implementadas

- Buscador de productos.
- Filtros por categoría.
- Carrito de compras.
- Agregado de productos.
- Eliminación de productos.
- Persistencia mediante localStorage.
- Validación de formularios.
- Registro de usuarios.
- Inicio de sesión.
- Recordar usuario.
- Gestión de sesión.
- Página "Mi cuenta".
- Cierre de sesión.
- Actualización dinámica de elementos del Navbar.

---

##  Deploy

El proyecto será publicado mediante Netlify.

---

El proyecto utiliza una estructura de ramas para organizar el desarrollo.

main

dev/* feature/* refactor/*

Las funcionalidades y refactorizaciones se desarrollan en ramas independientes y posteriormente se integran mediante PR

## SEO — Estrategias implementadas

Durante el desarrollo de Mobilar se aplicaron diferentes estrategias
de SEO para mejorar la estructura, accesibilidad y comprensión del
sitio por parte de los motores de búsqueda.

### Meta etiquetas

Se incorporaron las siguientes etiquetas en el documento HTML:

- `title`: define el título de la página.
- `meta description`: describe el contenido principal del sitio.
- `meta keywords`: contiene palabras relacionadas con la temática
  del proyecto.
- `meta author`: identifica al autor del proyecto.
- `meta robots`: permite indicar que la página puede ser indexada
  y que sus enlaces pueden ser seguidos.

### Estructura semántica

Se utilizaron etiquetas HTML5 semánticas como:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`

Esto permite organizar el contenido de manera estructurada.

### Encabezados

Se utilizó una jerarquía de encabezados mediante:

- `h1` para el título principal.
- `h2` para las diferentes secciones.
- `h3` para contenidos secundarios, como los productos.

### Imágenes

Las imágenes utilizadas en el sitio poseen atributos `alt`
descriptivos relacionados con el contenido de cada producto.

Esto mejora la accesibilidad y permite que los motores de búsqueda
comprendan el contenido de las imágenes.

### URLs y navegación

El sitio utiliza enlaces internos mediante identificadores de sección,
permitiendo navegar entre:

- Inicio
- Categorías
- Productos
- Ofertas
- Nosotros
- Contacto

### Contenido

Los textos de las diferentes secciones utilizan palabras relacionadas
con la temática del proyecto, como:

- muebles
- oficina
- tecnología
- computación
- hogar
- escritorios
- sillas
- productos

Esto permite mantener coherencia entre el contenido y la temática
principal de Mobilar.