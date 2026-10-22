import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { departments, type Member } from "@/data/team";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Blue Sign PR" },
      { name: "description", content: "Meet the Blue Sign PR consultants: administration, marketing, finances, IT and institutional relations across Europe, the Americas, Africa, Asia and the Arab world." },
      { property: "og:title", content: "Our Team — Blue Sign PR" },
      { property: "og:description", content: "An international network of senior consultants and institutional relations experts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

function TeamPage() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <>
      <PageHero eyebrow="Our Team" title={<>The people behind <em className="text-silver">every solution.</em></>}>
        An international network of senior professionals, diplomats and experts serving our clients in more than 20 countries.
      </PageHero>

      <nav className="sticky top-[68px] z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-4 lg:px-10">
          {departments.map((d) => (
            <a key={d.name} href={`#${slug(d.name)}`} className="eyebrow shrink-0 text-muted-foreground transition-colors hover:text-primary">
              {d.name.replace(" Department", "")}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        {departments.map((d, di) => (
          <section key={d.name} id={slug(d.name)} className="scroll-mt-40 pt-24">
            <Reveal className="flex items-baseline gap-6">
              <span className="font-display text-5xl text-silver">{String(di + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <h2 className="text-4xl text-primary md:text-5xl">{d.name}</h2>
                <div className="silver-rule mt-5 opacity-70" />
              </div>
            </Reveal>

            {d.groups.map((g, gi) => (
              <div key={gi} className="mt-12">
                {g.region && (
                  <Reveal className="mb-8 flex items-center gap-4">
                    <span className="size-1.5 rotate-45 bg-primary" />
                    <p className="eyebrow text-navy-soft">{g.region}</p>
                  </Reveal>
                )}
                <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                  {g.members.map((m, k) => (
                    <Reveal key={m.name + m.role} delay={(k % 4) * 110}>
                      <MemberCard m={m} onOpen={() => setActive(m)} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-none border-0 p-0 sm:max-w-3xl">
          {active && (
            <div className="grid md:grid-cols-5">
              <div className="relative bg-navy-gradient md:col-span-2">
                <img src={active.photo} alt={active.name} className="h-72 w-full scale-[1.06] object-cover md:h-full" />
                <div className="absolute inset-0 shadow-[inset_0_0_0_1px_var(--silver-line)]" />
              </div>
              <div className="p-8 md:col-span-3 md:p-10">
                <p className="eyebrow text-navy-soft">{active.role}</p>
                <DialogTitle className="mt-3 font-display text-4xl font-medium text-primary">{active.name}</DialogTitle>
                <div className="silver-rule my-6 w-24" />
                <DialogDescription className="text-[0.95rem] leading-relaxed text-muted-foreground">{active.bio}</DialogDescription>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function MemberCard({ m, onOpen }: { m: Member; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group block w-full text-left">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-gradient shadow-card">
        <img
          src={m.photo}
          alt={m.name}
          loading="lazy"
          className="h-full w-full scale-[1.06] object-cover grayscale-[35%] transition-all duration-[1200ms] ease-out group-hover:scale-[1.1] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy/10 to-transparent" />
        <div className="absolute inset-3 border border-silver-line transition-all duration-700 group-hover:inset-2" />
        <span className="glass-shine absolute right-5 bottom-5 flex size-10 items-center justify-center border border-silver-line text-primary-foreground backdrop-blur-sm">
          <Plus className="size-4 transition-transform duration-500 group-hover:rotate-90" />
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl leading-tight text-primary">{m.name}</h3>
        <p className="eyebrow mt-2 text-muted-foreground">{m.role}</p>
        <div className="mt-4 h-px w-10 bg-primary transition-all duration-700 group-hover:w-24" />
      </div>
    </button>
  );
}
