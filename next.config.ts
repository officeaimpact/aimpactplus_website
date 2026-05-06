import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    // 301-редиректы со старых WordPress-URL после cut-over.
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/glavnaya", destination: "/", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/uslugi", destination: "/services", permanent: true },
      { source: "/cases.html", destination: "/cases", permanent: true },
      { source: "/keysy", destination: "/cases", permanent: true },
      { source: "/o-kompanii", destination: "/about", permanent: true },
      { source: "/kontakty", destination: "/contact", permanent: true },
      { source: "/navilet", destination: "/navilet-ai", permanent: true },
      // Навылет! AI больше не отдельный кейс, а наш продукт — старый
      // case-URL отправляем на страницу продукта (сохраняем уже накопленный SEO-вес).
      {
        source: "/cases/navilet-ai-product",
        destination: "/navilet-ai",
        permanent: true,
      },
      // Кейс «Мини-гостиница Delas» переименован в «Отель Delas» —
      // меняем slug на otel-delas, старый URL переадресуем (301).
      {
        source: "/cases/hostel-delas",
        destination: "/cases/otel-delas",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
