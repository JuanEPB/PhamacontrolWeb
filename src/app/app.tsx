import { useEffect, useState } from 'react';
import { DashboardPage } from '../pages/dashboard/dashboard-page';
import { HomePage } from '../pages/home/home-page';
import { LoginPage } from '../pages/login/login-page';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/dashboard': DashboardPage,
};

type RoutePath = keyof typeof routes;

function getRoutePath(): RoutePath {
  const path = window.location.pathname;
  return path in routes ? (path as RoutePath) : '/';
}

export function App() {
  const [route, setRoute] = useState<RoutePath>(() => getRoutePath());
  const Page = routes[route];

  useEffect(() => {
    const onPopState = () => setRoute(getRoutePath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onNavigate = () => setRoute(getRoutePath());
    window.addEventListener('app:navigate', onNavigate);
    return () => window.removeEventListener('app:navigate', onNavigate);
  }, []);

  return <Page />;
}
