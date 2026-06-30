import type { MenuTab, MenuGroup } from './menu'

export const FALLBACK_MENU: Record<MenuTab, MenuGroup[]> = {
  ENTRADAS: [
    {
      items: [
        { name: 'Palitos di Agglio', desc: 'Palitos de masa al horno bañados en ajo, decorados con parmesano y orégano. Acompañados de nuestra famosa salsa de ajo cilantro.', price: 6900 },
        { name: 'Papas al Forno', desc: 'Papas rústicas horneadas en fuego alto, con ciboulette, parmesano y una exquisita salsa Ranch para untar.', price: 8900, note: 'Opción de pollo, carne mechada, tocino o champiñones +1.000' },
        { name: 'Bruschettas Straciatella Prosciutto', desc: 'Cuatro mini bruschettas gourmet tostadas, stracciatella artesanal, rúcula cremosa, prosciutto italiano y tomates deshidratados.', price: 13500 },
        { name: 'Camarones al Pilpil / Ajillo', desc: 'En greda, al horno, estos camarones llegarán burbujeando en mantequilla a tu mesa, acompañados de pan duro.', price: 9500 },
        { name: 'Jardín de Oliva', desc: 'Aceitunas rellenas artesanalmente con ricota sobre aceite de oliva premium, tomates deshidratados y queso feta. Con zeste de naranja y frescura de cilantro. Perfecto para untar.', price: 9900, badge: 'Furor en carta' },
        { name: 'Carpaccio Prosciutto', desc: 'Base de rúcula, prosciutto madurado, alcaparras calabresas, hojas de parmesano, queso feta y limoncina.', price: 10500 },
        { name: 'Insalata César', desc: 'Lechuga romana y croutones con jugo de limón, aceite de oliva, salsa Worcestershire, anchoas, pollo, ajo, mostaza de Dijon, parmesano y pimienta negra.', price: 8900 },
        { name: 'Insalata Caprese', desc: 'Ensalada clásica a base de albahaca, tomate laminado, queso fresco Fior di latte y pesto de la casa.', price: 8500 },
      ],
    },
  ],
  PIZZAS: [
    {
      name: 'Italianas y Especialidades',
      subtitle: '2° Lugar The Top Pizza Chile 2025',
      items: [
        { name: 'Queen Margherita', desc: 'La reina y lo sabemos. Margherita clásica elevada con Stracciatella, emulsión de aceite de albahaca, queso Fior di latte desmoronado, parmesano fino y albahaca fresca.', price: 11500 },
        { name: 'Veracruz', desc: 'Para los que buscan un poquito de fuego. Base pomidoro, fior di latte, pepperoncino fresco, tomate deshidratado, salame picante, aceitunas y albahaca.', price: 12800 },
        { name: 'Prosciutto', desc: 'Mucho más premium que el Serrano. Pomidoro, fior di latte, rúcula y hojas de prosciutto italiano madurado.', price: 13000 },
        { name: 'Mortadella e Pistacchio', desc: 'Si una es reina, esta es la Diosa. Pomidoro, fior di latte, ricotta, mortadella de pistache, albahaca, parmesano y pistachos triturados.', price: 13600 },
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
        { name: 'Pappardelle al Pesto', desc: 'Con salsa béchamel de pesto y parmesano. Fior di latte en frío en su cubierta.', price: 10500 },
        { name: 'Pappardelle al Camarón', desc: 'Camarones ecuatorianos en crema soubise reducida al vino blanco con toque de ciboulette.', price: 12500 },
        { name: 'Pappardelle Bolognesa', desc: 'Un plato mundial. Pappardelle con auténtica bolognesa reducida al vino tinto por 3 horas.', price: 11500 },
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
  POSTRES: [
    {
      items: [
        { name: 'Panna Cotta', desc: 'Dulce postre de la casa en salsa a elección, acompañado de una tierra de chocolate.', price: 3800 },
        { name: 'Tiramisú', desc: 'El favorito, el consentido y el rey. Al puro estilo italiano con Mascarpone romano, galleta italiana y café de grano. Perfecto para compartir de a 2.', price: 5800 },
        { name: 'Tiramisú Pistacchio', desc: 'La pura perfección. Este Tiramisú de pistacho le saca tres vueltas al consentido de la casa. Si buscas el nivel superior, es este.', price: 7800 },
      ],
    },
    {
      name: 'Para Compartir',
      items: [
        { name: 'Pizza Dolce Tentazione', desc: 'Pizza dulce a base de crema de pistache con nutella italiana, frutillas y cantucci.', price: 15900, note: '6 personas' },
        { name: 'Bastions', desc: 'Bastones de masa espolvoreados en azúcar glass con nutella italiana y salsas de fruta.', price: 6900, note: '4 personas' },
      ],
    },
    {
      name: 'Cafetería',
      items: [
        { name: 'Kuchen', desc: 'Consultar disponibles', price: 4500 },
        { name: 'Torta', desc: 'Consultar disponibles', price: 4500 },
        { name: 'Té', price: 2000 },
        { name: 'Americano', price: 3200 },
        { name: 'Espresso', price: 2900 },
      ],
    },
  ],
  BAR: [
    {
      name: 'Happy Hour',
      subtitle: 'Miércoles a Viernes · 17:00 a 20:00 hrs',
      items: [
        { name: 'Mojito', price: 3900 },
        { name: 'Mojito Sabores', price: 4900 },
        { name: 'Pisco Sour', price: 3900 },
        { name: 'Pisco Sour Catedral', price: 6500 },
        { name: 'Gin Tonic', price: 4900 },
        { name: 'Gin Frutal', desc: 'Tropical o Berries', price: 5700 },
        { name: '2x Pisco o Ron', desc: '+1 bebida 350cc', price: 7900 },
        { name: 'Spritz', desc: 'Ramazzotti Aperol · Hugo Cherry', price: 4900 },
      ],
    },
    {
      name: 'Spritz',
      subtitle: '6.500',
      items: [
        { name: 'Aperol Spritz', price: '' },
        { name: 'Ramazzotti Spritz', price: '' },
        { name: 'Cherry Spritz', price: '' },
        { name: 'Limoncello Spritz', desc: 'Fior de Manzana', price: '' },
        { name: 'Hugo Spritz', desc: 'Flor de Sauco', price: '' },
      ],
    },
    {
      name: 'Sours',
      subtitle: '4.900 · Catedral 8.000',
      items: [
        { name: 'Tradicional', price: '' },
        { name: 'Mango Sour', price: '' },
        { name: 'Chardonnay', price: '' },
        { name: 'Copao', desc: 'Natural El Norte', price: '' },
        { name: 'Calafate', desc: 'Natural del Sur', price: '' },
        { name: 'Sandía', desc: 'Natural de Paine', price: '' },
      ],
    },
    {
      name: 'Coctelería Clásica',
      items: [
        { name: 'Mojito', price: 3500 },
        { name: 'Mojito Sabores', price: 6500 },
        { name: 'Amaretto Sour', price: 5000 },
        { name: 'Amaretto Martini', price: 6000 },
        { name: 'Gin Tonic', price: 4500 },
        { name: 'Margarita', price: 5000 },
        { name: 'El Padrino', price: 7500 },
        { name: 'Caipirinha', price: 5500 },
        { name: 'Clavo Oxidado', price: 4500 },
        { name: 'Collins', price: 5500 },
        { name: 'José Cuervo', price: 5500 },
      ],
    },
    {
      name: 'Tragos',
      subtitle: 'Copa',
      items: [
        { name: 'Pisco Mistral', price: 5000 },
        { name: 'Pisco Mistral Manzana', price: 5000 },
        { name: 'Pisco Alto del Carmen', price: 5000 },
        { name: 'Pisco Horcón Quemado', price: 7000 },
        { name: 'Ron Havana', price: 5000 },
        { name: 'Tequila Senda', price: 4000 },
        { name: 'Tequila José Cuervo', price: 5500 },
        { name: 'Gin Bombay', price: 5000 },
        { name: 'Gin Beefeater', price: 6000 },
        { name: 'Gin Tanqueray', price: 7500 },
        { name: 'Whisky Grants', price: 6000 },
        { name: 'Whisky Chivas Regal', price: 8000 },
        { name: 'Limoncello', price: 6000 },
        { name: 'Amaretto', price: 4000 },
        { name: 'Menta', price: 4000 },
        { name: 'Manzanilla', price: 5800 },
      ],
    },
    {
      name: 'Shots',
      subtitle: '5.000',
      items: [
        { name: 'Tequila José Cuervo', price: '' },
        { name: 'Jägermeister', price: '' },
        { name: 'Fireball', price: '' },
      ],
    },
  ],
}
