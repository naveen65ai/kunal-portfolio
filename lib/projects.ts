import type { StaticImageData } from "next/image";
import cultureSignal from "@/public/images/culture-signal-illustrated-v2.png";
import matterMotion from "@/public/images/matter-motion-illustrated-v2.png";
import modularFutures from "@/public/images/modular-futures-illustrated-v2.png";
import ribbonStudy from "@/public/images/ribbon-study-illustrated-v2.png";
import formStudy from "@/public/images/form-study-illustrated-v2.png";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";

export interface CaseStudySection {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  deliverables?: string[];
  image?: StaticImageData | string;
  imageAlt?: string;
  caption?: string;
}

export interface ProjectData {
  slug: string;
  index: string;
  title: string;
  category: "product" | "3d" | "brand";
  categoryLabel: string;
  tagline: string;
  client: string;
  year: string;
  duration: string;
  role: string;
  heroImage: StaticImageData;
  alt: string;
  accentColor: string;
  featured: boolean; // Displayed in homepage top 4
  disciplines: string[];
  tools: string[];
  overview: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  sections: CaseStudySection[];
}

export const projects: ProjectData[] = [
  {
    slug: "culture-after-dark",
    index: "01",
    title: "Culture After Dark",
    category: "product",
    categoryLabel: "Product & UI/UX Direction",
    tagline: "A nocturnal discovery app built around atmosphere, instant curation, and urban vibes.",
    client: "Nocturne Labs",
    year: "2026",
    duration: "4 Weeks Sprint",
    role: "Lead Product & UI/UX Designer",
    heroImage: cultureSignal,
    alt: "Three hand-painted nightlife discovery interfaces arranged on a cobalt workbench",
    accentColor: "var(--cobalt)",
    featured: true,
    disciplines: ["Mobile Product UX", "Tactile UI Design", "Micro-Interactions", "Design Tokens"],
    tools: ["Figma", "Protopie", "Cinema 4D", "Adobe Illustrator"],
    overview:
      "A nightlife and cultural discovery platform designed to replace cluttered spreadsheet-like maps with atmosphere-first micro-recommendations and live crowd pulses.",
    challenge:
      "Traditional event discovery platforms overwhelm users with endless text lists and date pickers. Nocturne Labs needed a sensory-driven interface that matches the user's immediate mood, sonic taste, and visual aesthetic after sunset.",
    solution:
      "Architected a tactile dark-mode UI utilizing glassmorphic widget sheets, mood-spectrum navigation cards, live venue pulse meters, and a frictionless 2-tap ticket reservation flow.",
    outcomes: [
      "Designed an end-to-end iOS & Android design system with 140+ reusable components",
      "Built high-fidelity interactive Protopie micro-interaction prototypes for investor demos",
      "Established production-ready design tokens and multi-theme color architectures",
      "Delivered complete handoff documentation for cross-functional engineering teams",
    ],
    sections: [
      {
        title: "The Problem & Discovery",
        subtitle: "Why event apps feel broken",
        paragraphs: [
          "When users are deciding where to spend their evening, they care about vibe, crowd density, and music genre far more than generic venue descriptions. Existing discovery apps look like corporate databases.",
          "We conducted user interviews across 18 nightlife enthusiasts in New York and Berlin to identify the critical friction points: decision paralysis, outdated event info, and awkward checkout forms.",
        ],
        deliverables: [
          "User Persona & Archetype Maps",
          "Comparative Interaction Audit",
          "Low-Fidelity Information Hierarchy Wireframes",
        ],
      },
      {
        title: "Visual Direction & Sensory UI",
        subtitle: "Atmosphere-first navigation",
        paragraphs: [
          "The visual language was built around deep nocturnal blues, neon amber accents, and tactile elevated surfaces. Each venue card displays a live crowd wave meter and ambient audio sample player.",
          "Custom iconography and typography scales were tested to ensure extreme clarity under low ambient screen brightness.",
        ],
        deliverables: [
          "Mood-Spectrum Navigation Framework",
          "Custom Nocturnal Icon System",
          "Figma Component Library with Interactive Variants",
        ],
      },
      {
        title: "Deliverables & Production Assets",
        subtitle: "Built for immediate execution",
        paragraphs: [
          "All layouts were structured in Figma with auto-layout 5.0, standardized 8pt spacing tokens, semantic color variables, and interactive spring prototypes.",
        ],
        deliverables: [
          "Complete Figma Master File (140+ components)",
          "Interactive Protopie Motion Demos",
          "Exported Vector Graphics & Asset Library",
        ],
      },
    ],
  },
  {
    slug: "matter-in-motion",
    index: "02",
    title: "Matter in Motion",
    category: "3d",
    categoryLabel: "3D Art & Material Systems",
    tagline: "A physical-digital material exploration where glass, chrome, color, and motion collide.",
    client: "Studio Hyperchroma",
    year: "2026",
    duration: "3 Weeks",
    role: "3D Visual Artist & Art Director",
    heroImage: matterMotion,
    alt: "Illustrated coral and chrome ribbon sculpture moving through a yellow ring",
    accentColor: "var(--orange)",
    featured: true,
    disciplines: ["3D Spatial Sculptures", "Procedural Shader Materials", "Key Visuals", "Motion Direction"],
    tools: ["Blender", "Cinema 4D", "Redshift", "After Effects"],
    overview:
      "A comprehensive procedural 3D visual language and key-visual suite exploring how tactile materials behave when freed from physical gravity.",
    challenge:
      "Most digital 3D brands feel either hyper-sterile or overly generic. Hyperchroma needed a bold, signature visual language for their global spatial brand launch across web, spatial computing, and digital billboards.",
    solution:
      "Engineered custom shader materials mimicking chromatic glass, spun chrome ribbons, and liquid iridescent plastics with raytraced lighting and dynamic loop animations.",
    outcomes: [
      "Crafted 12 high-resolution spatial key visual masterworks",
      "Rendered seamless 60fps 4K motion loops for global campaign rollouts",
      "Engineered web-optimized 3D models with lightweight polygon budgets",
      "Delivered full art direction guidelines with color palettes and camera framing rules",
    ],
    sections: [
      {
        title: "Concept & Material Exploration",
        subtitle: "Challenging digital sterility",
        paragraphs: [
          "The project started with physical material studies: borosilicate glass, liquid mercury, spun anodized titanium, and translucent silicone. We wanted 3D forms that felt warm, tactile, and curiously alive.",
          "Dozens of procedural noise shaders were developed in Cinema 4D and Redshift to create custom chromatic aberration and realistic internal light scattering.",
        ],
      },
      {
        title: "Motion Choreography",
        subtitle: "Fluidity without gravity",
        paragraphs: [
          "Each sculpture follows mathematically tuned kinetic rhythms, creating meditative, hypnotic loops optimized for infinite playback on marketing hero headers and spatial displays.",
        ],
      },
    ],
  },
  {
    slug: "modular-futures",
    index: "03",
    title: "Modular Futures",
    category: "brand",
    categoryLabel: "Brand Identity & Spatial Architecture",
    tagline: "An editorial identity system designed to look as sharp in print as it does in 3D visuals.",
    client: "Nexus Arch Group",
    year: "2026",
    duration: "5 Weeks",
    role: "Brand Identity Lead & Creative Director",
    heroImage: modularFutures,
    alt: "Editorial poster layout with modular typography and isometric architectural sketches",
    accentColor: "var(--green)",
    featured: true,
    disciplines: ["Brand Identity Architecture", "Typography Systems", "Spatial Layouts", "Print & Digital Guidelines"],
    tools: ["Figma", "Adobe Illustrator", "Cinema 4D", "After Effects"],
    overview:
      "A comprehensive brand overhaul for an architectural collective bridging physical high-density cities with digital spatial realities.",
    challenge:
      "Nexus had grown from a boutique architectural studio into an international multidisciplinary practice, but their legacy brand identity was stuck in rigid corporate grid conventions that failed to represent their avant-garde structural work.",
    solution:
      "Architected a responsive modular identity system using dynamic typographic scales, isometric spatial diagrams, warm paper substrates, and brutalist geometric layout structures.",
    outcomes: [
      "Delivered a complete brand guideline book and digital brand hub",
      "Designed modular typography scales with custom display ligatures",
      "Created 3D architectural concept illustrations and monograph covers",
      "Standardized corporate stationery, presentation decks, and web assets",
    ],
    sections: [
      {
        title: "Strategic Repositioning",
        subtitle: "From corporate architecture to spatial innovation",
        paragraphs: [
          "We restructured Nexus's brand pillars around three core concepts: Modular Density, Material Truth, and Spatial Fluidity.",
          "The resulting visual system allows individual project monographs to adopt distinct chromatic expressions while maintaining rigorous typographic continuity.",
        ],
      },
    ],
  },
  {
    slug: "ribbon-resonance",
    index: "04",
    title: "Ribbon & Resonance",
    category: "3d",
    categoryLabel: "Spatial Sound & 3D Visualizer",
    tagline: "An interactive audiovisual concept translating frequency spectrums into fluid ribbon dynamics.",
    client: "Resonance Audio",
    year: "2026",
    duration: "2 Weeks",
    role: "Spatial 3D & Concept Designer",
    heroImage: ribbonStudy,
    alt: "Fluid ribbon sculpture twisting in 3D perspective with soft lighting",
    accentColor: "var(--cobalt)",
    featured: true,
    disciplines: ["Spatial Audio Visuals", "3D Kinetic Modeling", "Real-Time Renders", "Motion Design"],
    tools: ["Blender", "Cinema 4D", "Octane", "After Effects"],
    overview:
      "A real-time audiovisual visual concept mapping microphone input and synth tracks into undulating 3D ribbon geometries.",
    challenge:
      "Audio visualizers often look like chaotic particle noise without clear aesthetic intention or brand resonance.",
    solution:
      "Crafted procedural ribbon geometry with silk-sheen reflections, harmonic ripple curves, and kinetic lighting.",
    outcomes: [
      "Created a signature procedural 3D ribbon motion system",
      "Delivered real-time 3D concept scenes and render presets",
      "Engineered flexible assets adaptable for album artwork and live performances",
    ],
    sections: [
      {
        title: "Harmonic Geometry",
        subtitle: "Visualizing sound as physical fabric",
        paragraphs: [
          "Sound waves were mapped to mathematical spline modifiers, transforming bass frequencies into heavy sweeping curves and high frequencies into delicate micro-ripples.",
        ],
      },
    ],
  },
  {
    slug: "form-void-studies",
    index: "05",
    title: "Form & Void Studies",
    category: "product",
    categoryLabel: "Design System & UI Components",
    tagline: "A brutalist component library and token architecture built for high-impact product brands.",
    client: "Void Craft",
    year: "2025",
    duration: "3 Weeks",
    role: "Design Systems Lead",
    heroImage: formStudy,
    alt: "Neo-brutalist component design system with tactile cards, buttons, and tokens",
    accentColor: "var(--yellow)",
    featured: false,
    disciplines: ["Design Systems", "Accessibility (WCAG AAA)", "Figma Component Architectures", "Token Pipelines"],
    tools: ["Figma", "Protopie", "Adobe Illustrator", "Photoshop"],
    overview:
      "A high-contrast, tactile UI library combining neo-brutalist shadows with silky smooth micro-animations and accessibility tokens.",
    challenge:
      "Design systems frequently compromise personality for compliance. Void Craft wanted extreme accessibility (WCAG AAA) without looking like another generic corporate UI kit.",
    solution:
      "Engineered a tokenized color matrix with tactile 4px offset borders, custom focus states, high-contrast badges, and fluid typography.",
    outcomes: [
      "220+ Figma components with comprehensive auto-layout 5.0 and component properties",
      "Full WCAG AAA contrast and keyboard focus accessibility specification",
      "Interactive token documentation and multi-brand theming guide",
    ],
    sections: [
      {
        title: "Tokens & Accessibility",
        subtitle: "Brutal character meets strict usability",
        paragraphs: [
          "Every component was built with high-contrast ratios, intuitive keyboard focus rings, and explicit spacing tokens.",
        ],
      },
    ],
  },
  {
    slug: "maker-workbench",
    index: "06",
    title: "The Maker Workbench",
    category: "brand",
    categoryLabel: "Creative Direction & Studio Brand",
    tagline: "A bespoke studio identity celebrating hand-drawn craftsmanship in the age of algorithmic monotony.",
    client: "Kunal Kumar Studio",
    year: "2026",
    duration: "Ongoing",
    role: "Creative Direction & Spatial Art",
    heroImage: processDesk,
    alt: "Illustrated design workbench with wireframes, color cards, and hand drawing",
    accentColor: "var(--paper-deep)",
    featured: false,
    disciplines: ["Studio Visual Identity", "Custom Illustration", "Spatial UI Experiments", "Creative Direction"],
    tools: ["Figma", "Blender", "Procreate", "Adobe Creative Cloud"],
    overview:
      "A personal studio identity celebrating hand-drawn craftsmanship, tactile textures, and vibrant curiosity.",
    challenge:
      "Modern digital portfolios have converged into identical dark templates with interchangeable cards. The goal was to build a warm, memorable studio brand that feels authentically human.",
    solution:
      "Combined warm paper substrates, hand-drawn vector elements, physical CD discs, and retro CRT scanline modes into a cohesive creative studio universe.",
    outcomes: [
      "Distinctive warm paper & neo-brutalist visual identity",
      "Complete illustrated iconography and mascot graphics",
      "Multi-platform brand presence across web, social, and presentation assets",
    ],
    sections: [
      {
        title: "Craft & Authenticity",
        subtitle: "Design with a soul",
        paragraphs: [
          "By balancing rigorous product design logic with playful, expressive 3D art, the Maker Workbench represents high-leverage creative work that refuses to be ignored.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectData[] {
  return projects.filter((p) => p.featured);
}
