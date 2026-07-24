import { useEffect, useState } from 'react';
import { BarChart3, Boxes, PackagePlus, Settings, ShoppingCart, Truck, Users } from 'lucide-react';
import { DashboardPage } from '../pages/dashboard/dashboard-page';
import { HomePage } from '../pages/home/home-page';
import { LoginPage } from '../pages/login/login-page';
import { PlaceholderPage } from '../pages/admin/placeholder-page';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/dashboard': DashboardPage,
  '/inventory': () => (
    <PlaceholderPage
      icon={<Boxes size={25} />}
      title="Inventario"
      description="Aquí gestionaremos productos, existencias, lotes, caducidades y movimientos cuando conectemos los endpoints."
    />
  ),
  '/reports': () => (
    <PlaceholderPage
      icon={<BarChart3 size={25} />}
      title="Reportes"
      description="Vista preparada para reportes de ventas, productos más vendidos, inventario y rendimiento operativo."
    />
  ),
  '/Users': () => (
    <PlaceholderPage
      icon={<Users size={25} />}
      title="Usuarios"
      description="Administración de usuarios, roles y permisos para el personal autorizado."
    />
  ),
  '/orders': () => (
    <PlaceholderPage
      icon={<Truck size={25} />}
      title="Pedidos"
      description="Seguimiento de pedidos, estados, recepción de productos y relación con proveedores."
    />
  ),
  '/suppliers': () => (
    <PlaceholderPage
      icon={<PackagePlus size={25} />}
      title="Proveedores"
      description="Directorio y gestión de proveedores, historial de compras y datos de contacto."
    />
  ),
  '/cart': () => (
    <PlaceholderPage
      icon={<ShoppingCart size={25} />}
      title="Carrito"
      description="Flujo preparado para construir pedidos o ventas antes de enviarlos a la API."
    />
  ),
  '/settings': () => (
    <PlaceholderPage
      icon={<Settings size={25} />}
      title="Configuración"
      description="Preferencias del sistema, datos de farmacia y opciones administrativas."
    />
  ),
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
