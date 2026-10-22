import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/team", label: "Team" },
  { to: "/services", label: "Services" },
  { to: "/fees", label: "Fees & Commissions" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/92 py-2 shadow-elegant backdrop-blur-md"
          : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center" aria-label="Blue Sign PR home">
          <span
            className={cn(
              "flex items-center bg-card px-3 py-1 transition-all duration-500",
              scrolled ? "shadow-none" : "shadow-elegant",
            )}
          >
            <img src="/bluesignpr-logo.webp" alt="Blue Sign PR" className="h-14 w-auto object-contain" />
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className={cn(
                "group relative eyebrow py-2 transition-colors",
                scrolled ? "text-foreground/75 hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground",
              )}
              activeProps={{ className: scrolled ? "!text-primary" : "!text-primary-foreground" }}
            >
              {({ isActive }) => (
                <>
                  {n.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-silver transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </>
              )}
            </Link>
          ))}
          <Button asChild variant={scrolled ? "navy" : "outlineLight"} size="lg">
            <Link to="/contact">Consultation</Link>
          </Button>
        </nav>

        <button
          className={cn("lg:hidden", scrolled ? "text-primary" : "text-primary-foreground")}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="animate-rise border-t border-border bg-background px-6 py-6 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="block py-3 eyebrow text-foreground/80">
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
