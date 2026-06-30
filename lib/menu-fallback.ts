import type { MenuTab, MenuGroup } from './menu'

export const FALLBACK_MENU: Record<MenuTab, MenuGroup[]> = {

  // ── ENTRADAS ──────────────────────────────────────────────────────────────
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
  BAR: [
    // 1. Happy Hour — precio HH, precio normal como nota
    {
      name: 'Happy Hour',
      subtitle: 'Miércoles a Viernes · 17:00 – 20:00',
      items: [
        { name: '2x Pisco o Ron', desc: '+ 1 bebida 350cc', price: 7900 },
        { name: 'Pisco Sour Catedral 380', price: 6500, note: 'Normal $8.000' },
        { name: 'Gin Frutal', desc: 'Tropical o Berries', price: 5700, note: 'Normal $7.500' },
        { name: 'Mojito Sabores', price: 4900, note: 'Normal $6.500' },
        { name: 'Gin Tonic', price: 4900, note: 'Normal $6.500' },
        { name: 'Spritz', desc: 'Ramazzotti · Aperol · Hugo · Cherry', price: 4900, note: 'Normal $6.500' },
        { name: 'Pisco Sour Sabores', price: 3900, note: 'Normal $4.900' },
        { name: 'Mojito', price: 3900, note: 'Normal $5.500' },
        { name: 'Schop 500cc', desc: 'Variedades', price: 3700, note: 'Normal $4.500' },
      ],
    },
    // 2. Gin Frutal — protagonista visual
    {
      name: 'Gin Frutal',
      subtitle: '$7.500 c/u',
      items: [
        { name: 'Berries', price: 7500 },
        { name: 'Tropical', price: 7500 },
      ],
    },
    // 3. Coctelería de la Casa — firmas del bar
    {
      name: 'Coctelería de la Casa',
      items: [
        { name: 'Bossa Nova', desc: 'Gin Tanqueray BOSSA NOVA (guayaba brasileña y lemongrass), licor flor de sauco, syrup artesanal de frutas, limón y soda', price: 7500 },
        { name: 'Bella Italia', desc: 'Jaggermeister, pisco manzana, pulpa frambuesa, limón', price: 7500 },
        { name: 'Disaronno Fizz', price: 6900 },
        { name: 'Aranciata', desc: 'Gin Bombay, aperitivo naranja, limón, soda', price: 6800 },
        { name: 'Dolce Rosso', desc: 'Tequila, licor de guinda, limón, maracuyá', price: 6800 },
        { name: 'Copón Sangría DiMOE', desc: 'Carmenere, jugo naranja natural, pulpa de frambuesa, destilado de manzana, mix frutas rojas', price: 5500 },
        { name: 'Jarrón Sangría', desc: '4 copas', price: 12500 },
      ],
    },
    // 4. Spritz
    {
      name: 'Spritz',
      subtitle: '$6.500 c/u',
      items: [
        { name: 'Aperol Spritz', desc: 'Naranja', price: 6500 },
        { name: 'Ramazzotti Spritz', desc: 'Flor de Jamaica', price: 6500 },
        { name: 'Cherry Spritz', desc: 'Guinda', price: 6500 },
        { name: 'Hugo Spritz', desc: 'Flor de Sauco', price: 6500 },
        { name: 'Limoncello Spritz', desc: 'Licor de limón italiano', price: 6500 },
      ],
    },
    // 5. Sours
    {
      name: 'Sours',
      subtitle: '$4.900 c/u · Catedral $8.000',
      items: [
        { name: 'Pisco Sour Catedral', price: 8000 },
        { name: 'Mango Sour', desc: 'Elaboración DiMOE', price: 4900 },
        { name: 'Copao Sour', desc: 'Cítrico · Fruta del Norte', price: 4900 },
        { name: 'Calafate Sour', desc: 'Dulce · Fruta Natural del Sur', price: 4900 },
        { name: 'Sandía Sour', desc: 'Dulce · Fruta Natural de Paine', price: 4900 },
        { name: 'Chardonnay Sour', desc: 'Viña Terramater', price: 4900 },
        { name: 'Tradicional', desc: 'Elaboración DiMOE', price: 4900 },
      ],
    },
    // 6. Coctelería Clásica — lista completa del PDF
    {
      name: 'Coctelería Clásica',
      items: [
        { name: 'El Padrino', desc: 'Bourbon, amaretto, cítrico', price: 7500 },
        { name: 'Moscow Mule', price: 7000 },
        { name: 'London Mule', price: 7000 },
        { name: 'Amaretto Martini', desc: 'Amaretto, vermut, cereza', price: 6500 },
        { name: 'Gin Tonic', price: 6500 },
        { name: 'Clavo Oxidado', price: 6500 },
        { name: 'Piña Colada', price: 6500 },
        { name: 'Apple Mule', price: 6500 },
        { name: 'Negroni', price: 6000 },
        { name: 'Margarita', desc: 'Tequila, triple sec, lima', price: 5000 },
        { name: 'Mojito Sabores', price: 6500 },
        { name: 'Caipirinha', desc: 'Cachaça, lima, azúcar', price: 5500 },
        { name: 'Amaretto Sour', price: 5500 },
        { name: 'Tom Collins', price: 5500 },
        { name: 'Daiquiri', price: 5500 },
        { name: 'Mojito', price: 5500 },
      ],
    },
    // 7. Cervezas
    {
      name: 'Cervezas Artesanales — La Casona',
      items: [
        { name: 'Litro Degustación', desc: '3 schops 350cc a tu gusto de las cervezas del día', price: 8900 },
        { name: 'Calafate Premium 500cc', price: 5000 },
        { name: 'Cuello Negro', desc: '2° Lugar Mundial', price: 6000 },
        { name: 'Kunstmann Torobayo', price: 5000 },
        { name: 'Austral Calafate', price: 5000 },
        { name: 'Golden Ale (Rubia) 500cc', price: 4500 },
        { name: 'Amber (Roja) 500cc', price: 4500 },
        { name: 'Peroni', desc: 'Italiana', price: 4000 },
      ],
    },
    // 8. Vinos y Espumantes
    {
      name: 'Vinos y Espumantes',
      items: [
        { name: 'Botella Gran Reserva', desc: 'Carmenere · Cabernet Sauvignon · Merlot', price: 20000 },
        { name: 'Botella Vino Varietal/Reserva', price: '9.000 / 15.000' },
        { name: 'Botella Espumante', price: 12000 },
        { name: 'Copa de Espumante Brut', price: 3500 },
        { name: 'Copa de Vino Varietal/Reserva', price: '2.500 / 4.500' },
      ],
    },
    // 9. Coctelería Sin Alcohol
    {
      name: 'Sin Alcohol',
      items: [
        { name: 'Lampone e Basilico', desc: 'Maceración de albahaca, jengibre, limón y pimienta con toque de frambuesa y tónica', price: 6300 },
        { name: 'Cetriolo e Pepperoncino', desc: 'Maceración de pepino, menta y pepperoncino italiano con toque de piña y tónica', price: 6300 },
        { name: 'Mojito Sin Alcohol Sabores', price: 6200 },
        { name: 'Mojito Sin Alcohol', price: 5200 },
        { name: 'Orange Espresso', price: 4490 },
      ],
    },
    // 10. Jugos y Bebidas
    {
      name: 'Jugos y Bebidas',
      items: [
        { name: 'Jugo Natural Jarrito', price: 3900 },
        { name: 'Limonada Jarrito', price: 3900 },
        { name: 'Cerveza Jengibre', price: 3500 },
        { name: 'Bebidas', price: 2500 },
      ],
    },
    // 11. Tragos — licores servidos por copa
    {
      name: 'Tragos',
      items: [
        { name: 'Chivas Regal', desc: 'Whisky', price: 8000 },
        { name: 'Horcón Quemado', desc: 'Pisco', price: 7000 },
        { name: 'Tanqueray', desc: 'Gin', price: 7500 },
        { name: 'Grants', desc: 'Whisky', price: 6000 },
        { name: 'Limoncello', desc: 'Bajativo', price: 6000 },
        { name: 'Bombay', desc: 'Gin', price: 6500 },
        { name: 'Beefeater', desc: 'Gin', price: 6500 },
        { name: 'José Cuervo', desc: 'Tequila', price: 5500 },
        { name: 'Havana', desc: 'Ron', price: 5000 },
        { name: 'Mistral', desc: 'Pisco', price: 5000 },
        { name: 'Mistral Manzana', desc: 'Pisco', price: 5000 },
        { name: 'Alto del Carmen', desc: 'Pisco', price: 5000 },
        { name: 'Senda', desc: 'Tequila', price: 4000 },
        { name: 'Amaretto', desc: 'Bajativo', price: 4000 },
        { name: 'Manzanilla', desc: 'Bajativo', price: 3800 },
        { name: 'Menta', desc: 'Bajativo', price: 3500 },
      ],
    },
    // 12. Shots
    {
      name: 'Shots',
      subtitle: '$3.000 c/u',
      items: [
        { name: 'Tequila José Cuervo', price: 3000 },
        { name: 'Jagermeister', price: 3000 },
        { name: 'Fireball', price: 3000 },
      ],
    },
  ],
}
