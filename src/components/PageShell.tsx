import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";
import { CookieConsent } from "./CookieConsent";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Перейти к содержимому
      </a>
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </>
  );
}
