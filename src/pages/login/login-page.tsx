import { LockKeyhole } from 'lucide-react';
import { AppLink } from '../../components/app-link';
import { PublicShell } from '../../components/public-shell';

export function LoginPage() {
  return (
    <PublicShell>
      <main className="mx-auto flex max-w-6xl items-center justify-center px-5 py-16">
        <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-md bg-brand-100 p-2 text-brand-700">
              <LockKeyhole size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink">Iniciar sesion</h1>
              <p className="text-sm text-slate-500">Acceso administrativo</p>
            </div>
          </div>
          <form className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Correo</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                type="email"
                placeholder="usuario@farmacia.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Contrasena</span>
              <input
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                type="password"
                placeholder="********"
              />
            </label>
            <AppLink
              to="/dashboard"
              className="block rounded-md bg-brand-600 px-4 py-3 text-center font-semibold text-white hover:bg-brand-700"
            >
              Entrar
            </AppLink>
          </form>
        </section>
      </main>
    </PublicShell>
  );
}
