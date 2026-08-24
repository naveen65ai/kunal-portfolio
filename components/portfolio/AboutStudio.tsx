"use client";

import Image from "next/image";
import {
  PaintBrush,
  Cube,
  Layout,
  Sparkle,
  CheckCircle,
  Clock,
  Globe,
  Lightning,
} from "@phosphor-icons/react";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { soundManager } from "@/components/ui/SoundEffects";
import { LocalTimeBadge } from "./LocalTimeBadge";

const skillsGrid = [
  {
    icon: Layout,
    title: "Product & UI/UX Design",
    desc: "Information architecture, high-fidelity wireframes, rapid interactive Figma prototyping, and design systems.",
    tag: "Design Core",
    badge: "Figma Pro",
  },
  {
    icon: Cube,
    title: "3D Art & Spatial Visuals",
    desc: "Procedural shaders, raytraced hero illustrations, lightweight 3D assets, and spatial computing concepts.",
    tag: "Spatial 3D",
    badge: "Blender 4.2",
  },
  {
    icon: PaintBrush,
    title: "Brand Systems & Identity",
    desc: "Typography scales, kinetic logo systems, color architecture, and cross-platform visual brand standards.",
    tag: "Brand Identity",
    badge: "Vector & Motion",
  },
];

const tools = [
  "Figma",
  "Blender",
  "Cinema 4D",
  "Spline 3D",
  "After Effects",
  "Protopie",
  "Adobe Illustrator",
  "Adobe Photoshop",
];

export function AboutStudio() {
  return (
    <section id="about" className="about-studio" aria-labelledby="about-title">
      <div className="about-heading" data-reveal>
        <div className="about-heading-left">
          <div className="work-header-badge-row">
            <p className="hand-label">Hello, I&apos;m Kunal Kumar</p>
          </div>
          <h2 id="about-title">I make the useful unmissable.</h2>
        </div>
        <div className="about-heading-right">
          <p className="about-subtitle">
            Independent UI/UX Designer & 3D Artist based in India, collaborating with founders,
            high-growth startups, and visionary studios worldwide.
          </p>
        </div>
      </div>

      {/* Magic UI Bento Grid Layout */}
      <BentoGrid className="mb-12">
        {/* Bento 1: Studio Workbench Polaroid */}
        <div className="md:col-span-2 lg:col-span-2">
          <Card3DTilt maxTilt={5} scale={1.01} className="h-full">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-[var(--ink)] bg-[var(--white)] p-6 shadow-[var(--shadow-brutal)] h-full">
              <BorderBeam size={220} duration={14} colorFrom="#1762dc" colorTo="#ffc62f" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                <div className="relative h-64 w-full md:w-1/2 overflow-hidden rounded-2xl border-2 border-black/80 shadow-md">
                  <Image
                    src={processDesk}
                    alt="Illustrated design workbench with wireframes, color cards, and hand drawing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 760px) 90vw, 30vw"
                  />
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/80 px-2 py-1 text-[11px] font-mono font-bold text-amber-300 backdrop-blur-sm">
                    Studio Workbench · Sketch → Ship
                  </span>
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-black/80 bg-amber-100 px-2.5 py-0.5 text-xs font-mono font-bold text-black mb-3">
                    <Lightning size={14} weight="fill" className="text-amber-600" /> Design Philosophy
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-2">
                    High-Leverage Creative Direction
                  </h3>
                  <p className="text-sm font-medium text-[var(--ink)]/80 leading-relaxed mb-4">
                    I operate at the intersection of conversion-tested product design and expressive 3D art.
                    When you work with me, you get systematic design logic in the morning and raytraced caustics in the afternoon.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-black/30 bg-black/5 px-2.5 py-1 text-xs font-bold">
                      <CheckCircle size={13} weight="fill" className="text-emerald-600" /> Rapid 2-4 Week Sprints
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-black/30 bg-black/5 px-2.5 py-1 text-xs font-bold">
                      <CheckCircle size={13} weight="fill" className="text-emerald-600" /> 100% Production Tokens
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card3DTilt>
        </div>

        {/* Bento 2: Real-time India Radar / Time Badge */}
        <div className="md:col-span-1 lg:col-span-1">
          <BentoCard
            name="Worldwide Remote"
            description="Based in India (IST / UTC+5:30), seamlessly collaborating with clients across San Francisco, London, Berlin, and Singapore."
            tag="Global Availability"
            badge="Q2/Q3 Open"
            Icon={Globe}
          >
            <div className="flex flex-col gap-3 my-2">
              <LocalTimeBadge />
              <div className="flex items-center gap-2 rounded-xl border border-black/20 bg-emerald-50 p-3">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-bold text-emerald-950">
                  Accepting 2 new client sprints
                </span>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Bento 3: 3 Core Capabilities */}
        {skillsGrid.map((skill) => {
          const Icon = skill.icon;
          return (
            <BentoCard
              key={skill.title}
              name={skill.title}
              description={skill.desc}
              tag={skill.tag}
              badge={skill.badge}
              Icon={Icon}
              cta="Learn more in Estimator"
              href="#estimator"
            />
          );
        })}

        {/* Bento 4: Live Toolstack & Production Mastery (Full Width) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <BentoCard
            name="Production Toolstack & Mastery"
            description="Battle-tested design and 3D toolchain engineered for zero friction from wireframes to final production assets."
            tag="Creative Pipeline"
            badge="Core Suite"
            Icon={Sparkle}
          >
            <div className="flex flex-wrap gap-2.5 pt-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1.5 rounded-xl border-2 border-black/80 bg-[var(--paper)] px-3.5 py-1.5 text-xs font-bold text-[var(--ink)] shadow-[2px_2px_0px_#171515] transition-all hover:bg-[var(--yellow)] hover:-translate-y-0.5 cursor-pointer"
                  onClick={() => soundManager.playClick()}
                >
                  <CheckCircle size={14} weight="fill" className="text-emerald-600" />
                  {tool}
                </span>
              ))}
            </div>
          </BentoCard>
        </div>
      </BentoGrid>
    </section>
  );
}
