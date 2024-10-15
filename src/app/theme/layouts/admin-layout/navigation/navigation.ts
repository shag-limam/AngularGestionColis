//src\app\theme\layouts\admin-layout\navigation\navigation.ts
export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}


export const NavigationItems: NavigationItem[] = [
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
      },
      {
        id: 'list-livreurs',
        title: 'Livreurs',
        type: 'item',
        classes: 'nav-item',
        url: '/livreurs',
        icon: 'user',
        breadcrumbs: false
      }
    ]
  },  
  // {
  //   id: 'livreurs',
  //   title: 'Livreurs',
  //   type: 'group',
  //   icon: 'icon-delivery',
  //   children: [
  //     {
  //       id: 'list-livreurs',
  //       title: 'Livreurs',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/livreurs',
  //       icon: 'user',
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  {
    id: 'logistics',
    title: 'Logistics',
    type: 'group',
    icon: 'icon-package',  // Replace with an appropriate icon for the group
    children: [
      {
        id: 'list-colis',
        title: 'Colis',
        type: 'item',
        classes: 'nav-item',
        url: '/colis',
        icon: 'profile',  // Replace with the appropriate icon for "Colis"
        breadcrumbs: false
      },
      {
        id: 'list-livraisons',
        title: 'Livraisons',
        type: 'item',
        classes: 'nav-item',
        url: '/livraisons',
        icon: 'profile',  // Replace with the appropriate icon for "Livraisons"
        breadcrumbs: false
      }
    ]
  },  
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'utilities',
    title: 'UI Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'font-size'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'bg-colors'
      },
      {
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://ant.design/components/icon',
        icon: 'ant-design',
        target: true,
        external: true
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];
