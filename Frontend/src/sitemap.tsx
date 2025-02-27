import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  UilChartPie,
  UilCube,
  UilDocumentLayoutRight,
  UilFilesLandscapesAlt,
  UilPuzzlePiece
} from '@iconscout/react-unicons';

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

export const routes: RouteItems[] = [
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
    },
    {
      name: 'procesos-cap',
      icon: 'list',
      path: '/apps/project-management/procesos-list-view-CAP',
      pathName: 'project-management-procesos-list-view-CAP',
      active: true,
    },
    {
      name: 'recorrida',
      icon: 'list',
      path: '/apps/project-management/recorrida-list-view',
      pathName: 'project-management-recorrida-list-view',
      active: true
    },
    {
      name: 'pendientes',
      icon: 'list',
      path: '/apps/project-management/pendientes-list-view',
      pathName: 'project-management-pendientes-list-view',
      active: true
    },
    {
      name: 'calendar',
      icon: 'calendar',
      path: 'apps/calendar',
      pathName: 'app-calendar',
      active: true
    },
    {
      name: 'Email',
      icon: 'mail',
      path: '/apps/email/inbox',
      pathName: 'email-inbox',
      active: true
    },
    {
      name: 'members',
      icon: 'users',
      path: '/pages/members',
      pathName: 'members-page',
      active: true
    },
    {
      name: 'Pagos',
      icon: 'dollar-sign',
      path: '/apps/pagos/pagos-list-view',
      pathName: 'pagos-list-view',
      active: true
    },
    {
      name: 'authentication',
      icon: 'lock',
      active: true,
      pages: [
        {
          name: 'simple',
          active: true,
          pages: [
            {
              name: 'sign-in',
              path: '/pages/authentication/simple/sign-in',
              pathName: 'simple-signin',
              active: true
            }]
        }]
    }
  ]
 }
];
