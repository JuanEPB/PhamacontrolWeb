import { ArrowRight, ClipboardCheck, ShieldCheck, Stethoscope } from 'lucide-react';
import { AppLink } from '../../components/app-link';
import { PublicShell } from '../../components/public-shell';

const benefits = [
  {
    title: 'Inventario controlado',
    description: 'Seguimiento claro de existencias, lotes, caducidades y movimientos.',
    icon: ClipboardCheck,
  },
  {
    title: 'Operacion segura',
    description: 'Base preparada para roles, permisos y auditoria durante la migracion.',
    icon: ShieldCheck,
  },
  {
    title: 'Gestion farmaceutica',
    description: 'Interfaz enfocada en flujos diarios de farmacia y administracion.',
    icon: Stethoscope,
  },
];

export function HomePage() {
  return (
    <PublicShell>
      <main>
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-20">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-600">
                Nueva plataforma
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight text-ink md:text-5xl">
                Pharmacontrol para operar farmacia con trazabilidad y control.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Esta version inicia la migracion desde Django hacia una aplicacion moderna,
                modular y lista para crecer por etapas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AppLink
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 font-semibold text-white shadow-soft hover:bg-brand-700"
                >
                  Iniciar sesion
                  <ArrowRight size={18} />
                </AppLink>
                <AppLink
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:border-brand-600 hover:text-brand-700"
                >
                  Ver dashboard
                </AppLink>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-soft">
              <div className="rounded-md bg-white p-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm text-slate-500">Resumen operativo</p>
                    <p className="text-2xl font-bold text-ink">Hoy</p>
                  </div>
                  <span className="rounded-md bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-700">
                    Activo
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Metric label="Productos" value="1,248" />
                  <Metric label="Alertas" value="18" />
                  <Metric label="Ventas" value="$42.8k" />
                  <Metric label="Recetas" value="96" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <Icon className="text-brand-600" size={28} />
                <h2 className="mt-4 text-lg font-semibold text-ink">{benefit.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{benefit.description}</p>
              </article>
            );
          })}
        </section>
      </main>
    </PublicShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-ink">{value}</p>
    </div>
  );
}
