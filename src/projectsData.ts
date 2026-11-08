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
];
