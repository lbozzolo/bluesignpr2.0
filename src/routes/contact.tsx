import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { PHONE, SHOW_PHONE, WHATSAPP_URL } from "@/lib/contact-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Blue Sign PR" },
      { name: "description", content: `Contact Blue Sign PR: 29 Howard Street, North Shields, UK.${SHOW_PHONE ? ` Phone ${PHONE.display},` : ""} email ceo@bluesignpr.com.` },
      { property: "og:title", content: "Contact — Blue Sign PR" },
      { property: "og:description", content: "Do you have any question? Get in touch with our consultants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const field =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors";

const contactItems = [
  { icon: MapPin, label: "Office", value: "29 Howard Street, North Shields\nTyne & Wear NE30 1AR — UK" },
  { icon: Phone, label: "Phone", value: PHONE.display, href: PHONE.href, hidden: !SHOW_PHONE },
  { icon: Mail, label: "Email", value: "ceo@bluesignpr.com", href: "mailto:ceo@bluesignpr.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Message us directly", href: WHATSAPP_URL, hidden: !SHOW_PHONE },
].filter((c) => !c.hidden);

type Status = "idle" | "sending" | "sent" | "error";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      // Handled by public/contact.php on the server.
      const res = await fetch("/contact.php", { method: "POST", body: new FormData(form) });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !data?.ok) throw new Error(`Contact form failed (${res.status})`);
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact Us" title={<>Do you have <em className="text-silver">any question?</em></>}>
        Our consultants will be pleased to assist you.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-12 lg:px-10">
        <Reveal className="space-y-10 lg:col-span-5">
          {contactItems.map((c) => (
            <div key={c.label} className="flex gap-6">
              <span className="flex size-12 shrink-0 items-center justify-center border border-primary/20 text-primary">
                <c.icon className="size-5" strokeWidth={1.3} />
              </span>
              <div>
                <p className="eyebrow text-navy-soft">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className="mt-2 block whitespace-pre-line text-lg text-foreground hover:text-primary">{c.value}</a>
                ) : (
                  <p className="mt-2 whitespace-pre-line text-lg text-foreground">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={150} className="bg-card p-10 shadow-card lg:col-span-7 md:p-14">
          <h2 className="text-4xl text-primary">Request a consultation</h2>
          <form onSubmit={submit} className="mt-10 grid gap-8 md:grid-cols-2">
            <input name="name" required placeholder="Full name" className={field} />
            <input name="email" type="email" required placeholder="Email address" className={field} />
            <input name="subject" placeholder="Subject" className={`${field} md:col-span-2`} />
            <textarea name="message" required rows={5} placeholder="How can we help you?" className={`${field} resize-none md:col-span-2`} />
            {/* Honeypot: hidden from people, bots fill it in and get rejected. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
            <div className="md:col-span-2">
              <Button type="submit" variant="navy" size="xl" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </Button>
              <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
                {status === "sent" && "Thank you — your message has been sent. We will be in touch shortly."}
                {status === "error" && (
                  <>Sorry, your message could not be sent. Please email us at <a href="mailto:info@bluesignpr.com" className="text-primary underline">info@bluesignpr.com</a>.</>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </section>

      <div className="h-[420px] w-full grayscale-[60%]">
        <iframe
          title="Blue Sign PR office"
          src="https://www.google.com/maps?q=29+Howard+Street,+North+Shields+NE30+1AR&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </>
  );
}
