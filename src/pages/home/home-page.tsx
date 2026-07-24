import { useEffect, useState } from 'react';
import {
  BarChart3,
  Bell,
  Bot,
  CloudDownload,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Play,
  Truck,
  X,
} from 'lucide-react';
import { AppLink } from '../../components/app-link';

const logoPath = '/assets/img/logo1.png';
const mobileAppPath = '/assets/img/app4.png';

const benefits = [
  {
    title: 'Optimiza tu Inventario',
    description:
      'Control preciso de tu stock en tiempo real, gestión de caducidad y prevención de pérdidas por productos vencidos.',
    icon: PackageCheck,
  },
  {
    title: 'Gestiona tus Proveedores',
    description:
      'Centraliza la información de proveedores, agiliza pedidos y mantén un historial de compras detallado.',
    icon: Truck,
  },
  {
    title: 'Genera Reportes Clave',
    description:
      'Obtén análisis sobre ventas, productos más vendidos y rendimiento para tomar decisiones informadas.',
    icon: BarChart3,
  },
];

const aiFeatures = [
  {
    title: 'Reportes por Email',
    description:
      'Recibe automáticamente en tu correo electrónico análisis y resúmenes de ventas, inventario y más, sin tener que pedirlos.',
    icon: Mail,
  },
  {
    title: 'Análisis Predictivo',
    description:
      'Nuestra IA analiza tus datos para predecir tendencias de ventas y sugerirte cuándo y cuánto reabastecer de cada producto.',
    icon: Bot,
  },
];

