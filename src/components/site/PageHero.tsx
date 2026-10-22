import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-44 pb-28 text-primary-foreground">
      <img src="/1-dark-1920.webp" srcSet="/1-dark-1000.webp 1000w, /1-dark-1920.webp 1920w" sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover object-top opacity-60 animate-slow-zoom" />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow text-silver animate-rise">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] md:text-7xl animate-rise" style={{ animationDelay: "120ms" }}>
          {title}
        </h1>
        {children && (
          <div className="mt-6 max-w-xl text-on-navy-muted animate-rise" style={{ animationDelay: "240ms" }}>
            {children}
          </div>
        )}
        <div className="silver-rule mt-12 w-40 animate-rise" style={{ animationDelay: "360ms" }} />
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, align = "left" }: { eyebrow: string; title: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="eyebrow text-navy-soft">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">{title}</h2>
    </div>
  );
}
