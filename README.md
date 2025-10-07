# Joseph Santur - Portfolio Interactivo Avanzado (Actualizado)

Actualización que incorpora todas las mejoras recientes: optimizaciones de rendimiento, nuevas interacciones, accesibilidad y utilidades para generar el CV en PDF.

## Vista rápida
- Página principal: [index.html](index.html)  
- Estilos: [styles.css](styles.css)  
- Lógica y optimizaciones: [optimizations.js](optimizations.js)  
- Cursor personalizado: [cursor.js](cursor.js)  
- Generador de CV (PDF): [create_cv.py](create_cv.py) -> función principal: [`create_cv`](create_cv.py)  
- CV listo para descargar: [cvJSANTUR.pdf](cvJSANTUR.pdf) y vista previa [cv-preview.webp](cv-preview.webp)  
- Imágenes usadas: [hero-portrait.png](hero-portrait.png), [project-webapp.webp](project-webapp.webp), [project-mobile.webp](project-mobile.webp), [project-desktop.webp](project-desktop.webp), [mano.png](mano.png), [logo.png](logo.png)

---

## Nuevas características y dónde encontrarlas

- Precarga y priorización de recursos críticos: función [`preloadCriticalResources`](optimizations.js). Esto mejora FCP/LCP al preloading selectivo.  
  - Archivo: [optimizations.js](optimizations.js)

- Manejo robusto de eventos y rendimiento:
  - Debounce con opción inmediata: función [`debounce`](optimizations.js).  
  - Smooth scrolling mejorado: [`smoothScrollTo`](optimizations.js).  
  - Observers y animaciones escalonadas: IntersectionObserver usado en [optimizations.js](optimizations.js).

- Componentes JS modulares (clases ES6+):
  - Gestión de tema: [`ThemeManager`](optimizations.js) — persistencia en localStorage y detección del sistema.  
  - Seguidor de mouse suave: [`MouseFollower`](optimizations.js) y el script adicional [cursor.js](cursor.js).  
  - Indicador de progreso de scroll: [`ScrollProgress`](optimizations.js).  
  - Elementos flotantes con parallax: [`ParallaxFloating`](optimizations.js).  
  - Menú móvil mejorado: [`MobileMenu`](optimizations.js).  
  - Formulario de contacto con validación y animaciones: clase [`ContactForm`](optimizations.js) (métodos clave: [`animateSubmission`](optimizations.js), [`showNotification`](optimizations.js), [`isValidEmail`](optimizations.js)).  
  - Observadores e limpieza en unload para evitar fugas (listeners/observers desconectados).

- Interacciones y accesibilidad:
  - Efectos 3D y tilt en tarjetas interactives implementados en [index.html](index.html) + estilos en [styles.css](styles.css).  
  - Respecto a reduced-motion y high-contrast con media queries en [styles.css](styles.css).  
  - Cursor personalizado se oculta para dispositivos táctiles y cuando el usuario prefiere reducir movimiento ([cursor.js](cursor.js), [styles.css](styles.css)).  
  - Controles de accesibilidad: teclas para activar botones, roles/aria en markup ([index.html](index.html)).

- Optimización media y assets:
  - Lazy loading y atributos decoding/width/height en imágenes ([index.html](index.html)).  
  - Variantes webp y preloads: configuradas en [optimizations.js](optimizations.js) y referencias en [index.html](index.html).  
  - Service Worker para soporte offline (registro en [optimizations.js](optimizations.js)).

- Experiencias del usuario:
  - Toasts para descarga de CV y feedback de envío de formulario (implementados en [index.html](index.html) y [optimizations.js](optimizations.js)).  
  - Botón "volver arriba" con animación y control de visibilidad (en [index.html](index.html) y estilos en [styles.css](styles.css)).  
  - Barras de habilidades animadas y staggered animations controladas por IntersectionObserver ([index.html](index.html), [styles.css](styles.css)).

---

## Estructura del proyecto (resumida)
- [index.html](index.html) — contenido, markup y pequeñas interacciones inline.  
- [styles.css](styles.css) — variables CSS, temas, animaciones, responsive y utilidades.  
- [optimizations.js](optimizations.js) — código modular: inicialización de componentes y utilidades.  
- [cursor.js](cursor.js) — seguidor de cursor independiente.  
- [create_cv.py](create_cv.py) — script para generar PDF del CV con la función [`create_cv`](create_cv.py).  
- Recursos estáticos: imágenes y PDF listadas arriba.

---

## Cómo ejecutar en local
1. Levantar un servidor simple desde la raíz del proyecto:
```bash
python -m http.server 8000
```