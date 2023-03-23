import Image from 'next/image'
import Tag from '../../atoms/Tag'

// Types
import type { FC, ReactNode } from 'react'

import 'twin.macro'

interface Props {
  title: ReactNode
  category: string
  tags?: string[]
  logo?: string
  url: string
  displayUrl?: string
}

const ProjectHeader: FC<Props> = ({
  title,
  category,
  logo,
  tags,
  url,
  displayUrl,
}) => {
  return (
    <header
      tw="
        mt-8 mb-12 flex
        flex-col items-start
        space-y-4 overflow-hidden md:flex-row
        md:space-y-0 md:space-x-4
      "
    >
      {logo ? (
        <Image
          src={logo}
          width={84}
          height={84}
          tw="mt-0 h-[84px] w-[84px] rounded"
          alt="Project logo"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      ) : (
        <div tw="h-[84px] w-[84px] rounded bg-gray-200" />
      )}
      <div tw="max-w-full overflow-hidden">
        <h1 tw="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <div tw="flex flex-row justify-between overflow-hidden">
          <div tw="flex flex-row space-x-4 truncate text-xs leading-relaxed">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              tw="
                truncate underline hover:text-gray-900 dark:hover:text-gray-200
              "
            >
              {displayUrl ||
                url
                  ?.replace(/^https?:\/\//, '')
                  .split('?')[0]
                  .replace(/^[\\/]+|[\\/]+$/g, '')}
            </a>

            <span
              tw="
                before:pr-4 before:no-underline before:content-['·']
              "
            >
              {category}
            </span>
          </div>

          {Array.isArray(tags) && tags.length && (
            <div tw="flex flex-row">
              {tags.map((tag, i) => (
                <Tag key={i} tw="ml-3">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default ProjectHeader
