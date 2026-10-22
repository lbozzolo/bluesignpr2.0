import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PHONE, SHOW_PHONE } from "@/lib/contact-info";

export function SiteFooter() {
  return (
    <footer className="relative bg-navy-gradient text-primary-foreground">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="inline-block bg-card px-4 py-2">
              <img src="/bluesignpr-logo.webp" alt="Blue Sign PR" className="h-16 w-auto" loading="lazy" />
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-on-navy-muted">
              Your consultancy group. Because the most important part of us, it is you.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-silver">Navigate</p>
            <ul className="mt-5 space-y-3 text-sm text-on-navy-muted">
              <li><Link to="/" className="hover:text-primary-foreground">Home</Link></li>
              <li><Link to="/team" className="hover:text-primary-foreground">Team</Link></li>
              <li><Link to="/services" className="hover:text-primary-foreground">Services</Link></li>
              <li><Link to="/fees" className="hover:text-primary-foreground">Fees & Commissions</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground">Contact</Link></li>
            </ul>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow text-silver">London Office</p>
            <ul className="mt-5 space-y-4 text-sm text-on-navy-muted">
              <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0" />29 Howard Street, North Shields, Tyne & Wear NE30 1AR — UK</li>
              {SHOW_PHONE && (
                <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0" /><a href={PHONE.href} className="hover:text-primary-foreground">{PHONE.display}</a></li>
              )}
              <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0" /><a href="mailto:ceo@bluesignpr.com" className="hover:text-primary-foreground">ceo@bluesignpr.com</a></li>
            </ul>
          </div>
        </div>

        <div className="silver-rule mt-16 opacity-40" />
        <div className="flex flex-col items-center gap-4 py-10">
          <p className="eyebrow text-on-navy-muted">Official representative of</p>
          <img src="/images/al-qassimi.webp" alt="The Private Office of H.H. Sheikh Ahmed Bin Faisal Al Qassimi" className="h-28 w-auto" loading="lazy" />
        </div>
        <div className="silver-rule opacity-40" />
        <p className="pt-8 text-center text-xs text-on-navy-muted">
          © {new Date().getFullYear()} Blue Sign PR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
