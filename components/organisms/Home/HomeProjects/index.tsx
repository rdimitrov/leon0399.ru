import React from 'react'
import type { Project } from '../../../../types/project'
import ProjectCard from '../../../molecules/projects/ProjectCard'

import SectionHeader from '../../../molecules/SectionHeader'

interface Props {
  id?: string
  className?: string
  projects: Project[]
}

const HomeProjects: React.FC<Props> = ({ id, className, projects }) => (
  <section id={id} className={`w-full ${className}`}>
    <SectionHeader title="Projects" href="/projects" />

    <div className="space-y-5">
      {projects.map((project, i) => (
        <ProjectCard key={`home-project-${i}`} project={project} />
      ))}
    </div>
  </section>
)

export default HomeProjects
