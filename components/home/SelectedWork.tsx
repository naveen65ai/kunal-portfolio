import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedWork() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="featured-work" aria-labelledby="work-title">
      <div className="featured-work-inner">
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <p className="hand-label">✦ Selected Work</p>
            <h2 id="work-title">Projects made to be used & remembered.</h2>
          </div>
          <div className="section-intro-right">
            <p className="work-discription">
              Four recent engagements across product, brand and 3D — each pairing rigorous UX with
              a visual language built from scratch.
            </p>
          </div>
        </div>

        <div className="work-rows" data-reveal>
          {projects.map((project) => (
            <article key={project.slug} className="work-row">
              <div className="work-row-media" data-cursor="View case study">
                <span className="work-row-index">{project.index}</span>
                <Image
                  src={project.heroImage}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
              </div>

              <div className="work-row-body">
                <p className="work-row-kicker">{project.categoryLabel}</p>
                <h3 className="work-row-title">{project.title}</h3>
                <p className="work-row-desc">{project.tagline}</p>

                <div className="work-row-tags">
                  {project.disciplines.slice(0, 3).map((discipline) => (
                    <span key={discipline} className="work-row-tag">
                      {discipline}
                    </span>
                  ))}
                </div>

                <span className="work-row-year">{project.client} · {project.year}</span>

                <Link
                  className="work-row-cta"
                  href={`/work/${project.slug}`}
                  aria-label={`View the ${project.title} case study`}
                >
                  <span>View Case Study</span>
                  <ArrowUpRight aria-hidden="true" weight="bold" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="work-view-all">
          <Link className="pill-button" href="/work">
            <span>All Projects</span>
            <ArrowRight aria-hidden="true" weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
