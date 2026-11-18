# CAMPAÑA PROVINCIA DE PONTEVEDRA — ESTRATEGIA

**Producto:** VIGO AI ADMINISTRATION como modelo escalable
**Mercado:** 61 concellos de la provincia de Pontevedra
**Objetivo:** 3 pilotos firmados en 90 días (≈ 30.000 €) y una cartera de 10 municipios para 2027

> Documento derivado de `CAMPANA_PONTEVEDRA.md` (ahora índice). Estrategia, segmentación y mensaje.

## 1. La tesis

No vendes un chatbot. Vendes **un núcleo de IA municipal que se configura por concello en 48 horas**: corpus documental propio, escudo y colores, gallego y castellano, agentes activables y despliegue en la nube o en servidor municipal.

Eso convierte 61 concellos en 61 configuraciones del mismo producto, no en 61 desarrollos. El coste marginal de cada nuevo cliente es bajo y el argumento comercial es idéntico: menos tiempo en tareas repetitivas, respuestas con fuente y datos bajo control municipal.

Vigo es la prueba, no el mercado. El mercado son los 60 concellos restantes.

---


## 2. Segmentación

| Segmento | Concellos | Población | Oferta | Precio |
|---|---|---|---|---|
| A — Grandes | 10 | más de 20.000 | Piloto completo 6 semanas | 12.500 € |
| B — Medianos | 15 | 10.000–20.000 | Piloto 4 semanas | 7.900 € |
| C — Pequeños | 13 | 5.000–10.000 | Piloto 3 semanas | 4.900 € |
| D — Rurales | 23 | menos de 5.000 | Micro-piloto compartido | 2.900 € |

**Prioridad comercial:** A y B concentran el 70 % de la población y el 80 % del presupuesto. Empieza por ahí.

**Segmento A (10):** Vigo, Pontevedra, Vilagarcía de Arousa, Redondela, Cangas, Marín, Ponteareas, O Porriño, Lalín, A Estrada.

**Segmento B (15):** Moaña, Nigrán, Sanxenxo, Tui, Poio, Mos, Gondomar, Tomiño, Cambados, Baiona, Bueu, O Grove, Vilanova de Arousa, Salvaterra de Miño, A Guarda.

**Segmento C (13):** Caldas de Reis, Salceda de Caselas, Silleda, Soutomaior, O Rosal, Vilaboa, Valga, Cerdedo-Cotobade, Ponte Caldelas, Meaño, Ribadumia, Vila de Cruces, A Cañiza.

**Segmento D (23):** A Illa de Arousa, Meis, Cuntis, Mondariz, Moraña, As Neves, Barro, Catoira, Forcarei, Oia, Pontecesures, Pazos de Borbén, Portas, Arbo, A Lama, Covelo, Rodeiro, Agolada, Crecente, Campo Lameiro, Fornelos de Montes, Dozón, Mondariz-Balneario.

*Población INE 2022. Verifica cifras actuales antes de personalizar una propuesta.*

---


## 3. Escalera de oferta

| Escalón | Qué es | Precio | Objetivo |
|---|---|---|---|
| 0 | Diagnóstico gratuito de 30 minutos + demo | 0 € | Conseguir la reunión |
| 1 | Micro-piloto de un caso de uso | 2.900 € | Primera factura, primera referencia |
| 2 | Piloto estándar | 4.900–12.500 € | Validar con datos reales |
| 3 | Implantación anual | 9.000–24.000 €/año | Ingreso recurrente |
| 4 | Mancomunidad o diputación | 1.900 €/concello/año | Escala sin coste comercial |

Regla: **nunca vendas la implantación anual en el primer contacto.** Vende el piloto. El piloto es la puerta.

---


## 4. Mensaje

**En gallego (concellos del ámbito lingüístico gallego):**

> O Concello xa ten os datos e ten o persoal. Falta que a información estea a unha pregunta de distancia. Implantamos un asistente que responde con fontes citadas, redacta borradores e transcribe reunións, en galego e castelán, cos datos baixo control municipal. En seis semanas e por 12.500 €.

**En castellano:**

> El Concello ya tiene los datos y tiene al personal. Falta que la información esté a una pregunta de distancia. Implantamos un asistente que responde con fuentes citadas, redacta borradores y transcribe reuniones, en gallego y castellano, con los datos bajo control municipal. En seis semanas y por 12.500 €.

**Tres pruebas que siempre van en el correo:**

1. Demo funcionando: https://vigo-ai-demo.vercel.app
2. Cifras: 27 pruebas automatizadas, 100 % de acierto en el conjunto de evaluación RAG.
3. Cumplimiento: RGPD, ENS y AI Act documentados.

---


## 5. Activos que necesitas

- [x] **Landing `/ayuntamientos`** publicada: https://vigo-ai-demo.vercel.app/ayuntamientos
      Incluye escalera de precios, FAQ, formulario bilingüe gl/es y captación de leads en Supabase.
- [ ] **Hoja de una página** del piloto (ya generada: `PILOTO_12500_VIGO.pdf`)
- [ ] **Vídeo de 30 segundos** con la demo real
- [ ] **Dosier corto** de 4 páginas, no de 40
- [ ] **Calculadora de ahorro**: consultas al mes × minutos × coste hora
- [ ] **Hoja de cálculo CRM**: concello, alcaldía, secretaría, intervención, estado, fecha, siguiente paso
      → ya generada: `CONTACTOS_PONTEVEDRA.csv` (25 concellos A y B, separador `;`, UTF-8)
- [ ] **Firma de correo** con demo, teléfono y calendario de reuniones

Sin landing no hay campaña: el correo necesita un destino donde ampliar información.

---


## 6. Secuencia de seis semanas

| Semana | Acción | Volumen |
|---|---|---|
| 0 | Landing, PDF, vídeo, CRM y lista de contactos verificados | 61 fichas |
| 1 | Correo + llamada al Segmento A | 10 |
| 2 | Correo + llamada al Segmento B | 15 |
| 3 | Correo al Segmento C + seguimiento de A y B | 13 + 25 |
| 4 | LinkedIn + Diputación de Pontevedra + FEGAMP | 1 + 1 |
| 5 | Demos (30 minutos, con guion) | 6–8 |
| 6 | Propuestas y cierre de pilotos | 3 |

**Regla de oro:** máximo 10 correos al día desde el mismo buzón. Más volumen activa filtros antispam y quema el dominio.

---

