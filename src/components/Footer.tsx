import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { footerLinks, site } from "@/lib/site-data";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_2fr]">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-md text-sm leading-7 text-blue-100">
            {site.description}
          </p>
          <div className="space-y-2.5 text-sm text-blue-100">
            <a
              className="flex items-center gap-2.5 transition hover:text-white"
              href={site.phoneHref}
            >
              <Phone className="h-4 w-4 text-sky" /> {site.phone}
            </a>
            <a
              className="flex items-center gap-2.5 transition hover:text-white"
              href={`mailto:${site.email}`}
            >
              <Mail className="h-4 w-4 text-sky" /> {site.email}
            </a>
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              {site.addressShort}
            </span>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Продукт" links={footerLinks.product} />
          <FooterColumn title="Знания" links={footerLinks.knowledge} />
          <FooterColumn title="Компания" links={footerLinks.company} />
          <FooterColumn title="Правовое" links={footerLinks.legal} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-blue-100/80 sm:px-8 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.legalName}. ИНН {site.inn}. ОГРН{" "}
            {site.ogrn}.
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 transition hover:text-white"
          >
            Обсудить AI-проект
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white/90">
        {title}
      </p>
      <ul className="space-y-3 text-sm text-blue-100">
        {links.map((link) => {
          const isExternal = /^https?:\/\//i.test(link.href);
          if (isExternal) {
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            );
          }
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-1.5 transition hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
