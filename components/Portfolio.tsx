"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  List,
  X,
} from "@phosphor-icons/react";

const ease = [0.19, 1, 0.22, 1] as const;

function resetScrollToTop() {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousBehavior;
}

const archiveFolders = [
  {
    id: "product",
    code: "01",
    title: "Product design",
    count: "03 projects",
    projects: [
      {
        title: "City after dark",
        meta: "Mobile experience / 2026",
        image: "/images/culture-ui.png",
        alt: "Editorial mobile interface concepts on an oxblood studio surface",
      },
      {
        title: "Creator workspace",
        meta: "Product system / 2025",
        image: "/images/hero-sculpture.png",
        alt: "Metallic folded form used as a visual identity study",
      },
      {
        title: "Spatial commerce",
        meta: "Web experience / 2025",
        image: "/images/modular-object.png",
        alt: "Modular ivory and steel object study",
      },
    ],
  },
  {
    id: "objects",
    code: "02",
    title: "3D objects",
    count: "03 projects",
    projects: [
      {
        title: "Mono object 01",
        meta: "Form study / 2026",
        image: "/images/modular-object.png",
        alt: "Modular ivory ceramic object with a polished steel core",
      },
      {
        title: "Glass & chrome",
        meta: "Material study / 2026",
        image: "/images/hero-sculpture.png",
        alt: "Brushed metal ribbon around translucent oxblood glass",
      },
      {
        title: "Soft machinery",
        meta: "Lighting study / 2025",
        image: "/images/culture-ui.png",
        alt: "Interface screens arranged as an art-directed lighting study",
      },
    ],
  },
  {
    id: "motion",
    code: "03",
    title: "Motion studies",
    count: "03 projects",
    projects: [
      {
        title: "Fold / unfold",
        meta: "Motion language / 2025",
        image: "/images/hero-sculpture.png",
        alt: "Folded metallic ribbon motion study",
      },
      {
        title: "Interface choreography",
        meta: "Prototype / 2026",
        image: "/images/culture-ui.png",
        alt: "Mobile interface screens used for interaction choreography",
      },
      {
        title: "Material transitions",
        meta: "Simulation / 2025",
        image: "/images/modular-object.png",
        alt: "Ceramic and chrome material transition study",
      },
    ],
  },
] as const;

const process = [
  ["01", "Frame", "Define the audience, tension, and single feeling the work should leave behind."],
  ["02", "Shape", "Build flows, forms, and visual rules together so function and atmosphere agree."],
  ["03", "Move", "Prototype transitions early. Motion explains hierarchy, weight, and cause."],
  ["04", "Finish", "Refine materials, edge cases, responsive behavior, and the handoff."],
] as const;

function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    resetScrollToTop();

    if (reduce) {
      const short = window.setTimeout(onDone, 80);
      return () => window.clearTimeout(short);
    }

    document.body.classList.add("intro-lock");
    const openTimer = window.setTimeout(() => setOpen(true), 420);
    const closeTimer = window.setTimeout(onDone, 2050);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
      document.body.classList.remove("intro-lock");
    };
  }, [onDone, reduce]);

  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease } }}
      aria-label="Opening portfolio"
    >
      <div className="intro-meta">
        <span>Kunal Kumar</span>
        <span>Portfolio / 2026</span>
      </div>

      <div className={`intro-folder ${open ? "is-open" : ""}`} aria-hidden="true">
        <div className="intro-folder-back">
          <span className="intro-tab">Selected work</span>
        </div>
        <motion.div
          className="intro-sheet"
          animate={{ y: open ? "-58%" : "8%", rotate: open ? -2 : 0 }}
          transition={{ duration: 1, ease }}
        >
          <span>UI / UX</span>
          <strong>Design with<br />depth.</strong>
          <span>3D / Motion</span>
        </motion.div>
        <motion.div
          className="intro-folder-front"
          animate={{ rotateX: open ? -72 : 0, y: open ? 42 : 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <span>KK—001</span>
        </motion.div>
      </div>

      <button type="button" className="intro-skip" onClick={onDone}>
        Skip intro
      </button>
    </motion.div>
  );
}

