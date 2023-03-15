import React from 'react'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'

/**
 * 展示文章推荐
 */
const RecommendPosts = ({ recommendPosts }) => {
  if (!recommendPosts || recommendPosts.length < 1) {
    return <></>
  }
  const { locale } = useGlobal()

  return (
    <div className="pt-2 py-2 my-4 dark:text-gray-300 ">
       <div className='md:pr-12 font-medium dark:text-white text-3xl pb-8 pt-20'>새로운 포스트</div>
        <ul className="font-light text-sm">
          {recommendPosts.map(post => (<a href={`/${post.slug}`}>
            <li className="py-1 flex flex-row-reverse justify-between pb-14" key={post.id}>
                <img
                src={post?.page_cover}
                alt={post.title}
                className="cursor-pointer h-25 md:h-40 w-1/3 rounded-2lg transform object-cover duration-200 border-white md:hover:-translate-y-2 md:hover:shadow-xl"
                
              />
              <Link href={`/${post.slug}`} legacyBehavior>
              <div className="flex flex-col w-full pr-8">
              <a className="cursor-pointer my-2 font-light text-gray-500 dark:text-gray-300 text-sm transform">
                {post.category}
              </a>
            <a
              className={`replace cursor-pointer notion-card-text text-lg md:text-xl font-sans leading-tight font-medium text-gray-700 dark:text-gray-100`}
            >
              {post.title}
            </a>
            <div
            className={`flex mt-2 items-center flex-wrap dark:text-gray-500 text-gray-400`}
             >
              <a className="font-light cursor-pointer text-sm leading-4 mr-3">
                {post.date?.start_date || post.lastEditedTime}
              </a>
          </div>
            </div>
              </Link>
            </li></a>
          ))}
        </ul>
    </div>
  )
}
export default RecommendPosts
