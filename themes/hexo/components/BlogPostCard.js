import BLOG from '@/blog.config'
import Link from 'next/link'
import React from 'react'
import CONFIG_HEXO from '../config_hexo'
import NotionPage from '@/components/NotionPage'

const BlogPostCard = ({ post, showSummary }) => {
  const showPreview = CONFIG_HEXO.POST_LIST_PREVIEW && post.blockMap
  return (
    <Link href={`${BLOG.SUB_PATH}/${post.slug}`} passHref legacyBehavior>
    <div className="w-ful cursor-pointer duration-300">
      <div
        key={post.id}
        className="notion-card animate__animated animate__fadeIn flex sm:flex-row justify-between duration-300 flex-col-reverse"
      >
        <div className="p-4 pr-8 flex flex-col w-full">
              <a className="cursor-pointer my-2 font-light text-gray-500 dark:text-gray-300 text-sm transform">
                {post.category}
              </a>
            <a
              className={`replace cursor-pointer notion-card-text text-2xl font-sans ${showPreview ? 'text-center' : ''
                } leading-tight font-medium text-gray-700 dark:text-gray-100`}
            >
              {post.title}
            </a>

          {(!showPreview || showSummary) && (
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}
              className="replace max-h-32 my-2 text-gray-500  dark:text-gray-300 text-m font-light leading-7">
              {post.summary}
            </p>
          )}


            <div
            className={`flex mt-2 items-center ${showPreview ? 'justify-center' : 'justify-start'
              } flex-wrap dark:text-gray-500 text-gray-400`}
             >
              <a className="font-light cursor-pointer text-sm leading-4 mr-3">
                {post.date?.start_date || post.lastEditedTime}
              </a>
          </div>

          {showPreview && (
            <div className="overflow-ellipsis truncate">
              <NotionPage post={post} />
            </div>
          )}
        </div>

            <div className="flex notion-card-hover h-44 sm:w-96 w-full relative duration-200 rounded-2lg cursor-pointer transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post?.page_cover}
                alt={post.title}
                className="max-h-52 h-44 w-full rounded-2lg transform object-cover duration-200"
              />
              {/* <Image className='hover:scale-125 rounded-t-xl lg:rounded-r-xl lg:rounded-t-none transform duration-500' src={post?.page_cover} alt={post.title} layout='fill' objectFit='cover' loading='lazy' /> */}
            </div>
     
      </div>
    </div></Link>
  )
}

export default BlogPostCard