export function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${
          isScrolled
            ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur'
            : 'border-transparent bg-white/85 backdrop-blur'
        }`}
        aria-label="Navegación principal"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex h-16 items-center justify-between">
            <AppLink to="/" className="flex items-center gap-3 text-lg font-bold text-brand-700">
              <img src={logoPath} alt="Pharmacontrol" className="h-9 w-9 rounded-md object-contain" />
              <span>Pharmacontrol</span>
            </AppLink>

            <button
              type="button"
              className="rounded-md border border-slate-300 p-2 text-slate-700 md:hidden"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Mostrar menú'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
              <a className="text-slate-600 hover:text-brand-700" href="#benefits">
                Beneficios
              </a>
              <a className="text-slate-600 hover:text-brand-700" href="#contact">
                Contacto
              </a>
              <a
                className="rounded-md border border-brand-600 px-4 py-2 text-brand-700 hover:bg-brand-50"
                href="#contact"
              >
                Contrátalo
              </a>
              <AppLink
                className="rounded-md bg-brand-600 px-4 py-2 text-white shadow-sm hover:bg-brand-700"
                to="/login"
              >
                Iniciar Sesión
              </AppLink>
            </div>
          </div>

          {isMenuOpen ? (
            <div className="space-y-2 border-t border-slate-200 py-4 md:hidden">
              <a className="block rounded-md px-3 py-2 font-semibold text-slate-700" href="#benefits">
                Beneficios
              </a>
              <a className="block rounded-md px-3 py-2 font-semibold text-slate-700" href="#contact">
                Contacto
              </a>
              <a className="block rounded-md px-3 py-2 font-semibold text-brand-700" href="#contact">
                Contrátalo
              </a>
              <AppLink
                className="block rounded-md bg-brand-600 px-3 py-2 text-center font-semibold text-white"
                to="/login"
              >
                Iniciar Sesión
              </AppLink>
            </div>
          ) : null}
        </div>
      </nav>

      <header className="bg-white pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-20">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              La gestión de tu farmacia, <span className="text-brand-600">reimaginada</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Pharmacontrol unifica inventario, proveedores y reportes con inteligencia para que
              te enfoques en hacer crecer tu negocio. Más control, menos pérdida.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppLink
                to="/login"
                className="inline-flex items-center justify-center rounded-md bg-brand-600 px-5 py-3 font-semibold text-white shadow-soft hover:bg-brand-700"
              >
                Inicia Sesión
              </AppLink>
              <a
                className="inline-flex items-center justify-center rounded-md border border-brand-600 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
                href="#benefits"
              >
                Conocer más
              </a>
            </div>
          </div>

          <div className="hidden justify-center lg:flex" aria-hidden="true">
            <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-10 shadow-soft">
              <img src={logoPath} alt="" className="h-full max-h-72 w-full object-contain" />
            </div>
          </div>
        </div>
      </header>

      <section id="benefits" className="scroll-mt-20 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">Todo lo que necesitas en un solo lugar</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-700">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">Ahora integrado con Inteligencia Artificial</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-700">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center">
            <img
              src={mobileAppPath}
              alt="Vista previa de la app móvil Pharmacontrol"
              className="max-h-[520px] w-full max-w-md rounded-lg object-contain"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">Usa nuestra App Móvil</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Toda la potencia de Pharmacontrol en la palma de tu mano. Gestiona tu farmacia desde
              cualquier lugar.
            </p>
            <div className="mt-6 space-y-4">
              <FeatureLine icon={<Bell size={24} />} text="Recibe alertas en tiempo real sobre stock bajo o productos a punto de caducar directamente en tu móvil." />
              <FeatureLine icon={<CloudDownload size={24} />} text="Consulta y exporta tus reportes más importantes con solo unos toques, estés donde estés." />
            </div>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              <Play size={18} />
              Google Play
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <iframe
              title="Ubicación en Toluca"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92581.36457655233!2d-99.70450049136382!3d19.2814264330484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89892a50ebb9%3A0xad3f4ad5550208c4!2sToluca%20de%20Lerdo%2C%20M%C3%A9x.!5e1!3m2!1ses-419!2smx!4v1764112566200!5m2!1ses-419!2smx"
              width="100%"
              height="360"
              className="block border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-ink md:text-4xl">Contáctanos</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              ¿Tienes preguntas o quieres una demo? Escríbenos y te contactamos.
            </p>

            <div className="mt-5 space-y-2 text-slate-700">
              <p>
                <strong>Email:</strong>{' '}
                <a className="text-brand-700 hover:underline" href="mailto:pharmacontrolcc@gmail.com">
                  pharmacontrolcc@gmail.com
                </a>
              </p>
              <p>
                <strong>Teléfono:</strong>{' '}
                <a className="text-brand-700 hover:underline" href="tel:+527291270777">
                  +52 729 127 0777
                </a>
              </p>
            </div>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                name="hp"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Nombre</span>
                <input
                  name="name"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                  placeholder="Tu nombre"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Correo</span>
                <input
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                  placeholder="tu@correo.com"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Mensaje</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                  placeholder="Escribe tu mensaje"
                  required
                />
              </label>
              <button
                type="submit"
                className="rounded-md bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-ink pt-12 text-slate-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <FooterColumn title="Pharmacontrol">
            <p className="leading-7">
              La solución definitiva para la administración eficiente y moderna de farmacias.
              Desarrollado por Innovasoft.
            </p>
          </FooterColumn>
          <FooterColumn title="Secciones">
            <a className="block hover:text-white" href="#benefits">
              Beneficios
            </a>
            <a className="mt-2 block hover:text-white" href="#contact">
              Precios
            </a>
          </FooterColumn>
          <FooterColumn title="Contacto">
            <p className="flex items-center gap-3">
              <MapPin size={18} /> Toluca, MX
            </p>
            <p className="mt-2 flex items-center gap-3">
              <Mail size={18} /> jpina7722@gmail.com
            </p>
            <p className="mt-2 flex items-center gap-3">
              <Phone size={18} /> +52 729 127 0777
            </p>
          </FooterColumn>
        </div>
        <div className="bg-black/20 px-5 py-4 text-center text-sm">
          © {new Date().getFullYear()} Copyright:{' '}
          <a className="font-semibold text-white" href="#">
            Innovasoft
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureLine({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-brand-700">{icon}</div>
      <p className="leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function FooterColumn({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wide text-white">{title}</h3>
      <div className="mt-3 h-0.5 w-14 bg-brand-500" />
      <div className="mt-5 text-sm text-slate-300">{children}</div>
    </div>
  );
}
