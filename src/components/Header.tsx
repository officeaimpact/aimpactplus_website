"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { headerNavigation, navigation, site } from "@/lib/site-data";
import { Logo } from "@/components/ui/Logo";
import { LeadFormModal } from "@/components/LeadFormModal";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  // Все страницы сайта начинаются с `.hero-shell` (тёмный градиент-секция).
  // Поэтому единая логика: пока пользователь на hero — хедер прозрачный, белый
  // логотип; как только проскроллил — хедер превращается в белый стеклянный,
  // логотип плавно превращается в синий.
  const tone: "dark" | "light" = scrolled ? "light" : "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [open]);

  const openModal = (source: string) => {
    track("lead_cta_click", { source });
    setModalOpen(true);
    setOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-tone={tone}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-blue-100/80 bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,82,204,0.06)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-5 sm:px-8 lg:h-[88px] lg:gap-6">
        <Logo />

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Основная навигация"
        >
          {headerNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-10 items-center whitespace-nowrap rounded-full px-2.5 text-[13px] font-semibold transition xl:px-3.5 xl:text-sm",
                  active
                    ? tone === "dark"
                      ? "text-white"
                      : "text-primary"
                    : tone === "dark"
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-body hover:bg-blue-50 hover:text-primary",
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
                      tone === "dark"
                        ? "bg-gradient-to-r from-white via-sky to-accent"
                        : "bg-gradient-to-r from-primary via-accent to-sky",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href={site.phoneHref}
            aria-label={`Позвонить ${site.phone}`}
            className={cn(
              "hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[13px] font-semibold transition md:inline-flex xl:px-3.5 xl:text-sm",
              tone === "dark"
                ? "text-white/90 hover:bg-white/10 hover:text-white"
                : "text-body hover:bg-blue-50 hover:text-primary",
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden xl:inline">{site.phone}</span>
          </Link>
          <Link
            href="/contact"
            className={cn(
              "hidden h-10 items-center whitespace-nowrap rounded-full border px-3.5 text-[13px] font-semibold transition sm:inline-flex xl:px-4 xl:text-sm",
              tone === "dark"
                ? "border-white/30 text-white hover:border-white hover:bg-white/10"
                : "border-blue-200 text-primary hover:border-primary hover:bg-blue-50",
            )}
          >
            Обсудить проект
          </Link>
          <button
            type="button"
            onClick={() => openModal("header")}
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3.5 text-[13px] font-bold text-white shadow-[var(--shadow-blue)] transition hover:-translate-y-0.5 hover:bg-primary-hover xl:px-4 xl:text-sm"
          >
            Демо
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border transition lg:hidden",
              tone === "dark"
                ? "border-white/30 text-white hover:border-white hover:bg-white/10"
                : "border-blue-100 text-primary hover:border-primary hover:bg-blue-50",
            )}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-xl transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "fixed inset-x-0 top-20 z-50 border-t border-blue-100 bg-white shadow-[0_24px_60px_rgba(0,82,204,0.18)] transition-transform duration-300",
            open ? "translate-y-0" : "-translate-y-4 opacity-0",
          )}
        >
          <nav
            className="mx-auto grid max-w-7xl gap-1 px-5 py-6 sm:px-8"
            aria-label="Мобильная навигация"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-semibold transition",
                    active
                      ? "bg-blue-50 text-primary"
                      : "text-heading hover:bg-blue-50 hover:text-primary",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 grid gap-2">
              <Link
                href={site.phoneHref}
                className="btn-outline"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
                onClick={() => setOpen(false)}
              >
                Обсудить проект
              </Link>
              <button
                type="button"
                onClick={() => openModal("mobile-drawer")}
                className="btn-primary"
              >
                Записаться на демо
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIntent="Запросить демо Навылет! AI"
      />
    </header>
  );
}
