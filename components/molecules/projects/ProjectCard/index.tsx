import React from 'react'

import 'twin.macro'

import Tag from '../../../atoms/Tag'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'

import type { Project } from '../../../../types/project'

interface Props {
  project: Project
}

const ProjectCard: React.FC<Props & JSX.IntrinsicElements['article']> = ({
  project,
  ...props
}) => (
  <article
    tw="
      relative flex flex-row gap-4 rounded-lg border bg-white py-4 px-6
      shadow-lg ring-offset-2
      transition-colors duration-300 focus-within:ring dark:border-gray-700
      dark:bg-gray-800 dark:text-gray-300
    "
    {...props}
  >
    <div tw="hidden shrink-0 md:inline-block">
      {project.logo ? (
        <Image
          src={project.logo}
          width={64}
          height={64}
          tw="h-16 w-16 rounded"
          alt={project.title}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      ) : (
        <div tw="h-16 w-16 rounded bg-gray-200" />
      )}
    </div>
    <div tw="grow overflow-hidden">
      <h3 tw="text-lg font-bold tracking-tight">{project.title}</h3>
      <p tw="text-sm leading-5 text-gray-600 dark:text-gray-400">
        {project.description}
      </p>
      {Array.isArray(project.tags) && project.tags.length && (
        <div tw="my-2 flex flex-row space-x-3">
          {project.tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </div>
      )}
      <div tw="flex flex-row space-x-4 text-xs leading-relaxed">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tw="
            truncate underline hover:text-gray-900 dark:hover:text-gray-200
          "
        >
          {project.displayUrl ||
            project.url
              ?.replace(/^https?:\/\//, '')
              .split('?')[0]
              .replace(/^[\\/]+|[\\/]+$/g, '')}
        </a>

        <span
          tw="
            before:pr-4 before:no-underline before:content-['·']
          "
        >
          {project.category}
        </span>
      </div>
    </div>
    {project.isExternalUrl && (
      <div tw="text-gray-500">
        <Icon icon={'heroicons-outline:external-link'} tw="h-6 w-6" />
      </div>
    )}
    {project.pin && (
      <div tw="absolute -top-2 right-6 text-gray-500">
        <svg
          aria-hidden="true"
          role="img"
          tw="h-6 w-6 fill-white"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5Z"
          />
        </svg>
      </div>
    )}
    {project.isExternalUrl ? (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        tw="absolute inset-0 h-full w-full focus:outline-none"
      />
    ) : (
      <Link
        href={`/projects/${project.slug}`}
        tw="absolute inset-0 h-full w-full focus:outline-none"
        aria-label={project.title}
      ></Link>
    )}
  </article>
)

export default ProjectCard