function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(latest > lastScroll && latest > 180);
    setLastScroll(latest);
  });

  const links = [
    ["Profile", "#profile"],
    ["Work", "#work"],
    ["Process", "#process"],
  ];

  return (
    <>
      <motion.header
        className="site-header"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="wordmark" href="#top" data-cursor="Home">KUNAL®</a>
          <div className="nav-center">
            {links.map(([label, href]) => (
              <a key={href} href={href} data-cursor="Go">{label}</a>
            ))}
          </div>
          <a className="nav-contact" href="mailto:hello@kunalkumar.design" data-cursor="Email">
            Let’s talk <ArrowUpRight size={14} weight="bold" />
          </a>
          <button
            className="nav-menu"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <List size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease }}
          >
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
            <nav>
              {[...links, ["Contact", "#contact"]].map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero" id="top">
      <div className="hero-topline">
        <span>Independent designer</span>
        <span>UI / UX · 3D · Motion</span>
        <span>Working worldwide</span>
      </div>

      <h1 className="hero-title" aria-label="Digital ideas shaped with depth">
        <motion.span
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.15, duration: 1, ease }}
        >
          Digital ideas
        </motion.span>
        <motion.span
          className="hero-title-row"
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease }}
        >
          shaped <i>with</i>
          <span className="hero-inline-image">
            <Image src="/images/hero-sculpture.png" alt="" fill priority sizes="26vw" />
          </span>
        </motion.span>
        <motion.span
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease }}
        >
          depth.
        </motion.span>
      </h1>

      <motion.div
        className="hero-foot"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p>
          I’m Kunal, a UI/UX designer and 3D artist creating products, visual systems,
          and digital objects that feel clear in use and memorable in motion.
        </p>
        <a href="#work" className="round-link" data-cursor="Explore">
          <ArrowDownRight size={22} />
          <span>Open<br />the work</span>
        </a>
      </motion.div>
    </section>
  );
}

