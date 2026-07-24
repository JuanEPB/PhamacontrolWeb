import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  PackagePlus,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { AppLink } from './app-link';

type AdminShellProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
};

const primaryNav = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Inventario', path: '/inventory', icon: Boxes },
  { label: 'Reportes', path: '/reports', icon: BarChart3 },
  { label: 'Usuarios', path: '/Users', icon: Users },
  { label: 'Pedidos', path: '/orders', icon: Truck },
  { label: 'Proveedores', path: '/suppliers', icon: PackagePlus },
  { label: 'Carrito', path: '/cart', icon: ShoppingCart },
];

const secondaryNav = [{ label: 'Configuración', path: '/settings', icon: Settings }];

export function AdminShell({ children, eyebrow = 'Panel administrativo', title }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const currentPath = useCurrentPath();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-slate-100 text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-800 bg-slate-950 text-white lg:flex lg:flex-col">
        <SidebarContent currentPath={currentPath} />
      </aside>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <AppLink to="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold text-brand-700">Pharmacontrol</span>
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700">
              Admin
            </span>
          </AppLink>
          <button
            type="button"
            className="rounded-md border border-slate-300 p-2 text-slate-700"
            aria-label={isMobileOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((current) => !current)}
          >
            {isMobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {isMobileOpen ? (
          <div className="border-t border-slate-200 bg-slate-950 p-3 text-white">
            <SidebarNav currentPath={currentPath} />
          </div>
        ) : null}
      </header>

      <main className="lg:pl-72">
        <div className="border-b border-slate-200 bg-white px-5 py-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{eyebrow}</p>
              <h1 className="mt-1 text-2xl font-bold text-ink">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-md border border-slate-300 p-2 text-slate-600 hover:border-brand-600 hover:text-brand-700"
                aria-label="Notificaciones"
              >
                <Bell size={20} />
              </button>
              <button
                type="button"
                className="hidden items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-brand-600 hover:text-brand-700 sm:inline-flex"
              >
                User
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 py-5">{children}</div>
      </main>
    </div>
  );
}

function SidebarContent({ currentPath }: { currentPath: string }) {
  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5">
        <AppLink to="/dashboard" className="text-xl font-bold text-blue-100">
          Pharmacontrol
        </AppLink>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-brand-700">Admin</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3 py-5">
        <SidebarNav currentPath={currentPath} />
      </div>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
            JP
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">User</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="flex min-h-0 flex-1 flex-col justify-between gap-6">
      <div className="space-y-1">
        {primaryNav.map((item) => (
          <NavLink key={item.path} currentPath={currentPath} {...item} />
        ))}
      </div>
      <div className="space-y-1">
        {secondaryNav.map((item) => (
          <NavLink key={item.path} currentPath={currentPath} {...item} />
        ))}
        <AppLink
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-white"
        >
          <LogOut size={19} />
          Cerrar Sesión
        </AppLink>
      </div>
    </nav>
  );
}

function NavLink({
  currentPath,
  icon: Icon,
  label,
  path,
}: {
  currentPath: string;
  icon: LucideIcon;
  label: string;
  path: string;
}) {
  const isActive = currentPath === path;

  return (
    <AppLink
      to={path}
      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
        isActive ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
      }`}
    >
      <Icon size={19} />
      {label}
    </AppLink>
  );
}

function useCurrentPath() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    window.addEventListener('app:navigate', updatePath);
    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('app:navigate', updatePath);
    };
  }, []);

  return path;
}
