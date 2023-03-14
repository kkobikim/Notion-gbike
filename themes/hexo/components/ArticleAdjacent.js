import Link from 'next/link'
import CONFIG_HEXO from '../config_hexo'

/**
 * 上一篇，下一篇文章
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleAdjacent ({ prev, next }) {
  if (!prev || !next || !CONFIG_HEXO.ARTICLE_ADJACENT) {
    return <></>
  }
  return <section className=''>
    <div className='flex md:pr-12 font-medium dark:text-white text-3xl pb-8 pt-20'>추천 포스트</div>
    <div className='text-gray-800 items-start text-xl flex flex-col md:flex-row justify-between m-1 pt-5'>
    <div className='flex flex-col w-full md:flex-1 md:pr-12'>
    <Link href={`/${prev.slug}`} passHref legacyBehavior>
    <img
                src={prev?.page_cover}
                alt={prev.title}
                className="cursor-pointer h-48 w-full max-w-full rounded-2lg transform object-cover duration-200 border-white md:hover:-translate-y-2 md:hover:shadow-xl"
              />
              </Link>
              <Link href={`/${prev.slug}`} passHref legacyBehavior>
      <a className='py-5 cursor-pointer justify-start items-center flex dark:text-white w-full duration-200'>
        {prev.title}
      </a> 
    </Link>
              </div>
              <div className='flex flex-col w-full flex-none md:flex-1'>
    <Link href={`/${next.slug}`} passHref legacyBehavior>
    <img
                src={next?.page_cover}
                alt={next.title}
                className="cursor-pointer h-48 w-full rounded-2lg transform object-cover duration-200 border-white md:hover:-translate-y-2 md:hover:shadow-xl"
              />
              </Link>
              <Link href={`/${next.slug}`} passHref legacyBehavior>
      <a className='py-5 cursor-pointer justify-start items-center flex dark:text-white w-full duration-200'>{next.title}
       
      </a>
    </Link>
              </div>
              </div>
  </section>
}
