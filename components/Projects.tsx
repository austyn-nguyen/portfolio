"use client";

import DecorativeMark from "./DecorativeMark";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import { projects, type Project } from "@/src/data/projects";

interface ProjectsProps {
  onToggle?: (isOpen: boolean) => void;
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { label: "Visit live page", href: project.liveLink },
    { label: "View presentation", href: project.driveLink },
    { label: "GitHub", href: project.githubLink },
    { label: "Devpost", href: project.devpostLink },
    { label: "LinkedIn", href: project.link },
  ];
  return <div className="project-links">{links.filter((link) => link.href).map((link) => (
    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></a>
  ))}</div>;
}

export default function Projects({ onToggle }: ProjectsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = selectedIndex === null ? null : projects[selectedIndex];
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  const isOpen = selectedIndex !== null;
  useEffect(() => {
    onToggle?.(isOpen);
    if (!isOpen) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onToggle]); // Keep the dialog open while paging through projects.

  const openProject = (project: Project) => setSelectedIndex(projects.indexOf(project));
  const closeProject = () => setSelectedIndex(null);
  const paginate = (direction: number) => {
    setSelectedIndex((index) => index === null ? null : (index + direction + projects.length) % projects.length);
    if (dialog.current) dialog.current.scrollTop = 0;
  };

  return (
    <section id="projects" className="selected-work">
      <header className="work-heading">
        <h2>Curiosity, <span>put to work.</span></h2>
      </header>

      <div className="featured-projects">
        {featured.map((project, index) => (
          <article key={project.title} className={`featured-project ${index === 0 ? "project-lead" : ""}`}>
            <button type="button" className={`project-preview project-preview-${index}`} onClick={() => openProject(project)} aria-label={`Read about ${project.title}`}>
              <span className="project-preview-label">{index === 0 ? "Out in the world ↗" : index === 1 ? "Finding patterns" : "Connecting the dots"}</span>
              <div className="project-image-frame"><Image src={project.image} alt={project.title} fill sizes={index === 0 ? "(max-width: 767px) 90vw, 600px" : "(max-width: 767px) 90vw, 520px"} className="project-image" /></div>
              <span className="project-preview-caption">{index === 0 ? "A little less friction. A lot more clarity." : index === 1 ? "Making sense of an unpredictable market." : "Better processes, with people at the center."}</span>
            </button>
            <div className="featured-project-copy">
              <p className="project-kicker"><span>0{index + 1}</span> {project.affiliation}</p>
              <h3><button onClick={() => openProject(project)}>{project.title}</button></h3>
              <p className="project-summary">{project.description}</p>
              <dl className="project-facts"><div><dt>My focus</dt><dd>{project.role}</dd></div><div><dt>What came out of it</dt><dd>{project.outcome}</dd></div></dl>
              <div className="project-card-actions"><button onClick={() => openProject(project)} className="project-read">The project story <ArrowUpRight className="link-arrow" size={18} aria-hidden="true" /></button>{project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Visit live page <ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></a>}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="more-work-heading"><h3>More from the workbench<span aria-hidden="true"> <DecorativeMark /></span></h3></div>
      <div className="more-projects">{more.map((project) => (
        <article key={project.title} className="compact-project">
          <button className="compact-project-image" onClick={() => openProject(project)} aria-label={`Read about ${project.title}`}><Image src={project.image} alt={project.title} fill sizes="(max-width: 767px) 90vw, 350px" /></button>
          <div className="compact-project-copy"><p className="project-kicker">{project.affiliation}</p><h4><button onClick={() => openProject(project)}>{project.title}</button></h4><p>{project.description}</p><button className="project-read" onClick={() => openProject(project)}>Take a look <ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></button></div>
        </article>
      ))}</div>

      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={closeProject} onClose={() => { if (!dialog.current?.open) closeProject(); }} onClick={(event) => { if (event.target === event.currentTarget) closeProject(); }}>
        {selected && <div className="project-dialog-content">
          <div className="project-dialog-toolbar"><span>From the workbench</span><button onClick={closeProject} aria-label="Close project" autoFocus><X size={22} /></button></div>
          <div className="project-dialog-image"><Image src={selected.image} alt={selected.title} fill sizes="(max-width: 767px) 90vw, 850px" className="object-contain" /></div>
          <div className="project-dialog-copy"><p className="project-kicker">{selected.affiliation} · {selected.date}</p><h2 id="project-dialog-title">{selected.title}</h2><p>{selected.longDescription}</p><div className="project-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><ProjectLinks project={selected} /></div>
          <div className="project-dialog-pagination"><button onClick={() => paginate(-1)}><ArrowLeft size={18} aria-hidden="true" />Previous</button><span aria-live="polite">{(selectedIndex ?? 0) + 1} / {projects.length}</span><button onClick={() => paginate(1)}>Next<ArrowRight size={18} aria-hidden="true" /></button></div>
        </div>}
      </dialog>
    </section>
  );
}
