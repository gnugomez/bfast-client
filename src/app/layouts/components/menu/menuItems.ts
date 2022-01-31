interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Resumen',
    link: '/overview',
    icon: 'hero-menu-alt-2',
  },
  {
    id: 2,
    name: 'Tienda',
    link: '/shop',
    icon: 'hero-shopping-bag',
  },
  {
    id: 3,
    name: 'Métricas',
    link: '/metrics',
    icon: 'hero-chart-pie',
  },
  {
    id: 4,
    name: 'Histórico',
    link: '/history',
    icon: 'hero-clock',
  },
];

export default menuItems;
