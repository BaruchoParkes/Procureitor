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
          nivel_acceso: ['usuario', 'supervisor', 'LA','socio', 'pagos'] // Everyone
        },
        {
          name: 'mis-procesos',
          icon: 'list',
          path: '/apps/project-management/procesos-user-list-view',
          pathName: 'project-management-procesos-user-list-view',
          active: true,
          nivel_acceso: ['usuario', 'supervisor', 'LA','socio', 'pagos'] // Everyone
        },

/*         {
          name: 'Movimientos Pendientes',
          icon: 'list',
          path: '/apps/project-management/pendientes-list-view',
          pathName: 'project-management-pendientes-list-view',
          active: true,
          nivel_acceso: [ 'supervisor', 'socio', 'pagos', 'usuario']
        },
 */        {
          name: 'Cobros Pendientes', // cada usuario ve sus pagos pendientes
          icon: 'dollar-sign',
          path: '/apps/project-management/cobros-list-view',
          pathName: 'project-management-cobros-list-view',
          active: true,
          nivel_acceso: [ 'supervisor', 'socio', 'LA','pagos', 'usuario']
        },
        {
          name: 'Pagos', // para que cada usuario vea sus pagos
          icon: 'dollar-sign',
          path: '/apps/pagos/pagos-usuario-list-view',
          pathName: 'pagos-list-view',
          active: true,
          nivel_acceso: ['usuario','socio', 'pagos', 'LA','supervisor']
        },
        {
          name: 'Pagos Generales', // solo paga FAM y Socios
          icon: 'dollar-sign',
          path: '/apps/pagos/pagos-generales-list-view',
          pathName: 'pagos-list-view',
          active: true,
          nivel_acceso: ['socio', 'pagos', 'supervisor']
        },
        {
          name: 'Caja',
          icon: 'dollar-sign',
          path: '/apps/project-management/caja-list-view',
          pathName: 'caja-list-view',
          active: true,
          nivel_acceso: ['usuario', 'LA','supervisor', 'socio', 'pagos']
        },
        {
          name: 'Caja Cash',
          icon: 'dollar-sign',
          path: '/apps/project-management/caja-cash-list-view',
          pathName: 'caja-cash-list-view',
          active: true,
          nivel_acceso: ['supervisor', 'socio']
        },
        {
          name: 'Caja Sucesion',
          icon: 'dollar-sign',
          path: '/apps/project-management/caja-sucesion-list-view',
          pathName: 'caja-sucesion-list-view',
          active: true,
          nivel_acceso: ['LA', 'socio']
        },
        {
          name: 'Caja General',
          icon: 'dollar-sign',
          path: '/apps/project-management/caja-general-list-view',
          pathName: 'caja-list-view',
          active: true,
          nivel_acceso: ['socio']
        },
        {
          name: 'Miembros',
          icon: 'users',
          path: '/pages/members',
          pathName: 'members-page',
          active: true,
          nivel_acceso: ['usuario', 'LA','supervisor', 'socio', 'pagos']
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