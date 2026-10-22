import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import imgBusiness from "@/assets/svc-business.jpg";
import imgInvest from "@/assets/svc-investments.jpg";
import imgCulture from "@/assets/svc-culture.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/PageHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blue Sign PR — Your International Consultancy Group" },
      { name: "description", content: "Professional advice through smart, educated and empathetic consultants. Over 15 years of experience across more than 20 countries." },
      { property: "og:title", content: "Blue Sign PR — Your International Consultancy Group" },
      { property: "og:description", content: "Business solutions, strategic investments and cultural management through an international network of consultants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const slides = [
  { title: "Our Professionals", text: "Professional advice through smart, educated and empathetic consultants." },
  { title: "Your Priority", text: "You are priority number one — we will find the best solution for you." },
];

const regions = ["United Kingdom", "USA", "Europe", "Canada", "Israel", "United Arab Emirates", "China", "India", "Africa", "Latin America"];

const featured = [
  { title: "Business Solutions", img: imgBusiness, text: "PR & events, marketing & sales, and establishing your company overseas." },
  { title: "Strategic Investments", img: imgInvest, text: "International finances, tax advice, special tax zones and regional development." },
  { title: "Cultural Management", img: imgCulture, text: "Art market & luxury, international exhibitions, collections and investments." },
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-deep text-primary-foreground">
        <img src="/1-dark-1920.webp" srcSet="/1-dark-1000.webp 1000w, /1-dark-1920.webp 1920w" sizes="100vw" alt="London skyline at dusk" className="absolute inset-0 h-full w-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10">
          <p className="eyebrow text-silver animate-rise">Blue Sign PR · International Consultancy</p>
          <div className="relative mt-6 h-[13rem] md:h-[15rem]">
            {slides.map((s, idx) => (
              <div
                key={s.title}
                className="absolute inset-0 transition-all duration-[1400ms] ease-out"
                style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? "none" : "translateY(14px)" }}
                aria-hidden={i !== idx}
              >
                <h1 className="text-6xl leading-[0.98] md:text-8xl">
                  {s.title.split(" ")[0]} <em className="text-silver italic">{s.title.split(" ")[1]}</em>
                </h1>
                <p className="mt-6 max-w-lg text-lg text-on-navy-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: "300ms" }}>
            <Button asChild variant="silver" size="xl">
              <Link to="/contact">Contact Us <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
          <div className="mt-16 flex items-center gap-3">
            {slides.map((s, idx) => (
              <button key={s.title} onClick={() => setI(idx)} aria-label={s.title} className="h-px w-14 bg-primary-foreground/25">
                <span className={`block h-px bg-silver transition-all duration-700 ${i === idx ? "w-full" : "w-0"}`} />
              </button>
            ))}
          </div>
        </div>
        <ArrowDown className="absolute bottom-8 left-1/2 size-4 -translate-x-1/2 animate-bounce text-silver" />
      </section>

      {/* Intro / About */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-5">
          <SectionTitle eyebrow="About Us" title={<>Your consultancy <em>group.</em></>} />
          <p className="mt-6 font-display text-2xl italic text-navy-soft">
            “Because the most important part of us, it is you.”
          </p>
        </Reveal>
        <Reveal className="space-y-6 text-[1.05rem] leading-relaxed text-muted-foreground lg:col-span-7" delay={150}>
          <p>
            <strong className="font-semibold text-primary">Blue Sign PR</strong> is a holding of different but complementary sectors,
            working through an international group of agents and corporations with more than 15 years of experience. Our presence
            spreads among more than 20 countries between the USA, Europe, Canada, Israel, the Emirates, China, India, Africa and Latin America.
          </p>
          <p>
            The client is one of the most important parts of our professional sector, and because of this, Blue Sign PR considers every
            client as part of its family.
          </p>
          <p>
            We offer our professional advice through smart, educated and empathetic consultants that will treat you and your company as
            priority number one — and will find the best solution for you.
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-navy-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-silver-line px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-10">
          {[
            ["15+", "Years of experience"],
            ["20+", "Countries of presence"],
            ["6", "Continents in our network"],
          ].map(([n, l], k) => (
            <Reveal key={l} delay={k * 120} className="px-6 py-14 text-center">
              <p className="font-display text-7xl text-silver">{n}</p>
              <p className="eyebrow mt-3 text-on-navy-muted">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="What we do" title="Expertise without borders" />
          <Button asChild variant="outlineNavy" size="xl">
            <Link to="/services">All services <ArrowRight /></Link>
          </Button>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((f, k) => (
            <Reveal key={f.title} delay={k * 140}>
              <Link to="/services" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
                  <img src={f.img} alt={f.title} loading="lazy" width={1280} height={896} className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-veil opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-primary-foreground">
                    <p className="eyebrow text-silver">0{k + 1}</p>
                    <h3 className="mt-2 text-3xl">{f.title}</h3>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm text-on-navy-muted opacity-0 transition-all duration-700 group-hover:max-h-32 group-hover:opacity-100">
                      {f.text}
                    </p>
                    <div className="silver-rule mt-5 w-12 transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Regions marquee */}
      <section className="overflow-hidden border-y border-border bg-secondary py-8">
        <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
          {[...regions, ...regions].map((r, k) => (
            <span key={k} className="flex items-center gap-14 font-display text-3xl italic text-primary/70">
              {r} <span className="size-1.5 rotate-45 bg-silver" />
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <Reveal>
          <p className="eyebrow text-navy-soft">Free consultation</p>
          <h2 className="mt-4 text-4xl text-primary md:text-6xl">Let us find the best solution for you.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="navy" size="xl"><Link to="/contact">Make an appointment</Link></Button>
            <Button asChild variant="outlineNavy" size="xl"><Link to="/team">Meet the team</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
