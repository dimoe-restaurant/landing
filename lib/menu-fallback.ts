import type { MenuTab, MenuGroup } from './menu'

export const FALLBACK_MENU: Record<MenuTab, MenuGroup[]> = {

  // ── ENTRADAS ──────────────────────────────────────────────────────────────
  // Orden: badge item primero → diferenciadores → clásicos
  ENTRADAS: [{
    items: [
      { name: 'Jardín de Oliva', desc: 'Aceitunas rellenas artesanalmente con ricota sobre aceite de oliva premium, tomates deshidratados y queso feta.', price: 9900, badge: 'Furor en carta' },
      { name: 'Bruschettas Straciatella Prosciutto', desc: 'Cuatro mini bruschettas gourmet tostadas, stracciatella artesanal, rúcula cremosa, prosciutto italiano y tomates deshidratados.', price: 13500 },
      { name: 'Camarones al Pilpil / Ajillo', desc: 'En greda, al horno, estos camarones llegarán burbujeando en mantequilla a tu mesa, acompañados de pan duro.', price: 9500 },
      { name: 'Carpaccio Prosciutto', desc: 'Base de rúcula, prosciutto madurado, alcaparras calabresas, hojas de parmesano, queso feta y limoncina.', price: 10500 },
      { name: 'Papas al Forno', desc: 'Papas rústicas horneadas en fuego alto, con ciboulette, parmesano y una exquisita salsa Ranch para untar.', price: 8900, note: 'Opción: pollo, carne mechada, tocino o champiñones +$1.000' },
      { name: 'Palitos di Agglio', desc: 'Palitos de masa al horno bañados en ajo, decorados con parmesano y orégano. Acompañados de nuestra famosa salsa de ajo cilantro.', price: 6900 },
      { name: 'Insalata César', desc: 'Lechuga romana, croutones, pollo, anchoas, parmesano y aderezo César con mostaza de Dijon.', price: 8900 },
      { name: 'Insalata Caprese', desc: 'Ensalada clásica a base de albahaca, tomate laminado, queso fresco Fior di latte y pesto de la casa.', price: 8500 },
    ],
  }],

  // ── PIZZAS ────────────────────────────────────────────────────────────────
  PIZZAS: [
    {
      name: 'Italianas y Especialidades',
      items: [
        { name: 'Mortadella e Pistacchio', desc: 'Si una es reina, esta es la Diosa. Pomidoro, fior di latte, ricotta, mortadella de pistache, albahaca, parmesano y pistachos triturados.', price: 13600 },
        { name: 'Queen Margherita', desc: 'La reina y lo sabemos. Margherita clásica elevada con Stracciatella, emulsión de aceite de albahaca, fior di latte desmoronado y parmesano fino.', price: 11500 },
        { name: 'Prosciutto', desc: 'Mucho más premium que el Serrano. Pomidoro, fior di latte, rúcula y hojas de prosciutto italiano madurado.', price: 13000 },
        { name: 'Veracruz', desc: 'Para los que buscan un poquito de fuego. Pomidoro, fior di latte, pepperoncino fresco, tomate deshidratado, salame picante, aceitunas y albahaca.', price: 12800 },
      ],
    },
    {
      name: 'Biancas',
      items: [
        { name: 'Catalina', desc: 'Caudal desde el primer bocado. Base crema y mozzarella, salmón premium marinado, cebolla morada en juliana y alcaparras. Terminada con parmesano y zeste de limón.', price: 14900 },
        { name: 'Pecatto di Trufa', desc: 'Base crema y mozzarella, cebolla caramelizada y champiñones perla negra salteados en pasta y aceite de trufa.', price: 13500 },
        { name: 'El Nonno', desc: 'Base crema y mozzarella, pimentón asado y tocino ahumado, cubierta de queso parmesano.', price: 11500 },
      ],
    },
    {
      name: 'Clásicas',
      items: [
        { name: 'Tres Carnes', desc: 'Base pomidoro, mozzarella, jamón pierna acaramelado, tocino ahumado, pepperoni americano y aceitunas.', price: 13500 },
        { name: 'Pollo BBQ', desc: 'Base pomidoro, mozzarella, cebolla caramelizada, pollo a la mantequilla y salsa BBQ artesanal.', price: 12500 },
      ],
    },
  ],

  // ── FONDOS ────────────────────────────────────────────────────────────────
  FONDOS: [
    {
      name: 'Especialidades de la Casa',
      items: [
        { name: 'Risotto con Lomo Vetado', desc: 'Aclamado en 2 versiones: pesto di albahaca o chanterelles. Especialidad insigne del local con lomo vetado en salsa demi-glace de 12 horas de reducción.', price: 18500 },
        { name: 'Fuoco di Calabria', desc: 'Lasagna de stracciatella y salsa nduja. Crema de salame calabrese de textura suave, sabor intenso y picante de guindilla roja italiana.', price: 12500 },
        { name: 'Auténtica Lasagna', desc: 'Preparada al momento con bolognesa, béchamel, pasta 100% artesanal y parmesano. Cocida en horno napolitano, con mini insalata caprese y tostadas de ajo.', price: 13500 },
      ],
    },
    {
      name: 'Pappardelle',
      items: [
        { name: 'Pappardelle al Camarón', desc: 'Camarones ecuatorianos en crema soubise reducida al vino blanco con toque de ciboulette.', price: 12500 },
        { name: 'Pappardelle Bolognesa', desc: 'Un plato mundial. Pappardelle con auténtica bolognesa reducida al vino tinto por 3 horas.', price: 11500 },
        { name: 'Pappardelle al Pesto', desc: 'Con salsa béchamel de pesto y parmesano. Fior di latte en frío en su cubierta.', price: 10500 },
      ],
    },
    {
      name: 'Para Niños',
      items: [
        { name: 'Spaghetti Kids', desc: 'Clásicos spaghetti en porción reducida con salsa de tomate o alfredo.', price: 7500 },
        { name: 'Papitas Kid con Pollo', desc: 'Porción de papas doradas al horno con trocitos de pollo.', price: 3000, note: 'No trabajamos con ketchup ni mayo :)' },
      ],
    },
  ],

  // ── POSTRES ───────────────────────────────────────────────────────────────
  POSTRES: [
    {
      items: [
        { name: 'Tiramisú Pistacchio', desc: 'La pura perfección. Este Tiramisú de pistacho le saca tres vueltas al consentido de la casa.', price: 7800 },
        { name: 'Tiramisú', desc: 'El favorito, el consentido y el rey. Al puro estilo italiano con Mascarpone romano, galleta italiana y café de grano.', price: 5800 },
        { name: 'Panna Cotta', desc: 'Dulce postre de la casa en salsa a elección, acompañado de una tierra de chocolate.', price: 3800 },
      ],
    },
    {
      name: 'Para Compartir',
      items: [
        { name: 'Pizza Dolce Tentazione', desc: 'Pizza dulce a base de crema de pistache con nutella italiana, frutillas y cantucci.', price: 15900, note: '~6 personas' },
        { name: 'Bastions', desc: 'Bastones de masa espolvoreados en azúcar glass con nutella italiana y salsas de fruta.', price: 6900, note: '~4 personas' },
      ],
    },
    {
      name: 'Cafetería',
      items: [
        { name: 'Tiramisú o Kuchen', price: 4500 },
        { name: 'Torta del día', price: 4500 },
        { name: 'Americano', price: 3200 },
        { name: 'Espresso', price: 2900 },
        { name: 'Té', price: 2000 },
      ],
    },
  ],

  // ── BAR ───────────────────────────────────────────────────────────────────
  // Happy Hour con tiempo visible → Spritz → Sours → Coctelería Clásica
  BAR: [
    {
      name: 'Happy Hour',
      subtitle: 'Todos los días · 12:30 – 19:30',
      items: [
        { name: '2x Pisco o Ron', desc: '+1 bebida 350cc', price: 7900 },
        { name: 'Pisco Sour Catedral', price: 6500 },
        { name: 'Gin Frutal', desc: 'Tropical o Berries', price: 5700 },
        { name: 'Spritz', desc: 'Aperol · Ramazzotti · Hugo · Cherry', price: 4900 },
        { name: 'Mojito Sabores', price: 4900 },
        { name: 'Gin Tonic', price: 4900 },
        { name: 'Mojito', price: 3900 },
        { name: 'Pisco Sour', price: 3900 },
      ],
    },
    {
      name: 'Spritz',
      subtitle: '$6.500 c/u',
      items: [
        { name: 'Aperol Spritz', price: 6500 },
        { name: 'Hugo Spritz', desc: 'Flor de Sauco', price: 6500 },
        { name: 'Limoncello Spritz', desc: 'Fior de Manzana', price: 6500 },
        { name: 'Cherry Spritz', price: 6500 },
        { name: 'Ramazzotti Spritz', price: 6500 },
      ],
    },
    {
      name: 'Sours',
      subtitle: '$4.900 c/u',
      items: [
        { name: 'Copao Sour', desc: 'Natural del Norte', price: 4900 },
        { name: 'Calafate Sour', desc: 'Natural del Sur', price: 4900 },
        { name: 'Sandía Sour', desc: 'Natural de Paine', price: 4900 },
        { name: 'Chardonnay Sour', price: 4900 },
        { name: 'Mango Sour', price: 4900 },
        { name: 'Pisco Sour Tradicional', price: 4900 },
      ],
    },
    {
      name: 'Coctelería Clásica',
      items: [
        { name: 'El Padrino', desc: 'Bourbon, amaretto, cítrico', price: 7500 },
        { name: 'Amaretto Martini', desc: 'Amaretto, vermut, cereza', price: 6000 },
        { name: 'Mojito Sabores', price: 6500 },
        { name: 'Caipirinha', desc: 'Cachaça, lima, azúcar', price: 5500 },
        { name: 'Amaretto Sour', price: 5000 },
        { name: 'Margarita', desc: 'Tequila, triple sec, lima', price: 5000 },
        { name: 'Gin Tonic', price: 4500 },
        { name: 'Mojito', price: 3500 },
      ],
    },
  ],
}
