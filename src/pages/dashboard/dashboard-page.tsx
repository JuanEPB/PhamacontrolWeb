import type { ReactNode } from 'react';
import { Bell, Boxes, LayoutDashboard, LogOut, Users } from 'lucide-react';
import { AppLink } from '../../components/app-link';

const stats = [
  { label: 'Productos registrados', value: '1,248' },
  { label: 'Ventas del dia', value: '$42,860' },
  { label: 'Alertas de stock', value: '18' },
  { label: 'Usuarios activos', value: '12' },
];

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 md:block">
        <AppLink to="/" className="text-lg font-semibold text-brand-700">
          Pharmacontrol
        </AppLink>
        <nav className="mt-8 space-y-1 text-sm font-medium">
          <NavItem active icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem icon={<Boxes size={18} />} label="Inventario" />
          <NavItem icon={<Users size={18} />} label="Usuarios" />
        </nav>
      </aside>
      <main className="md:pl-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-sm text-slate-500">Panel administrativo</p>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-slate-300 p-2 text-slate-600 hover:text-brand-700">
              <Bell size={20} />
            </button>
            <AppLink
              to="/login"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-700"
            >
              <LogOut size={16} />
              Salir
            </AppLink>
          </div>
        </header>
        <section className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </article>
          ))}
        </section>
        <section className="grid gap-4 px-5 pb-8 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold">Actividad reciente</h2>
            <div className="mt-4 divide-y divide-slate-200">
              {['Entrada de inventario', 'Venta registrada', 'Producto por caducar'].map((item) => (
                <div key={item} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-medium text-slate-700">{item}</span>
                  <span className="text-sm text-slate-500">Hace unos minutos</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold">Siguiente etapa</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Aqui conectaremos autenticacion real, permisos y datos migrados desde Django.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

function NavItem({ active, icon, label }: { active?: boolean; icon: ReactNode; label: string }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left ${
        active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
