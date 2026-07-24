import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
import { getStoredUser, setStoredUser } from '../services/api-client';
import { authApi, usersApi } from '../services/pharmacontrol-api';
import type { Usuario } from '../types/api';

type AdminShellProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
};

type NavItem = {
  icon: LucideIcon;
  label: string;
  path: string;
  roles: Usuario['rol'][];
};

const primaryNav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: Home, roles: ['admin', 'usuario'] },
  { label: 'Inventario', path: '/inventory', icon: Boxes, roles: ['admin'] },
  { label: 'Reportes', path: '/reports', icon: BarChart3, roles: ['admin'] },
  { label: 'Usuarios', path: '/Users', icon: Users, roles: ['admin'] },
  { label: 'Pedidos', path: '/orders', icon: Truck, roles: ['admin'] },
  { label: 'Proveedores', path: '/suppliers', icon: PackagePlus, roles: ['admin'] },
  { label: 'Carrito', path: '/cart', icon: ShoppingCart, roles: ['admin', 'usuario'] },
];

const secondaryNav: NavItem[] = [
  { label: 'Configuración', path: '/settings', icon: Settings, roles: ['admin'] },
];

export function AdminShell({ children, eyebrow = 'Panel administrativo', title }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<Usuario | null>(() => getStoredUser<Usuario>());
  const currentPath = useCurrentPath();
  const visiblePrimaryNav = useMemo(() => filterNavByRole(primaryNav, user?.rol), [user?.rol]);
  const visibleSecondaryNav = useMemo(() => filterNavByRole(secondaryNav, user?.rol), [user?.rol]);
  const userName = getUserDisplayName(user);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const userId = user.id;
    let ignore = false;

    async function loadUser() {
      try {
        const fullUser = await usersApi.getNameRole(userId);
        const safeUser = toSafeUser(fullUser);
        if (!ignore) {
          setUser(safeUser);
          setStoredUser(safeUser);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('[Load user error]', error);
        }
      }
    }

    void loadUser();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-slate-100 text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-800 bg-slate-950 text-white lg:flex lg:flex-col">
        <SidebarContent
          currentPath={currentPath}
          primaryNav={visiblePrimaryNav}
          secondaryNav={visibleSecondaryNav}
          user={user}
        />
      </aside>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <AppLink to="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold text-brand-700">Pharmacontrol</span>
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold capitalize text-brand-700">
              {user?.rol ?? 'usuario'}
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
            <SidebarNav currentPath={currentPath} primaryNav={visiblePrimaryNav} secondaryNav={visibleSecondaryNav} />
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
                {userName}
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

function SidebarContent({
  currentPath,
  primaryNav,
  secondaryNav,
  user,
}: {
  currentPath: string;
  primaryNav: NavItem[];
  secondaryNav: NavItem[];
  user: Usuario | null;
}) {
  const userName = getUserDisplayName(user);
  const initials = getUserInitials(user);

  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5">
        <AppLink to="/dashboard" className="text-xl font-bold text-blue-100">
          Pharmacontrol
        </AppLink>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold capitalize text-brand-700">
          {user?.rol ?? 'usuario'}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3 py-5">
        <SidebarNav currentPath={currentPath} primaryNav={primaryNav} secondaryNav={secondaryNav} />
      </div>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{userName}</p>
            <p className="text-xs capitalize text-slate-400">{user?.rol ?? 'usuario'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarNav({
  currentPath,
  primaryNav,
  secondaryNav,
}: {
  currentPath: string;
  primaryNav: NavItem[];
  secondaryNav: NavItem[];
}) {
  async function handleLogout() {
    await authApi.logout();
    window.history.replaceState({}, '', '/login');
    window.dispatchEvent(new Event('app:navigate'));
  }

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
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-white"
        >
          <LogOut size={19} />
          Cerrar Sesión
        </button>
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

function filterNavByRole(items: NavItem[], role: Usuario['rol'] | undefined) {
  const resolvedRole = role ?? 'usuario';
  return items.filter((item) => item.roles.includes(resolvedRole));
}

function toSafeUser(user: Usuario): Usuario {
  return {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    rol: user.rol,
    farmacia_id: user.farmacia_id,
    farmaciaId: user.farmaciaId,
  };
}

function getUserDisplayName(user: Usuario | null) {
  if (!user) {
    return 'Usuario';
  }

  const fullName = `${user.nombre ?? ''} ${user.apellido ?? ''}`.trim();
  return fullName || user.email || 'Usuario';
}

function getUserInitials(user: Usuario | null) {
  const displayName = getUserDisplayName(user);
  const parts = displayName.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
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
