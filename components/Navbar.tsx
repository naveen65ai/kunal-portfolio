"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "3D", href: "#3d-works" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > lastScroll && latest > 140);
    setLastScroll(latest);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -22, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
      >
        <nav className="container-wide mt-4 flex h-14 items-center justify-between border border-[var(--faint)] bg-[var(--nav)] px-3 backdrop-blur-xl">
          <a
            href="#"
            data-cursor="Home"
            className="px-2 font-[var(--font-mono)] text-[0.78rem] font-semibold tracking-[0.08em]"
          >
            KUNAL
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="Go"
                className="font-[var(--font-mono)] text-[0.72rem] font-medium text-[var(--muted)] transition-colors duration-200 hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              data-cursor="Mail"
              className="hidden h-9 items-center gap-2 bg-[var(--ink)] px-4 font-[var(--font-mono)] text-[0.72rem] font-medium text-[var(--paper)] transition-transform duration-200 hover:-translate-y-0.5 sm:flex"
            >
              Talk <ArrowUpRight size={13} weight="bold" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-cursor="Menu"
              className="flex h-9 w-9 items-center justify-center border border-[var(--faint)] text-[var(--ink)] md:hidden"
              aria-label="Open navigation"
            >
              <List size={18} weight="bold" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-[var(--paper)]/95 p-6 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center border border-[var(--faint)]"
              aria-label="Close navigation"
            >
              <X size={18} weight="bold" />
            </button>

            <nav className="grid gap-5 text-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="display-type text-[clamp(3rem,16vw,6rem)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
