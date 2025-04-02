import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  UilChartPie,
  UilCube,
  UilDocumentLayoutRight,
  UilFilesLandscapesAlt,
  UilPuzzlePiece
} from '@iconscout/react-unicons'; 
import { useAuth } from 'providers/AuthProvider';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
  next?: boolean;
  nivel_acceso?: string[]; // Add access restriction
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

const getRoutes = (nivel_acceso: string | null): RouteItems[] => {
  const baseRoutes: RouteItems[] = [
    {
      label: 'procesos',
      horizontalNavLabel: 'home',
      active: true,
      icon: UilChartPie,
      labelDisabled: true,
      pages: [
        {
          name: 'procesos',
          icon: 'list',
          path: '/apps/project-management/procesos-list-view',
          pathName: 'project-management-procesos-list-view',
          active: true,
          nivel_acceso: ['usuario', 'supervisor', 'socio', 'pagos'] // Everyone
        },
        {
          name: 'pendientes',
          icon: 'list',
          path: '/apps/project-management/pendientes-list-view',
          pathName: 'project-management-pendientes-list-view',
          active: true,
          nivel_acceso: [ 'supervisor', 'socio', 'pagos'] // Everyone
        },
        {
          name: 'Pagos',
          icon: 'dollar-sign',
          path: '/apps/pagos/pagos-list-view',
          pathName: 'pagos-list-view',
          active: true,
          nivel_acceso: ['usuario', 'supervisor', 'socio', 'pagos'] // Everyone
        },
        {
          name: 'Caja',
          icon: 'dollar-sign',
          path: '/apps/project-management/caja-list-view',
          pathName: 'caja-list-view',
          active: true,
          nivel_acceso: ['usuario', 'supervisor', 'socio', 'pagos'] // Everyone
        },
        {
          name: 'Miembros',
          icon: 'users',
          path: '/pages/members',
          pathName: 'members-page',
          active: true,
          nivel_acceso: ['usuario', 'supervisor', 'socio', 'pagos'] // Everyone
        }
      ]
    }
  ];

  // Filter routes based on role
  return baseRoutes.map(route => ({
    ...route,
    pages: route.pages.filter(page =>
      page.nivel_acceso?.includes(nivel_acceso || 'user') || !page.nivel_acceso
    )
  }));
};

export const RoutesComponent = () => {
  const { user } = useAuth();
  const routes = getRoutes(user?.nivel_acceso || null);
  console.log('Filtered routes for role', user?.nivel_acceso, ':', routes);
  // Use routes in your navigation bar here
  return null; // Replace with your nav rendering logic
};

export default getRoutes;