function Profile() {
  return (
    <section id="profile" className="profile section-shell">
      <Reveal className="section-index"><span>01</span><span>Profile</span></Reveal>
      <Reveal>
        <p className="profile-statement">
          I work where interface
          <span className="inline-art inline-art-ui"><Image src="/images/culture-ui.png" alt="" fill sizes="13vw" /></span>
          meets image, form
          <span className="inline-art inline-art-object"><Image src="/images/modular-object.png" alt="" fill sizes="13vw" /></span>
          and motion—turning complex ideas into visual experiences people can feel.
        </p>
      </Reveal>
      <div className="profile-grid">
        <Reveal>
          <p className="eyebrow">What I do</p>
          <ul className="capability-list">
            <li>Product & UI design</li>
            <li>User experience & prototyping</li>
            <li>3D modeling & rendering</li>
            <li>Motion & interaction direction</li>
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow">Point of view</p>
          <p className="profile-copy">
            A useful product can still have atmosphere. A striking image can still explain something.
            I build both sides together, using systems for clarity and 3D for character.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveFolder({
  folder,
  open,
  onToggle,
  onOpen,
}: {
  folder: (typeof archiveFolders)[number];
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const cardTransforms = [
    { x: "-110%", y: "-100%", rotate: -12, scale: 0.95 },
    { x: "-50%", y: "-120%", rotate: 0, scale: 1 },
    { x: "10%", y: "-100%", rotate: 12, scale: 0.95 },
  ] as const;

  return (
    <motion.article
      className={`archive-folder archive-folder-${folder.id} ${open ? "is-open" : ""}`}
      onMouseEnter={onOpen}
      onMouseLeave={onToggle}
    >
      <button
        className="archive-folder-trigger"
        type="button"
        onClick={onToggle}
        onFocus={onOpen}
        aria-expanded={open}
        data-cursor={open ? "Close" : "Open"}
      >
        <div className="archive-folder-back" aria-hidden="true" />

        <div className="archive-card-stack">
          {folder.projects.map((project, index) => (
            <motion.div
              className={`archive-card archive-card-${index + 1}`}
              key={project.title}
              initial={false}
              animate={
                open
                  ? { ...(cardTransforms[index] ?? cardTransforms[1]), opacity: 1 }
                  : { x: "-50%", y: "20%", rotate: 0, scale: 0.75, opacity: 0 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : open
                    ? {
                        type: "spring",
                        stiffness: 220,
                        damping: 22,
                        mass: 0.8,
                        delay: index * 0.05,
                      }
                    : {
                        duration: 0.35,
                        delay: (folder.projects.length - 1 - index) * 0.03,
                        ease,
                      }
              }
            >
              <div className="archive-card-image">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 700px) 55vw, 22vw"
                />
              </div>
              <div className="archive-card-copy">
                <strong>{project.title}</strong>
                <span>{project.meta}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="archive-folder-front"
          aria-hidden="true"
          initial={false}
          animate={open ? { rotateX: -45, y: 15 } : { rotateX: 0, y: 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 25 }}
        />
        <motion.div
          className="archive-folder-label"
          initial={false}
          animate={open ? { rotateX: -45, y: 15 } : { rotateX: 0, y: 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 25 }}
        >
          <span>{folder.code}</span>
          <h3>{folder.title}</h3>
          <span>{folder.count}</span>
        </motion.div>
      </button>
    </motion.article>
  );
}

function Work() {
  const [activeFolder, setActiveFolder] = useState<string>("");

  return (
    <section id="work" className="work">
      <div className="work-frame">
        <Reveal className="section-index work-index"><span>02</span><span>Selected work</span></Reveal>
        <Reveal className="work-heading">
          <div>
            <p className="eyebrow">Project library / 2025—26</p>
            <h2>Three practices.<br />One archive.</h2>
          </div>
          <p>Hover a folder to reveal the projects inside. Moving to another folder closes the last one.</p>
        </Reveal>

        <div className="folder-library" onMouseLeave={() => setActiveFolder("")}>
          <div className="archive-ghost-title" aria-hidden="true">Selected<br />projects</div>
          {archiveFolders.map((folder) => (
            <ArchiveFolder
              key={folder.id}
              folder={folder}
              open={activeFolder === folder.id}
              onToggle={() => setActiveFolder(activeFolder === folder.id ? "" : folder.id)}
              onOpen={() => setActiveFolder(folder.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ObjectFeature() {
  return (
    <section className="object-feature" aria-label="3D practice feature">
      <div className="object-feature-image">
        <Image src="/images/hero-sculpture.png" alt="Brushed steel ribbon encircling an oxblood glass form" fill sizes="100vw" />
      </div>
      <Reveal className="object-caption">
        <span>03 / 3D practice</span>
        <h2>Light is part<br />of the interface.</h2>
        <p>Modeling form, material, and movement as one visual system.</p>
      </Reveal>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="process section-shell">
      <Reveal className="section-index"><span>04</span><span>Process</span></Reveal>
      <div className="process-layout">
        <Reveal>
          <h2>From first tension<br /><i>to final detail.</i></h2>
        </Reveal>
        <div className="process-list">
          {process.map(([number, title, description], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-meta"><span>Have a project?</span><span>Available for selected collaborations</span></div>
      <Reveal>
        <a className="contact-title" href="mailto:hello@kunalkumar.design" data-cursor="Email">
          Let’s make<br /><i>something real.</i>
          <ArrowUpRight weight="thin" />
        </a>
      </Reveal>
      <footer>
        <a href="mailto:hello@kunalkumar.design">hello@kunalkumar.design</a>
        <span>UI / UX · 3D · Motion</span>
        <span>© {new Date().getFullYear()} Kunal Kumar</span>
      </footer>
    </section>
  );
}

export function Portfolio() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    resetScrollToTop();
    const frame = window.requestAnimationFrame(resetScrollToTop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  const finishIntro = () => {
    resetScrollToTop();
    document.body.classList.remove("intro-lock");
    setIntroVisible(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <AnimatePresence>{introVisible && <Intro onDone={finishIntro} />}</AnimatePresence>
      <Navigation />
      <main id="main-content">
        <Hero />
        <div className="ticker" aria-hidden="true">
          <div>
            {[0, 1].map((set) => (
              <span key={set}>UI / UX DESIGN <Asterisk weight="fill" /> 3D MODELING <Asterisk weight="fill" /> MOTION DIRECTION <Asterisk weight="fill" /> </span>
            ))}
          </div>
        </div>
        <Profile />
        <Work />
        <ObjectFeature />
        <Process />
        <Contact />
      </main>
    </>
  );
}
