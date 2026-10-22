import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/fees")({
  head: () => ({
    meta: [
      { title: "Fees & Commissions — Blue Sign PR" },
      { name: "description", content: "Transparent exclusivity rates from one hour to twelve months, and project-based commissions from 3.5% to 25%." },
      { property: "og:title", content: "Fees & Commissions — Blue Sign PR" },
      { property: "og:description", content: "Exclusivity rates and project commissions for Blue Sign PR consultancy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeesPage,
});

const rates = [
  ["1 hour", "£250"],
  ["8 hours", "£1,050"],
  ["1 month", "£10,000"],
  ["6 months", "£50,000"],
  ["12 months", "£90,000"],
];

function FeesPage() {
  return (
    <>
      <PageHero eyebrow="Fees & Commissions" title={<>Clear terms, <em className="text-silver">exclusive dedication.</em></>} />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-28 lg:grid-cols-12 lg:px-10">
        <Reveal className="bg-card p-10 shadow-card lg:col-span-7 md:p-14">
          <p className="eyebrow text-navy-soft">Fees</p>
          <h2 className="mt-3 text-4xl text-primary">Exclusivity rates</h2>
          <ul className="mt-10">
            {rates.map(([p, v]) => (
              <li key={p} className="group flex items-baseline gap-4 border-b border-border py-5 last:border-0">
                <span className="text-lg text-foreground">{p}</span>
                <span className="mb-1 flex-1 border-b border-dotted border-primary/25" />
                <span className="font-display text-3xl text-primary transition-transform duration-500 group-hover:-translate-x-1">{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150} className="relative flex flex-col justify-between overflow-hidden bg-navy-gradient p-10 text-primary-foreground md:p-14 lg:col-span-5">
          <div className="grain absolute inset-0" />
          <div className="relative">
            <p className="eyebrow text-silver">Commissions</p>
            <h2 className="mt-3 text-4xl">Upon project & demand</h2>
            <p className="mt-12 font-display text-7xl text-silver">3.5%<span className="mx-3 text-4xl text-on-navy-muted">to</span>25%</p>
          </div>
          <div className="relative mt-14">
            <div className="silver-rule mb-8 opacity-50" />
            <p className="text-on-navy-muted">Now! Get a free consultation for your case.</p>
            <Button asChild variant="silver" size="xl" className="mt-6"><Link to="/contact">Make appointment</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
