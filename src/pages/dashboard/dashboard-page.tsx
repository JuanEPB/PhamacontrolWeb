import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Boxes,
  CalendarClock,
  CheckCircle2,
  PackageX,
  RefreshCw,
  Truck,
} from 'lucide-react';
import { AdminShell } from '../../components/admin-shell';
import { medicamentosApi, pedidosApi, proveedoresApi } from '../../services/pharmacontrol-api';
import type { Medicamento, MedicamentosCaducidad, MedicamentosStats, Pedido, Proveedor } from '../../types/api';

type DashboardState = {
  caducidad: MedicamentosCaducidad | null;
  pedidos: Pedido[];
  proveedores: Proveedor[];
  stats: MedicamentosStats | null;
};

const emptyState: DashboardState = {
  caducidad: null,
  pedidos: [],
  proveedores: [],
  stats: null,
};

export function DashboardPage() {
  const [data, setData] = useState<DashboardState>(emptyState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadDashboard() {
    setIsLoading(true);
    setError('');

    try {
      const [stats, caducidad, proveedores, pedidos] = await Promise.all([
        medicamentosApi.stats(),
        medicamentosApi.caducidad(),
        proveedoresApi.all(),
        pedidosApi.all(),
      ]);

      setData({ stats, caducidad, proveedores, pedidos });
    } catch (dashboardError) {
      if (import.meta.env.DEV) {
        console.error('[Dashboard load error]', dashboardError);
      }
      setError('No fue posible cargar la información del dashboard.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  const categoryEntries = useMemo(() => {
    return Object.entries(data.stats?.porCategoria ?? {}).sort(([, a], [, b]) => b - a);
  }, [data.stats?.porCategoria]);

  const expiringMedicines = data.caducidad?.medicamentos.slice(0, 6) ?? [];
  const pendingOrders = data.pedidos.filter((pedido) => pedido.estatus === 'ENVIADO').length;

  return (
    <AdminShell title="Dashboard">
      <div className="space-y-5">
        <section className="flex flex-col justify-between gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-700">Resumen operativo</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">Estado general de farmacia</h2>
            <p className="mt-2 text-slate-600">
              Consulta la información más relevante de tu inventario y pedidos en un solo lugar.
            </p>
          </div>
          <button
            type="button"
            onClick={loadDashboard}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-600 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={17} className={isLoading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </section>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            icon={<Boxes size={22} />}
            label="Medicamentos"
            loading={isLoading}
            tone="blue"
            value={data.stats?.total ?? 0}
          />
          <KpiCard
            icon={<AlertTriangle size={22} />}
            label="Bajo stock"
            loading={isLoading}
            tone="amber"
            value={data.stats?.bajoStock ?? 0}
          />
          <KpiCard
            icon={<CalendarClock size={22} />}
            label="Por caducar"
            loading={isLoading}
            tone="orange"
            value={data.stats?.porCaducar ?? 0}
          />
          <KpiCard
            icon={<PackageX size={22} />}
            label="Caducados"
            loading={isLoading}
            tone="red"
            value={data.stats?.caducados ?? 0}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <MiniStat label="Proveedores activos" value={data.proveedores.length} icon={<Truck size={20} />} />
          <MiniStat label="Pedidos pendientes" value={pendingOrders} icon={<CalendarClock size={20} />} />
          <MiniStat label="Pedidos totales" value={data.pedidos.length} icon={<CheckCircle2 size={20} />} />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-ink">Distribución por categoría</h2>
                <p className="mt-1 text-sm text-slate-500">Inventario agrupado por tipo de producto.</p>
              </div>
              <span className="rounded-md bg-brand-100 px-3 py-1 text-sm font-bold text-brand-700">
                {data.stats?.total ?? 0} total
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {categoryEntries.length ? (
                categoryEntries.map(([category, count]) => (
                  <CategoryBar key={category} category={category} count={count} total={data.stats?.total ?? 0} />
                ))
              ) : (
                <EmptyMessage message={isLoading ? 'Cargando categorías...' : 'Sin categorías registradas.'} />
              )}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-ink">Salud del inventario</h2>
            <p className="mt-1 text-sm text-slate-500">Señales prioritarias para tomar acción.</p>
            <div className="mt-5 space-y-3">
              <HealthRow label="Stock suficiente" value={getHealthyStock(data.stats)} tone="blue" />
              <HealthRow label="Bajo stock" value={data.stats?.bajoStock ?? 0} tone="amber" />
              <HealthRow label="Por caducar" value={data.stats?.porCaducar ?? 0} tone="orange" />
              <HealthRow label="Caducados" value={data.stats?.caducados ?? 0} tone="red" />
            </div>
          </article>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-ink">Medicamentos por caducar</h2>
                <p className="mt-1 text-sm text-slate-500">Primeros productos que requieren revisión.</p>
              </div>
              <span className="rounded-md bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
                {data.caducidad?.total ?? 0}
              </span>
            </div>
            <div className="mt-5 overflow-x-auto">
              {expiringMedicines.length ? (
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="py-3 pr-4">Medicamento</th>
                      <th className="py-3 pr-4">Lote</th>
                      <th className="py-3 pr-4">Caducidad</th>
                      <th className="py-3 pr-4 text-right">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {expiringMedicines.map((medicine) => (
                      <MedicineRow key={`${medicine.id}-${medicine.lote}`} medicine={medicine} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyMessage message={isLoading ? 'Cargando medicamentos...' : 'Sin medicamentos por caducar.'} />
              )}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-ink">Pedidos</h2>
            <p className="mt-1 text-sm text-slate-500">Seguimiento rápido de abastecimiento.</p>
            <div className="mt-5 space-y-3">
              {data.pedidos.length ? (
                data.pedidos.slice(0, 5).map((pedido) => (
                  <div key={pedido.id} className="rounded-md border border-slate-200 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-800">Pedido #{pedido.id}</p>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                        {pedido.estatus}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Total: {formatCurrency(Number(pedido.total))}</p>
                  </div>
                ))
              ) : (
                <EmptyMessage message={isLoading ? 'Cargando pedidos...' : 'No hay pedidos registrados.'} />
              )}
            </div>
          </article>
        </section>
      </div>
    </AdminShell>
  );
}

function KpiCard({
  icon,
  label,
  loading,
  tone,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  loading: boolean;
  tone: 'amber' | 'blue' | 'orange' | 'red';
  value: number;
}) {
  const toneClass = {
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-brand-100 text-brand-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
  }[tone];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-11 w-11 items-center justify-center rounded-md ${toneClass}`}>{icon}</div>
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-ink">{loading ? '...' : value.toLocaleString('es-MX')}</p>
    </article>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <article className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-700">{icon}</div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-xl font-bold text-ink">{value.toLocaleString('es-MX')}</p>
      </div>
    </article>
  );
}

function CategoryBar({ category, count, total }: { category: string; count: number; total: number }) {
  const percentage = total ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="font-semibold text-slate-700">{category}</p>
        <p className="text-slate-500">
          {count} · {percentage}%
        </p>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-brand-600" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function HealthRow({ label, tone, value }: { label: string; tone: 'amber' | 'blue' | 'orange' | 'red'; value: number }) {
  const dotClass = {
    amber: 'bg-amber-500',
    blue: 'bg-brand-600',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  }[tone];

  return (
    <div className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-3">
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <span className="font-bold text-ink">{value.toLocaleString('es-MX')}</span>
    </div>
  );
}

function MedicineRow({ medicine }: { medicine: Medicamento }) {
  return (
    <tr>
      <td className="py-3 pr-4 font-semibold text-slate-800">{medicine.nombre}</td>
      <td className="py-3 pr-4 text-slate-600">{medicine.lote}</td>
      <td className="py-3 pr-4 text-slate-600">{formatDate(medicine.caducidad)}</td>
      <td className="py-3 pr-4 text-right font-semibold text-slate-800">{medicine.stock}</td>
    </tr>
  );
}

function EmptyMessage({ message }: { message: string }) {
  return <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">{message}</p>;
}

function getHealthyStock(stats: MedicamentosStats | null) {
  if (!stats) {
    return 0;
  }

  return Math.max(stats.total - stats.bajoStock - stats.caducados, 0);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-MX', {
    currency: 'MXN',
    style: 'currency',
  }).format(value);
}
