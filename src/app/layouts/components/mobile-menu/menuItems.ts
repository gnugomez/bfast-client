import { HeroIconName } from 'ng-heroicon';

interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon: HeroIconName;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Resumen',
    link: '/overview',
    icon: 'home',
  },
  {
    id: 2,
    name: 'Tienda',
    link: '/shop',
    icon: 'shopping-bag',
  },
  {
    id: 3,
    name: 'Métricas',
    link: '/metrics',
    icon: 'chart-pie',
  },
  {
    id: 4,
    name: 'Histórico',
    link: '/history',
    icon: 'clock',
  },
];

export default menuItems;
