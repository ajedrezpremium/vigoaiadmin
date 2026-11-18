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

## 11. Auditoría estructurada (WCAG 2.1 AA)

### 11.1 Metodología

- **Herramienta:** axe-core (automatizado) + revisión manual (teclado, lector de pantalla).
- **Páginas auditadas:** `/` (portada), `/ayuntamientos`, `/campana`, `/admin`, widget flotante.
- **Criterios:** WCAG 2.1 niveles A y AA (UNE-EN 301 549).
- **Estado:** pendiente de ejecución con axe-core en CI.

### 11.2 Checklist de auditoría (pendiente de ejecución)

| # | Criterio WCAG | Descripción | Estado |
|---|---|---|---|
| 1.1.1 | Contenido no textual | alt en todas las imágenes | ✅ Aplicado |
| 1.3.1 | Información y relaciones | Semántica HTML (main, nav, header, footer, section, article) | ✅ Aplicado |
| 1.4.1 | Uso del color | El color no es el único medio de información | 🟡 Revisar gráficos de métricas |
| 1.4.3 | Contraste (mínimo) | Ratio ≥ 4.5:1 para texto normal | ✅ Aplicado (verificado visualmente) |
| 1.4.4 | Redimensionar texto | Texto legible hasta 200% | ⏳ Por verificar |
| 1.4.10 | Reflow | Sin scroll horizontal a 320px | ⏳ Por verificar |
| 1.4.11 | Contraste no textual | Componentes de UI ≥ 3:1 | ⏳ Por verificar |
| 2.1.1 | Teclado | Todas las funciones accesibles por teclado | ✅ Aplicado |
| 2.1.2 | Sin trampa de teclado | El foco no queda atrapado | ✅ Aplicado (Escape cierra widget) |
| 2.4.1 | Saltar bloques | Skip-to-content link | ✅ Aplicado |
| 2.4.2 | Título de página | title descriptivo en cada página | ✅ Aplicado |
| 2.4.3 | Orden del foco | Tab order lógico | ✅ Aplicado |
| 2.4.6 | Encabezados y etiquetas | Headings jerárquicos (h1 → h2 → h3) | ✅ Aplicado |
| 2.4.7 | Foco visible | Ring de focus visible | ✅ Aplicado |
| 3.1.1 | Idioma de la página | lang en html | ✅ Aplicado (dinámico en widget) |
| 3.2.1 | Al recibir foco | Sin cambios de contexto inesperados | ✅ Aplicado |
| 3.3.1 | Identificación de errores | Mensajes de error con role="alert" | ✅ Aplicado |
| 3.3.2 | Etiquetas o instrucciones | Labels asociados a inputs | ✅ Aplicado |
| 4.1.1 | Análisis sintáctico | HTML válido | ⏳ Por verificar (validador W3C) |
| 4.1.2 | Nombre, función, valor | ARIA en componentes interactivos | ✅ Aplicado |
| 4.1.3 | Mensajes de estado | role="status" / "alert" en notificaciones | 🟡 Revisar (algunos mensajes no tienen role) |

### 11.3 Problemas conocidos (a corregir)

1. **Modo oscuro/claro:** el toggle de tema no persiste entre recargas (no usa localStorage). Mejora de UX, no bloqueante para WCAG.
2. **Gráficos de métricas en /campana:** los valores (−60 %, etc.) usan color como único medio. Añadir icono o texto alternativo.
3. **Formulario de leads:** el campo tramo (tamaño del concello) no tiene aria-describedby para la ayuda contextual.
4. **Widget flotante:** el foco no se atrapa dentro del dialog cuando está abierto (mejora de usabilidad, no bloqueante).
5. **Imágenes del hero:** el alt se actualiza dinámicamente pero el aria-live no anuncia el cambio de foto.

### 11.4 Plan de corrección (priorizado)

| Prioridad | Acción | Esfuerzo |
|---|---|---|
| Alta | Añadir role="status" a los mensajes de éxito/error del formulario | 1 h |
| Alta | Añadir texto alternativo a las métricas (icono + valor) | 2 h |
| Media | Persistir tema en localStorage | 1 h |
| Media | Añadir aria-live="polite" al contenedor del hero | 30 min |
| Baja | Trampa de foco en el widget (focus trap) | 2 h |
| Baja | Validar HTML con W3C validator | 1 h |

### 11.5 Herramientas recomendadas

- **axe-core** (npm): npm install -D @axe-core/playwright + test E2E.
- **Lighthouse** (Chrome DevTools): auditoría de accesibilidad integrada.
- **WAVE** (extensión): evaluación visual rápida.
- **NVDA / VoiceOver**: prueba con lector de pantalla real.

---

## 12. Objetivo v2.0

- Ejecutar axe-core en las 5 páginas auditadas.
- Corregir los 5 problemas conocidos.
- Alcanzar WCAG 2.1 AA en todas las páginas públicas.
- Documentar los resultados en este archivo (sección 11.6).

---

**CHESS AI AGENCY** · AI · Innovation · Execution
