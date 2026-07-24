import { AdminShell } from '../../components/admin-shell';

const stats = [
  { label: 'Productos registrados', value: '1,248' },
  { label: 'Ventas del dia', value: '$42,860' },
  { label: 'Alertas de stock', value: '18' },
  { label: 'Usuarios activos', value: '12' },
];

export function DashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </article>
          ))}
        </section>
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
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
    </AdminShell>
  );
}
