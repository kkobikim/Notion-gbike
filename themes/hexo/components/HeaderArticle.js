import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import formatDate from '@/lib/formatDate'
import JumpToContentButton from './JumpToContentButton'

export default function HeaderArticle({ post, siteInfo }) {
  if (!post) {
    return <></>
  }
  const headerImage = post?.page_cover ? `url("${post.page_cover}")` : `url("${siteInfo?.pageCover}")`

  const { locale } = useGlobal()
  const date = formatDate(
    post?.date?.start_date || post?.createdTime,
    locale.LOCALE
  )

  return (
    <div
      id="header"
      className="w-full h-view-top relative overflow-hidden bg-cover bg-center bg-no-repeat shadow-2xl"
      style={{ backgroundImage: headerImage }}
    >
      <header className="bg-black bg-opacity-50 absolute top-0 w-full h-view-top pb-1 flex justify-center items-end font-sans">
        <div className='mb-4'>
          {/* 文章Title */}
                  <div className="pb-5 font-thin text-gray-300 dark:text-white flex justify-center">
                    {post.category}
                  </div>
             
          <div className="font-light text-3xl flex justify-center item-center text-center text-white dark:text-white font-Myeongjo">
            {post.title}
          </div>

          <section className="flex-wrap flex text-m justify-center mt-10 text-gray-200 dark:text-gray-400 font-thin leading-8">
            
            <div className='flex justify-center'>
              {post?.type[0] !== 'Page' && (
                <>
                    <a className="pl-1 mr-2">
                     {date}
                    </a>
                </>
              )}
            </div>
          </section>
          <div className='flex justify-center pt-10 animate-bounce'>
            <JumpToContentButton />
            </div>
        </div>

      </header>
    </div>
  )
}
