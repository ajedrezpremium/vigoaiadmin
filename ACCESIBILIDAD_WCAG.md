// Mejoras de accesibilidad (WCAG 2.1 AA) — Semana 3 v1.2
// Este archivo documenta las mejoras aplicadas al código.

## Mejoras aplicadas

### 1. Skip-to-content link
- Añadido enlace "Saltar al contenido" al inicio del body en layout.tsx

### 2. ARIA labels
- Widget flotante: role="dialog", aria-label, aria-modal
- Botones: aria-label descriptivos en todos los botones de icono
- Navegación: aria-label en nav, aria-current en enlaces activos
- Formularios: aria-label en inputs, aria-describedby para errores

### 3. Navegación por teclado
- Tab order lógico en todos los componentes
- Escape cierra el widget flotante
- Enter envía mensaje en el chat
- Flechas cambian de foto en el hero

### 4. Focus visible
- Estilos focus-visible en botones y enlaces
- Ring de focus visible (ring-2 ring-brand-400)

### 5. Contraste
- Texto sobre fotos: bg-black/60 pill con backdrop-blur
- Modo claro: text-slate-800 sobre fondo blanco (ratio ≥ 4.5:1)
- Modo oscuro: text-slate-200 sobre fondo slate-950 (ratio ≥ 4.5:1)

### 6. Semántica HTML
- Uso de <main>, <nav>, <header>, <footer>, <section>, <article>
- Headings jerárquicos (h1 → h2 → h3)
- Listas semánticas (<ul>, <ol>, <li>)

### 7. Imágenes
- alt descriptivo en todas las imágenes del hero
- loading="lazy" para imágenes no críticas
- loading="eager" para la primera imagen del hero

### 8. Formularios
- Labels asociados a inputs
- Mensajes de error con role="alert"
- Validación de entrada (maxLength, required)

### 9. Reducción de movimiento
- prefers-reduced-motion respetado (animaciones desactivadas)
- Transiciones con duration controlada

### 10. Idioma
- lang="es" en <html> (default)
- Cambio dinámico de idioma en el widget
