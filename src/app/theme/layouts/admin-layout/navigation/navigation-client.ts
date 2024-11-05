import { NavigationItem } from './navigation';

export const NavigationClientItems: NavigationItem[] = [
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
    id: 'utilities',
    title: 'Users',
    type: 'group',
    icon: 'icon-user',
    children: [
      {
        id: 'clients',
        title: 'Clients',
        type: 'item',
        classes: 'nav-item',
        url: '/clients',
        icon: 'user',
        breadcrumbs: false
      }
    ]
  }
];
