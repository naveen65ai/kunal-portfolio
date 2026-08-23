import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import cultureSignal from "@/public/images/culture-signal-illustrated-v2.png";
import matterMotion from "@/public/images/matter-motion-illustrated-v2.png";
import modularFutures from "@/public/images/modular-futures-illustrated-v2.png";

type Project = {
  index: string;
  title: string;
  type: string;
  description: string;
  image: StaticImageData;
  alt: string;
  className: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Culture after dark",
    type: "Product design · UX direction",
    description: "A nocturnal discovery product built around atmosphere, quick decisions, and the pulse of a city after sunset.",
    image: cultureSignal,
    alt: "Three hand-painted nightlife discovery interfaces arranged on a cobalt workbench",
    className: "work-card--feature",
  },
  {
    index: "02",
    title: "Matter in motion",
    type: "3D art · Material study",
    description: "A material experiment where glass, chrome, color, and motion become one expressive system.",
    image: matterMotion,
    alt: "Illustrated coral and chrome ribbon sculpture moving through a yellow ring",
    className: "work-card--yellow",
  },
  {
    index: "03",
    title: "Modular futures",
    type: "Identity · Spatial object",
    description: "An identity system assembled from ceramic, metal, and acrylic forms designed to keep changing shape.",
    image: modularFutures,
    alt: "Playful illustrated modular city built from colorful arches and blocks",
    className: "work-card--orange",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`illustrated-work-card ${project.className}`} data-reveal data-cursor="View project">
      <div className="work-card-image">
        <Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 60vw" />
      </div>
      <div className="work-card-info">
        <div className="work-card-meta">
          <span>{project.index}</span>
          <p>{project.type}</p>
          <ArrowUpRight aria-hidden="true" weight="bold" />
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="selected-work" aria-labelledby="work-title">
      <div className="section-intro" data-reveal>
        <p className="hand-label">Selected projects </p>
        <h2 id="work-title">Work made to be remembered.</h2>
        <p className="work-discription">
          Useful first. Distinctive always. A selection of interfaces, identities, and digital objects shaped with equal parts logic and feeling.
        </p>
      </div>
      <div className="work-layout">{projects.map((project) => <ProjectCard key={project.index} project={project} />)}</div>
    </section>
  );
}
