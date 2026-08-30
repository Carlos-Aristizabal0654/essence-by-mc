# Essence by M&C

Catálogo web de perfumería — María Fernanda & Carlos.

## Estructura del proyecto

```
essence-mc/
├── index.html          → página principal
├── css/styles.css       → estilos (colores, tipografía, layout)
├── img/                   → aquí van las fotos de cada perfume
├── js/data.js            → catálogo de fragancias (edítalo para agregar/quitar productos)
├── js/script.js          → filtros y renderizado
└── README.md
```

## Cómo agregar las fotos de los perfumes

1. Guarda la foto del frasco dentro de la carpeta **`img/`**. Usa nombres simples y sin espacios ni tildes, por ejemplo: `sauvage.jpg`, `good-girl.jpg`, `212-vip-men.jpg`.
2. Ve al archivo **`js/data.js`** y busca la fragancia correspondiente. Escribe el nombre del archivo en el campo `imagen`:

```js
{ id: 57, nombre: "Sauvage", marca: "Dior", genero: "hombre", momento: "dia", notas: ["Fresco","Amaderado","Especiado"], destacado: true, imagen: "sauvage.jpg" }
```

3. Guarda y listo — la foto aparecerá automáticamente en su tarjeta.

Mientras el campo `imagen` esté vacío (`imagen: ""`), la tarjeta muestra un espacio reservado con el texto "Agregar foto", para que sepan de un vistazo cuáles fragancias todavía necesitan imagen.

**Recomendación:** fotos en formato vertical (proporción 4:5, por ejemplo 800×1000 px), fondo neutro o blanco, y buena luz — así todas las tarjetas del catálogo se ven parejas y prolijas.

## Cómo publicarlo en GitHub Pages (gratis)

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo, por ejemplo `essence-by-mc` (en minúsculas, sin espacios).
3. Sube estos archivos al repositorio (puedes arrastrarlos desde la web de GitHub con el botón **"Add file → Upload files"**, o usando Git si lo prefieres).
4. Entra a **Settings → Pages** dentro del repositorio.
5. En "Branch", selecciona `main` y la carpeta `/ (root)`. Guarda.
6. En un par de minutos tu página estará publicada en:
   `https://tu-usuario.github.io/essence-by-mc/`

Ese es el link que puedes compartir en tus redes (Instagram, WhatsApp, TikTok, etc.).

## Cómo agregar o editar fragancias

Todo el catálogo vive en **`js/data.js`**. Cada fragancia es un bloque así:

```js
{ id: 63, nombre: "Nombre del perfume", marca: "Marca", genero: "mujer", momento: "dia", notas: ["Floral", "Frutal"] }
```

- `genero`: `"mujer"`, `"hombre"` o `"unisex"` (los unisex aparecen en ambas colecciones).
- `momento`: `"dia"` o `"noche"`.
- `notas`: lista de familias olfativas (Dulce, Amaderado, Cítrico, Floral, Oriental, Acuático, Especiado, Ámbar, Gourmand, etc.) — puedes usar las que quieras, los filtros se generan solos según lo que escribas aquí.
- `destacado: true` (opcional) — le pone una etiqueta "Favorito" a la tarjeta.

No necesitas tocar el HTML ni el CSS para actualizar el catálogo, solo este archivo.

## Sobre las clasificaciones día/noche y notas

Las clasifiqué según el perfil olfativo general y conocido de cada fragancia (por ejemplo, Sauvage como fresco/amaderado de día, Coco Chanel como oriental de noche). Son una guía orientativa pensada para ayudar al cliente a elegir — si tú y María Fernanda conocen mejor cómo se comporta cada una en piel, ajústenlas libremente en `data.js`.

## Personalización pendiente

Antes de compartir el link, recuerda:
- Cambiar el número de WhatsApp en `index.html` (busca `wa.me/0000000000`).
- Cambiar el link de Instagram (`instagram.com/essencebymc`) por su cuenta real.
- Revisar precios: actualmente el catálogo no muestra precios; si quieren mostrarlos, se puede agregar un campo `precio` fácilmente.
