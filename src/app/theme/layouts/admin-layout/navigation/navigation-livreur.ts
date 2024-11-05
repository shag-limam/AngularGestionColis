import { NavigationItem } from './navigation';

export const NavigationLivreurItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'logistics',
    title: 'Logistics',
    type: 'group',
    icon: 'icon-package',
    children: [
      {
        id: 'list-colis',
        title: 'Colis',
        type: 'item',
        classes: 'nav-item',
        url: '/colis',
        icon: 'profile',
        breadcrumbs: false
      },
      {
        id: 'list-livraisons',
        title: 'Livraisons',
        type: 'item',
        classes: 'nav-item',
        url: '/livraisons',
        icon: 'profile',
        breadcrumbs: false
      }
    ]
  }
];
