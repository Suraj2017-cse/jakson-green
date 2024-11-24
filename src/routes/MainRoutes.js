import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Main from 'pages/main/Main';
import Analytics from 'pages/analytics/Analytics';
import SideLayout from 'layout/MainLayout/SideLayout';
import AnalyticsLayout from 'layout/MainLayout/AnalyticsLayout';
import EscalationMatrix from 'pages/analytics/EscalationMatrix';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));

// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Dashboard = Loadable(lazy(() => import('pages/Dashboard/Dashboard.js')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: '/ayana',
      element: (
        <AuthGuard>
          <SideLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'main',
          element: <Main />,
        },
        {
          path: 'analytics',
          element: <Analytics />,
        },
      ],
    },
    {
      path: '/analytics',
      element: (
        <AuthGuard>
          <AnalyticsLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'details',
          element: <Analytics />,
        },
        {
          path: 'escalation-matrix',
          element: <EscalationMatrix />,
        },
      ],
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />,
        },
        {
          path: '500',
          element: <MaintenanceError500 />,
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />,
        },
      ],
    },
    
  ],
};

export default MainRoutes;
