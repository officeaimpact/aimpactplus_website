"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { navigation, site } from "@/lib/site-data";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all",
        scrolled
          ? "border-b border-blue-100/80 bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,82,204,0.06)]"
          : "bg-white/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-body transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            href={site.phoneHref}
            className="hidden text-sm font-semibold text-body transition hover:text-primary xl:inline-flex"
          >
            {site.phone}
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-blue-50 sm:inline-flex"
          >
            Обсудить проект
          </Link>
          <Link
            href="/contact?intent=demo"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-[var(--shadow-blue)] transition hover:-translate-y-0.5 hover:bg-primary-hover"
          >
            Демо
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 text-primary transition hover:border-primary hover:bg-blue-50 lg:hidden"
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
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-heading transition hover:bg-blue-50 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-2">
              <Link
                href="/contact"
                className="btn-secondary"
                onClick={() => setOpen(false)}
              >
                Обсудить проект
              </Link>
              <Link
                href="/contact?intent=demo"
                className="btn-primary"
                onClick={() => setOpen(false)}
              >
                Записаться на демо
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
