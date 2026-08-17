"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { ScrollReveal } from "./ScrollReveal";

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
];

export function Contact() {
  return (
    <section id="contact" className="section-pad pb-12">
      <div className="container-wide">
        <ScrollReveal>
          <p className="section-kicker mb-8">Contact</p>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <h2 className="display-type max-w-[980px] text-[clamp(4rem,12vw,12rem)]">
              Let the next folder be yours.
            </h2>

            <div className="grid gap-8">
              <p className="body-copy">
                Available for UI UX design, product visuals, 3D modeling, and portfolio-grade interaction systems.
              </p>
              <a href="mailto:hello@kunalkumar.design" className="magnetic-link" data-cursor="Email">
                hello@kunalkumar.design <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <footer className="mt-20 grid gap-8 border-t border-[var(--faint)] pt-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                data-cursor="Visit"
                className="font-[var(--font-mono)] text-xs text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="font-[var(--font-mono)] text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Kunal Kumar
          </p>
        </footer>
      </div>
    </section>
  );
}
