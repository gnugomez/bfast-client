interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon: {
    solid: string;
    outlined: string;
  };
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Resumen',
    link: '/overview',
    icon: {
      solid: 'hero-home-solid',
      outlined: 'hero-home',
    },
  },
  {
    id: 2,
    name: 'Tienda',
    link: '/shop',
    icon: {
      solid: 'hero-shopping-bag-solid',
      outlined: 'hero-shopping-bag',
    },
  },
  {
    id: 3,
    name: 'Métricas',
    link: '/metrics',
    icon: {
      solid: 'hero-chart-pie-solid',
      outlined: 'hero-chart-pie',
    },
  },
  {
    id: 4,
    name: 'Histórico',
    link: '/history',
    icon: {
      solid: 'hero-clock-solid',
      outlined: 'hero-clock',
    },
  },
];

export default menuItems;
