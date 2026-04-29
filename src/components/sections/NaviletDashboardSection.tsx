import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardValueMetrics from "@/components/dashboard/DashboardValueMetrics";
import DashboardAnalyticsShowcase from "@/components/dashboard/DashboardAnalyticsShowcase";
import DashboardConversationsShowcase from "@/components/dashboard/DashboardConversationsShowcase";
import DashboardWidgetShowcase from "@/components/dashboard/DashboardWidgetShowcase";
import DashboardBenefits from "@/components/dashboard/DashboardBenefits";
import DashboardCTA from "@/components/dashboard/DashboardCTA";

export function NaviletDashboardSection() {
  return (
    <section
      id="dashboard"
      aria-label="Личный кабинет Навылет! AI"
      className="relative isolate"
    >
      <DashboardHero />
      <DashboardValueMetrics />
      <DashboardAnalyticsShowcase />
      <DashboardConversationsShowcase />
      <DashboardWidgetShowcase />
      <DashboardBenefits />
      <DashboardCTA />
    </section>
  );
}
