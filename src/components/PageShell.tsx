import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA } from "./FloatingCTA";
import { CookieConsent } from "./CookieConsent";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#content" className="sr-only">
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
