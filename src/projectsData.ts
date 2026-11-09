export type ProjectCategory =
  | 'ALL'
  | 'ECOMMERCE'
  | 'ESTUDIO'
  | 'PORTFOLIO'
  | 'RESTAURANTES';

export interface PortfolioProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'ALL'>;
  categoryLabel: string;
  client: string;
  location: string;
  role: string;
  year: string;
  folderName: string;
  previewUrl: string;
  posterUrl: string;
  repoUrl: string;
  accentColor: string;
  browserBg: string;
  description: string;
  interactiveFeatures: string[];
}

export const PORTFOLIO_CATEGORIES: ProjectCategory[] = [
  'ALL',
  'ECOMMERCE',
  'ESTUDIO',
  'PORTFOLIO',
  'RESTAURANTES',
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'pure-trail-cycle-co',
    num: '01',
    title: 'PURE Ride',
    subtitle: 'Componentes & Protecciones Mountain Bike DH',
    category: 'ECOMMERCE',
    categoryLabel: 'E-Commerce',
    client: 'PURE Trail Cycle Co.',
    location: 'Pyrenees / Andorra',
    role: 'Product Showcase & Timeline UX',
    year: '2026',
    folderName: 'pure-trail-cycle-co',
    previewUrl: '/previews/pure-trail-cycle-co/index.html',
    posterUrl: '/previews/pure-trail-cycle-co/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/pure-trail-cycle-co.git',
    accentColor: '#141414',
    browserBg: '#141414',
    description:
      'Tienda especializada en cascos integrales DH, protecciones de enduro y componentes de carbono para mountain bike con cronología de ingeniería.',
    interactiveFeatures: [
      'Hero de alto contraste con tipografía Archivo',
      'Catálogo interactivo de cascos y componentes DH',
      'Matriz de proceso de ingeniería y galería técnica',
    ],
  },
  {
    id: 'tinta-y-piel-studio',
    num: '02',
    title: 'Tinta & Piel',
    subtitle: 'Estudio de Tatuaje Blackwork & Caligrafía Gótica',
    category: 'ESTUDIO',
    categoryLabel: 'Art Studio',
    client: 'Tinta & Piel Studio',
    location: 'Madrid, España',
    role: 'Gothic Calligraphic Identity & Web',
    year: '2026',
    folderName: 'tinta-y-piel-studio',
    previewUrl: '/previews/tinta-y-piel-studio/index.html',
    posterUrl: '/previews/tinta-y-piel-studio/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/tinta-y-piel-studio.git',
    accentColor: '#0A0A0A',
    browserBg: '#0A0A0A',
    description:
      'Estudio de tatuaje de autor con dirección de arte gótica caligráfica inspirada en Behance, filtros SVG de sangrado de tinta y galería de piezas únicas.',
    interactiveFeatures: [
      'Caligrafía gótica con filtro SVG ink-bleed en vivo',
      'Emblema sigil caligráfico y fotografías de alto contraste',
      'Exploración de estilos, proceso y reserva de sesión',
    ],
  },
  {
    id: 'luz-and-lens-studio',
    num: '03',
    title: 'Inés Valdivia',
    subtitle: 'Fotografía Documental, Dirección de Arte & Editorial',
    category: 'PORTFOLIO',
    categoryLabel: 'Editorial',
    client: 'Luz & Lens Studio',
    location: 'Valparaíso, Chile',
    role: 'Kinetic Blur Type & Editorial Archive',
    year: '2026',
    folderName: 'luz-and-lens-studio',
    previewUrl: '/previews/luz-and-lens-studio/index.html',
    posterUrl: '/previews/luz-and-lens-studio/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/luz-and-lens-studio.git',
    accentColor: '#F5F2EB',
    browserBg: '#F5F2EB',
    description:
      'Archivo fotográfico y editorial desde los cerros de Valparaíso con tipografía cinética desenfocada progresiva, marquesina continua e índice interactivo.',
    interactiveFeatures: [
      'Tipografía con desenfoque óptico progresivo (Blur)',
      'Marquesina continua e índice de capítulos interactivo',
      'Trípticos documentales y carteles experimentales',
    ],
  },
  {
    id: 'project-to-home-bridge',
    num: '04',
    title: 'Fàbrika Barcelona',
    subtitle: 'Cerveseria Artesana & Taproom Social · Poblenou',
    category: 'RESTAURANTES',
    categoryLabel: 'Brewery',
    client: 'Fàbrika Craft Brewery',
    location: 'El Poblenou, Barcelona',
    role: 'Brutalist Brewery Identity & Taproom',
    year: '2026',
    folderName: 'project-to-home-bridge',
    previewUrl: '/previews/project-to-home-bridge/index.html',
    posterUrl: '/previews/project-to-home-bridge/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/project-to-home-bridge.git',
    accentColor: '#FF6233',
    browserBg: '#0B252F',
    description:
      'Cervecería artesana y taproom social en El Poblenou con tipografía Mango Grotesk, menú desplegable a pantalla completa, pizarra de 14 grifos e historia desde 2012.',
    interactiveFeatures: [
      'Menú overlay burdeos interactivo a pantalla completa',
      'Cronología cervecera y pizarra de grifos del Poblenou',
      'Formulario de eventos y reservas en vivo',
    ],
  },
  {
    id: 'pixel-pop-fashion-shop',
    num: '05',
    title: 'VYBE Store',
    subtitle: 'Loud Style Unisex Streetwear & Gen-Z Fashion',
    category: 'ECOMMERCE',
    categoryLabel: 'Fashion',
    client: 'VYBE Fashion Lab',
    location: 'London / Tokyo',
    role: 'Interactive Lookbook, Multi-Route Shop & Cart',
    year: '2026',
    folderName: 'pixel-pop-fashion-shop',
    previewUrl: '/previews/pixel-pop-fashion-shop/index.html',
    posterUrl: '/previews/pixel-pop-fashion-shop/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/pixel-pop-fashion-shop.git',
    accentColor: '#111111',
    browserBg: '#111111',
    description:
      'E-commerce de moda urbana con titular cinético parallax, lookbook con hotspots interactivos, filtro de categorías, páginas de producto y carrito deslizable.',
    interactiveFeatures: [
      'Hero con zoom animado y letras cinéticas en parallax',
      'Lookbook interactivo con hotspots de compra en vivo',
      'Navegación completa (Shop, About, Contact) y carrito',
    ],
  },
  {
    id: 'kraftwerk-berlin-live-culture',
    num: '06',
    title: 'KRAFTWERK Berlin',
    subtitle: 'Industrial Techno, Live Rave Streams & Clubwear Archive',
    category: 'ESTUDIO',
    categoryLabel: 'Live Culture',
    client: 'Kraftwerk Berlin Archive',
    location: 'Köpenicker Str. 70, Berlin',
    role: 'Multi-Cam Live Feeds, Synth Audio & Store',
    year: '2026',
    folderName: 'kraftwerk-berlin-live-culture',
    previewUrl: '/previews/kraftwerk-berlin-live-culture/index.html',
    posterUrl: '/previews/kraftwerk-berlin-live-culture/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/kraftwerk-berlin-live-culture.git',
    accentColor: '#ECFD81',
    browserBg: '#000000',
    description:
      'Institución underground de techno industrial y archivo cultural en Berlín con 4 cámaras en vivo (Berghain, Tresor, Kreuzberg), sintetizador de audio en vinilo, revista editorial y tienda clubwear.',
    interactiveFeatures: [
      '4 cámaras de vídeo en directo con selector PiP interactivo',
      'Reproductor de frecuencias sub-bass y tracklist en vinilo',
      'Archivo editorial berlinés y tienda de hardware/clubwear',
    ],
  },
  {
    id: 'pixel-perfect-replay-02298',
    num: '07',
    title: 'Kink BCN',
    subtitle: 'Hand-Drawn Skate Shop & Zine Culture · Barcelona',
    category: 'ECOMMERCE',
    categoryLabel: 'Skate Shop',
    client: 'Kink Skateboards BCN',
    location: 'MACBA / El Raval, Barcelona',
    role: 'Zine Illustration Identity, 7-Ply Decks & Video Hero',
    year: '2026',
    folderName: 'pixel-perfect-replay-02298',
    previewUrl: '/previews/pixel-perfect-replay-02298/index.html',
    posterUrl: '/previews/pixel-perfect-replay-02298/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/pixel-perfect-replay-02298.git',
    accentColor: '#B5F23D',
    browserBg: '#F5EFE0',
    description:
      'Skate shop de estética fanzine ilustrada a mano desde Barcelona (MACBA, Paral·lel y Forum) con vídeo hero de skate, tablas de arce canadiense de 7 láminas con vista flip de lija y carrito.',
    interactiveFeatures: [
      'Hero con vídeo de skate en bucle e ilustraciones gouache',
      'Tablas 7-ply con giro interactivo 그래픽 / lija (Flip-Grip)',
      'Guía de spots de Barcelona (MACBA, Paral·lel, Forum) y tienda',
    ],
  },
  {
    id: 'surge-motion-electric',
    num: '08',
    title: 'VOLTRA X1',
    subtitle: 'E-Bike de Montaña en Carbono · Experiencia 3D WebGL',
    category: 'ECOMMERCE',
    categoryLabel: '3D Mobility',
    client: 'VOLTRA Motors',
    location: 'Barcelona / Pirineos',
    role: 'Interactive 3D WebGL Bike & Theatre.js Camera Scroll',
    year: '2026',
    folderName: 'surge-motion-electric',
    previewUrl: '/previews/surge-motion-electric/index.html',
    posterUrl: '/previews/surge-motion-electric/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/surge-motion-electric.git',
    accentColor: '#22C55E',
    browserBg: '#06040A',
    description:
      'Experiencia 3D WebGL en tiempo real para la e-bike de montaña VOLTRA X1 con cuadro monocasco de carbono de 21 kg, motor central de 85 Nm, 120 km de autonomía y reserva prioritaria.',
    interactiveFeatures: [
      'Escena 3D WebGL interactiva con cámara cinemática al hacer scroll',
      'Telemetría de motor (85 Nm), suspensión (160 mm) y vídeo en acción',
      'Modal interactivo de ficha técnica, tallas y reserva (4.490 €)',
    ],
  },
  {
    id: 'archive-to-home-52',
    num: '09',
    title: 'MARGEN®',
    subtitle: 'Swiss Grid Apparel & 3D Cloth Concept Store',
    category: 'ECOMMERCE',
    categoryLabel: '3D Apparel',
    client: 'MARGEN® Studio',
    location: 'Zürich / Madrid',
    role: '16-Col Swiss Grid, Three.js Cloth Physics & Theme Engine',
    year: '2026',
    folderName: 'archive-to-home-52',
    previewUrl: '/previews/archive-to-home-52/index.html',
    posterUrl: '/previews/archive-to-home-52/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/archive-to-home-52.git',
    accentColor: '#FF0001',
    browserBg: '#FFFFFF',
    description:
      'Concept store editorial construida sobre una retícula suiza de 16 columnas con simulación física de tejido en 3D (Three.js), selector de tema cromático, transiciones de cortina y cursor magnético.',
    interactiveFeatures: [
      'Simulación interactiva de tela en 3D (Three.js) en cada prenda',
      'Retícula suiza de 16 columnas con revelado flash en hover',
      'Preloader numérico, selector de temas y bolsa de compra completa',
    ],
  },
  {
    id: 'codebase-compass-archive-bridge',
    num: '10',
    title: 'Astropulse',
    subtitle: 'Orbital Social Media Buying & SpaceX-Grade Telemetry',
    category: 'ESTUDIO',
    categoryLabel: 'Growth Agency',
    client: 'Astropulse Agency',
    location: 'Cape Canaveral / Madrid / NYC',
    role: 'Asymmetric 4-Col Swiss Grid & Orbital Brand System',
    year: '2026',
    folderName: 'codebase-compass-archive-bridge',
    previewUrl: '/previews/codebase-compass-archive-bridge/index.html',
    posterUrl: '/previews/codebase-compass-archive-bridge/poster.jpg',
    repoUrl: 'https://github.com/vantdesigntech/codebase-compass-archive-bridge.git',
    accentColor: '#2F2FE4',
    browserBg: '#ECECEE',
    description:
      'Agencia global de crecimiento social y compra de medios algorítmica que fusiona precisión tipográfica suiza con telemetría estilo SpaceX para escalar marcas en TikTok, Meta y YouTube.',
    interactiveFeatures: [
      'Retícula suiza asimétrica de 4 columnas con guías técnicas',
      'Dirección de arte orbital en azul eléctrico y casos de estudio ROAS',
      'Skyline de equipo, bento de métricas globales y uplink de contacto',
    ],
  },
];
