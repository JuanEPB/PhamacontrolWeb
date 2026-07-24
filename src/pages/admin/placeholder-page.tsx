import type { ReactNode } from 'react';
import { PackageSearch } from 'lucide-react';
import { AdminShell } from '../../components/admin-shell';

type PlaceholderPageProps = {
  description: string;
  icon?: ReactNode;
  title: string;
};

export function PlaceholderPage({ description, icon, title }: PlaceholderPageProps) {
  return (
    <AdminShell title={title}>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-700">
            {icon ?? <PackageSearch size={25} />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink">{title}</h2>
            <p className="mt-2 max-w-2xl leading-7 text-slate-600">{description}</p>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
