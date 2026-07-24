import type { ReactNode } from 'react';
import { AppLink } from './app-link';

type PublicShellProps = {
  children: ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <AppLink to="/" className="text-lg font-semibold text-brand-700">
            Pharmacontrol
          </AppLink>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <AppLink className="text-slate-600 hover:text-brand-700" to="/">
              Inicio
            </AppLink>
            <AppLink
              className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
              to="/login"
            >
              Entrar
            </AppLink>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
