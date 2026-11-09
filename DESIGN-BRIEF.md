# DESIGN-BRIEF — Portfolio Hero 3D Cascade Stack (VANT Studio)

## 01. Proyecto
- **Nombre:** VANT — Interactive Web & Brand Portfolio (Hero 3D Cascade Showcase)
- **Objetivo:** Replicar **únicamente la vista Hero** del vídeo de referencia `E:\WEBS\PORTFOLIO\PORTFOLIO NUEVO.mp4` (`0:00–0:05` y `0:33`), mostrando las 5 webs del estudio en una pila 3D en cascada central. Cada tarjeta renderiza la web real en vivo (con sus animaciones, efectos, scroll e interactividad) y al hacer clic sobre cualquier web de la pila, esta se eleva/expande para verse en grande e interactuar con ella sin salir del portfolio.

## 02. Webs de referencia y Proyectos Incluidos
- **Referencia Visual Principal:** `E:\WEBS\PORTFOLIO\PORTFOLIO NUEVO.mp4` (LE:MA Studio Hero 3D Cascade Stack).
- **Las 10 Webs Integradas en Vivo:**
  1. `pure-trail-cycle-co` — **PURE Ride** (Ecommerce / Mountain Bike & Downhill Components)
  2. `tinta-y-piel-studio` — **Tinta & Piel** (Estudio / Blackwork Tattoo & Art Studio)
  3. `luz-and-lens-studio` — **Inés Valdivia** (Portfolio / Fotografía Documental & Diseño Editorial)
  4. `project-to-home-bridge` — **Fàbrika Barcelona** (Restaurante & Taproom / Cervecería Artesana Poblenou)
  5. `pixel-pop-fashion-shop` — **VYBE** (Ecommerce / Gen-Z Streetwear & Loud Fashion Store)
  6. `kraftwerk-berlin-live-culture` — **KRAFTWERK // BERLIN** (Estudio / Industrial Techno, Live Rave Culture & Clubwear Archive)
  7. `pixel-perfect-replay-02298` — **Kink BCN** (Ecommerce / Hand-Drawn Skate Shop & Zine Culture Barcelona)
  8. `surge-motion-electric` — **VOLTRA X1** (Ecommerce / E-Bike de Montaña Carbono 3D WebGL Experience)
  9. `archive-to-home-52` — **MARGEN®** (Ecommerce / Swiss Grid Apparel & 3D Cloth Specimen Archive)
  10. `codebase-compass-archive-bridge` — **Astropulse Agency** (Estudio / Orbital Social Media & SpaceX Telemetry Agency)

## 03. Tipografías
- **Principal (UI & HUD):** `Geist` / `Inter` (Sans-serif suiza limpia de alto contraste para titulares y controles).
- **Técnica (Coordenadas, Índices, Brackets):** `Geist Mono` / `JetBrains Mono` (`11px`, uppercase, tracking `0.12em`).

## 04. Paleta de colores
- **Canvas Principal (Stage):** `#F6F6F4` (Off-white galería arquitectónica como en `0:00–0:05` del vídeo).
- **Marco Exterior Opcional / Contraste:** `#0A0A0A` (Negro carbón profundo para HUD, corchetes `[ ]` y modo expandido).
- **Texto Secundario / Metadatos:** `#71717A` (Gris técnico neutro).
- **Sombras de Cascada 3D:** `0 24px 60px -15px rgba(0, 0, 0, 0.22), 0 4px 16px rgba(0, 0, 0, 0.08)`.

## 05. Componentes y efectos
1. **HUD Perimetral Minimalista (100vh bloqueado, solo Hero):**
   - **Superior Izquierda:** Marca del estudio (`VANT` / `LE:MA`) + selector rápido de las 5 webs.
   - **Superior Centro:** Coordenadas y reloj en tiempo real (`41.23.14.2N 02.11.49.6E`).
   - **Superior Derecha:** Botón entre corchetes `[ GET IN TOUCH ]`.
   - **Centro Izquierda:** Indicador dinámico de categoría y nombre de la web activa (`Categoria / Nombre`).
   - **Centro Derecha:** Contador de proyectos (`05 projects`) y controles de navegación de la pila (`↑ / ↓`).
   - **Inferior Izquierda:** Lema en dos líneas (`FLOW OF TIME.` / `RATES OF QUALITY.`).
   - **Inferior Derecha:** Botón `[ EXPAND ACTIVE WEB ]` / `[ RESET STACK ]`.
2. **Pila 3D en Cascada Central (5 Webs en Vivo):**
   - Las 5 webs se apilan verticalmente con perspectiva 3D (`translateY`, `scale`, `translateZ`), dejando visible la franja superior/hero de cada web en vivo (`<iframe>` real con sus animaciones corriendo).
   - **Paso 1 (Hover / Clic en una tarjeta de la pila):** La tarjeta seleccionada se despliega verticalmente dentro de la pila (como en el segundo `0:03–0:04` del vídeo) o pasa al frente, mostrando su Hero completo con animaciones en vivo.
   - **Paso 2 (Clic para Expandir / Ver bien la web):** La tarjeta se expande suavemente a un visor interactivo amplio (`92vw × 86vh`) donde el usuario puede hacer scroll completo, probar todos los efectos/animaciones, alternar vista Desktop/Mobile o volver a la pila 3D.

## 06. Capturas y archivos visuales (`referencias/`)
- Vídeo original: `E:\WEBS\PORTFOLIO\PORTFOLIO NUEVO.mp4`

## 07. Requisitos e instrucciones
- **Qué hacer:**
  - Mostrar **únicamente la parte del Hero** donde aparecen las webs apiladas.
  - Compilar las 5 webs reales en `public/previews/<slug>/` para que todas sus animaciones (zoom hero, letras cinéticas, filtros SVG, marquesinas, hover states y scroll) se vean en tiempo real.
  - Permitir expandir cualquier web al clicar en ella para navegarla cómodamente a tamaño completo sin abandonar el portfolio.
- **Qué evitar:**
  - No añadir secciones extra debajo del Hero (ni páginas de servicios ni texto corporativo innecesario).
  - No usar capturas estáticas muertas donde no se vean las animaciones reales de cada web.
