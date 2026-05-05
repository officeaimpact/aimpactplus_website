import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Публичная оферта",
  description:
    "Публичная оферта на оказание услуг ООО «ИИМПАКТ ПЛЮС» в области внедрения AI-решений для туризма.",
  path: "/offer",
});

export default function Offer() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Юридическое"
        title="Публичная оферта"
        description="Документ описывает условия оказания услуг по разработке и внедрению AI-решений для туристического бизнеса."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Оферта", href: "/offer" },
        ]}
      />

      <section className="section">
        <div className="prose-card mx-auto">
          <p className="text-sm font-bold text-muted">
            [draft — финальный текст согласовывается с юристом до запуска и
            заменяется отдельно от рекламных страниц.]
          </p>

          <h2>1. Стороны</h2>
          <p>
            {site.legalName}, ИНН {site.inn}, ОГРН {site.ogrn} (далее —
            Исполнитель), и любое юридическое или физическое лицо, принявшее
            условия настоящей оферты (далее — Заказчик).
          </p>

          <h2>2. Предмет</h2>
          <p>
            Исполнитель оказывает услуги по проектированию, разработке и
            внедрению AI-решений (ассистенты, виджеты, CRM-интеграции,
            аналитика, голосовые сценарии) для туристического бизнеса.
          </p>

          <h2>3. Стоимость и сроки</h2>
          <p>
            Стоимость услуг и сроки оказания согласовываются индивидуально для
            каждого проекта на основании технического задания и
            подписываемого договора.
          </p>

          <h2>4. Порядок акцепта</h2>
          <p>
            Акцептом оферты считается подписание сторонами договора в
            письменной форме на основании настоящих условий и направленных
            коммерческих предложений.
          </p>

          <h2>5. Контакты Исполнителя</h2>
          <p>
            {site.addressLegal}, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>, телефон{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
