# VIGO AI ADMINISTRATION — Guía de Usuario

**Versión:** v1.2 (demo)  
**Fecha:** 14 de noviembre de 2026  
**CHESS AI AGENCY** · AI · Innovation · Execution

---

## 1. ¿Qué es VIGO AI ADMINISTRATION?

VIGO AI ADMINISTRATION es una plataforma de demostración de inteligencia artificial para servicios públicos municipales. Permite a la ciudadanía consultar información municipal (horarios, trámites, ordenanzas, subvenciones, cultura, historia de Vigo) a través de un asistente conversacional multilingüe.

> ⚠️ **DEMO DE DEMOSTRACIÓN**: usa datos sintéticos, no oficiales del Concello de Vigo. El asistente es una IA, no un empleado municipal.

---

## 2. Cómo usar el asistente

### 2.1 Abrir el asistente
- Haz clic en el **botón flotante** (esquina inferior derecha, icono 🏛️).
- O usa el botón en la sección de demostración de la portada.
- O pulsa el ítem **"Demo"** del menú de navegación de la cabecera.

### 2.2 Hacer una pregunta
1. Escribe tu pregunta en el campo de texto.
2. Pulsa **Enter** o el botón **➤**.
3. El asistente responderá con el agente especializado y las fuentes citadas.

### 2.3 Preguntas sugeridas
Al abrir el asistente, verás preguntas sugeridas. Púlsalas para empezar rápidamente.

### 2.4 Cambiar idioma
Usa el selector de idioma en la cabecera del widget: **Galego (gl)** · **Español (es)** · **English (en)**.

### 2.5 Voz (opcional)
- **🎤 Escuchar**: pulsa el botón de micrófono para dictar tu pregunta.
- **🔊 Hablar**: activa TTS para que el asistente lea las respuestas.

### 2.6 Fuentes citadas
Las respuestas incluyen citas [S1], [S2]... Pulsa en "📚 Fuentes" para ver el detalle de cada documento.

### 2.7 Escalación humana
Si necesitas atención personalizada, pulsa el botón **🙋** (Ayuda humana). Se registrará una escalación para el equipo municipal.

### 2.8 Nuevo chat
Pulsa **🔄** para reiniciar la conversación.

---

## 3. Portada web

La portada muestra 8 fotografías de Vigo (Illas Cíes, Samil, Monte do Castro, Puente de Rande, Puerto, Real Club Náutico, Puesta de sol, Ría de Vigo).

- **Puntos (dots)** abajo-izquierda: pulsa para cambiar de foto.
- **⬇ Descargar**: descarga la foto a tamaño completo.
- **Nombre de la foto**: texto plano (no es enlace).
- **Tema claro/oscuro**: toggle en la cabecera (☀️/🌙).
- **Idioma**: selector en la cabecera (gl/es/en).

---

## 4. Panel interno (`/admin`)

### Acceso
1. Ve a `https://vigo-ai-demo.vercel.app/admin`
2. Introduce el `ADMIN_TOKEN` (o email/contraseña de Supabase Auth).
3. Pulsa "Ver estadísticas".

### Funcionalidades
- **Mensajes totales** y respuestas de agentes.
- **Actividad por agente** (gráfico de barras).
- **Proveedores IA** utilizados.
- **Últimas consultas ciudadanas** (10 más recientes).

### Gestión de conocimiento
- `GET /api/admin/knowledge` — listar documentos.
- `POST /api/admin/knowledge` — crear documento (requiere rol editor).
- `DELETE /api/admin/knowledge?id=DOC-XXX` — eliminar (requiere rol admin).

---

## 5. Accesibilidad

La plataforma cumple con las siguientes mejoras de accesibilidad (WCAG 2.1 AA):
- Enlace "Saltar al contenido" (skip link) al inicio.
- Navegación por teclado (Tab, Enter, Escape).
- Focus visible en todos los elementos interactivos.
- ARIA labels en botones e iconos.
- Reducción de movimiento (`prefers-reduced-motion`).
- Contraste de texto ≥ 4.5:1 (verificado en modo claro y oscuro).
- Imágenes con `alt` descriptivo.

---

## 6. Limitaciones de la demo

- Datos 100% sintéticos; **no** hay conexión con sistemas municipales reales.
- RAG léxico simple (no embeddings); producción: búsqueda híbrida.
- Clasificación por reglas; producción: clasificador semántico.
- Panel admin con token simple; producción: Supabase Auth + RBAC.
- **No apto para producción pública** sin evaluación de seguridad (RGPD, ENS, AI Act).

---

## 7. Contacto

- **CHESS AI AGENCY** — AI · Innovation · Execution
- Web: https://vigo-ai-demo.vercel.app
- Aviso legal: https://vigo-ai-demo.vercel.app/aviso-legal

---

**CHESS AI AGENCY** · AI · Innovation · Execution · Noviembre 2026
