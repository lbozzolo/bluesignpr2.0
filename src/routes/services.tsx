import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import imgBusiness from "@/assets/svc-business.jpg";
import imgInvest from "@/assets/svc-investments.jpg";
import imgCulture from "@/assets/svc-culture.jpg";
import { services } from "@/data/services";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Blue Sign PR" },
      { name: "description", content: "Business solutions, strategic investments, policy consultancy, cultural management, VIP services and national development." },
      { property: "og:title", content: "Services — Blue Sign PR" },
      { property: "og:description", content: "Six areas of international consultancy delivered through our global network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const details = [
  {
    img: imgBusiness,
    eyebrow: "Business Solutions",
    title: "Define your identity. Expand your brand.",
    body: "Blue Sign PR assists you in defining your identity as a company and helps you find the best market niche for you and your products, developing strategies to expand your brand and settle in the field you want, internationally.",
  },
  {
    img: imgInvest,
    eyebrow: "Strategic Investments",
    title: "Invest at the right time, in the right place.",
    body: "We research and analyse the best options among our international network to assist you in resolving issues after your investment, and give you professional advice through the most important questions: When is the best time to invest? Where is the best country or field? How to invest in a safe and smart way? We can also help you settle in one of the best European tax zones — even without moving your company.",
  },
  {
    img: imgCulture,
    eyebrow: "Cultural Management",
    title: "Art, culture and luxury as opportunity.",
    body: "Blue Sign PR understands the importance of the Art Market and Culture sector today. We help you understand the projection of your product or demand in these sectors and guide you to turn weaknesses into strengths — faster than you expected — thanks to our agents specialised in Public Relations, Institutional Relations, Marketing, Design and Sales.",
  },
];

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Six disciplines, <em className="text-silver">one partner.</em></>}>
        Integrated consultancy for companies, investors and institutions operating across borders.
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, k) => (
            <Reveal key={s.title} delay={(k % 3) * 120} className="group relative bg-background p-10 transition-colors duration-700 hover:bg-navy">
              <s.icon className="size-7 text-navy-soft transition-colors duration-700 group-hover:text-silver" strokeWidth={1.2} />
              <p className="eyebrow mt-8 text-muted-foreground group-hover:text-on-navy-muted">0{k + 1}</p>
              <h3 className="mt-2 text-3xl text-primary transition-colors duration-700 group-hover:text-primary-foreground">{s.title}</h3>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground transition-colors duration-700 group-hover:text-on-navy-muted">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-3"><span className="h-px w-3 bg-silver" />{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-10">
        {details.map((d, k) => (
          <div key={d.eyebrow} className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <Reveal className={k % 2 ? "lg:order-2" : ""}>
              <div className="relative">
                <img src={d.img} alt={d.eyebrow} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover shadow-card" />
                <div className={`absolute -bottom-5 h-24 w-24 border border-primary/30 ${k % 2 ? "-left-5" : "-right-5"}`} />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <SectionTitle eyebrow={d.eyebrow} title={d.title} />
              <p className="mt-6 leading-relaxed text-muted-foreground">{d.body}</p>
            </Reveal>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <h2 className="text-4xl text-primary md:text-5xl">Discuss your project with us.</h2>
          <Button asChild variant="navy" size="xl" className="mt-10"><Link to="/contact">Contact us <ArrowRight /></Link></Button>
        </Reveal>
      </section>
    </>
  );
}
