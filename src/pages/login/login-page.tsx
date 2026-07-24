import { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { AppLink } from '../../components/app-link';

const logoPath = '/assets/img/logo1.png';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 text-ink">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden overflow-hidden bg-brand-700 px-10 py-8 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(150deg,rgba(30,64,175,0),rgba(15,23,42,0.35))]" />
          <div className="relative z-10 flex items-center gap-3">
            <img src={logoPath} alt="Pharmacontrol" className="h-11 w-11 rounded-md bg-white object-contain p-1" />
            <div>
              <p className="text-lg font-bold">Pharmacontrol</p>
              <p className="text-sm text-blue-100">Gestión farmacéutica inteligente</p>
            </div>
          </div>

          <div className="relative z-10 my-auto max-w-xl">
            <p className="mb-4 inline-flex rounded-md bg-white/12 px-3 py-1 text-sm font-semibold text-blue-50">
              Panel seguro
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              Controla inventario, alertas y operación desde un solo acceso.
            </h1>
            <p className="mt-5 text-lg leading-8 text-blue-100">
              Diseñado para que el equipo de farmacia trabaje con información clara, permisos
              definidos y menos fricción en las tareas diarias.
            </p>

            <div className="mt-8 grid gap-3">
              <TrustItem icon={<ShieldCheck size={20} />} text="Acceso preparado para roles y permisos." />
              <TrustItem icon={<Activity size={20} />} text="Visibilidad inmediata de ventas, stock y caducidades." />
              <TrustItem icon={<Smartphone size={20} />} text="Base visual consistente con la app móvil." />
            </div>
          </div>

          <div className="relative z-10 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p className="text-sm font-semibold text-blue-50">Siguiente integración</p>
            <p className="mt-1 text-sm leading-6 text-blue-100">
              Este formulario quedará conectado al endpoint de autenticación de tu API NestJS.
            </p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-8">
          <div className="w-full max-w-md">
            <AppLink
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-700"
            >
              <ArrowLeft size={18} />
              Volver al inicio
            </AppLink>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-700">
                  <LockKeyhole size={24} />
                </div>
                <h1 className="text-3xl font-bold text-ink">Iniciar sesión</h1>
                <p className="mt-2 leading-7 text-slate-600">
                  Ingresa con tu cuenta administrativa para continuar.
                </p>
              </div>

              <form className="space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Correo electrónico</span>
                  <div className="mt-1 flex items-center rounded-md border border-slate-300 bg-white px-3 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100">
                    <Mail size={18} className="shrink-0 text-slate-400" />
                    <input
                      className="w-full border-0 bg-transparent px-3 py-3 outline-none"
                      type="email"
                      name="email"
                      placeholder="usuario@farmacia.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Contraseña</span>
                  <div className="mt-1 flex items-center rounded-md border border-slate-300 bg-white px-3 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100">
                    <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                    <input
                      className="w-full border-0 bg-transparent px-3 py-3 outline-none"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Tu contraseña"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-brand-700"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 font-medium text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                    />
                    Recordar sesión
                  </label>
                  <a href="#" className="font-semibold text-brand-700 hover:underline">
                    Recuperar contraseña
                  </a>
                </div>

                <AppLink
                  to="/dashboard"
                  className="block rounded-md bg-brand-600 px-4 py-3 text-center font-semibold text-white shadow-sm hover:bg-brand-700"
                >
                  Entrar al dashboard
                </AppLink>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Acceso exclusivo para personal autorizado de farmacia.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15">{icon}</div>
      <p className="text-sm font-medium leading-6 text-blue-50">{text}</p>
    </div>
  );
}
