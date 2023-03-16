import { useRef } from 'react'
import { ArticleLock } from './components/ArticleLock'
import HeaderArticle from './components/HeaderArticle'
import JumpToCommentButton from './components/JumpToCommentButton'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import LayoutBase from './LayoutBase'
import ShareBar from './components/ShareBar'
import NotionPage from '@/components/NotionPage'
import TagItemMini from './components/TagItemMini'
import RecommendPosts from './components/RecommendPosts'
import ArticleAdjacent from './components/ArticleAdjacent'
import { isBrowser } from '@/lib/utils'
import TranslateButton from './components/TranslateButton';

export const LayoutSlug = props => {
  const { post, recommendPosts, lock, validPassword, showArticleInfo } = props
  const drawerRight = useRef(null)
  if (!post) {
    return <LayoutBase
      headerSlot={<HeaderArticle {...props} />}
      {...props}
      showCategory={false}
      showTag={false}
    ></LayoutBase>
  }

  const targetRef = isBrowser() ? document.getElementById('container') : null

  const floatSlot = <>
    {post?.toc?.length > 1 && <div className="block lg:hidden">
      <TocDrawerButton
        onClick={() => {
          drawerRight?.current?.handleSwitchVisible()
        }}
      />
    </div>}
    <JumpToCommentButton />
  </>

  return (
    <LayoutBase
      headerSlot={<HeaderArticle {...props} />}
      {...props}
      showCategory={false}
      showTag={false}
      floatSlot={floatSlot}
    >
    <div className="w-full lg:px-2 lg:py-4">
        {lock && <ArticleLock password={post.password} validPassword={validPassword} />}

        {!lock && <div id="container" className="overflow-x-auto max-w-screen-md flex-grow mx-auto md:w-full md:px-5 ">

          <article itemScope itemType="https://schema.org/Movie" className="subpixel-antialiased" >
            {/* Notion文章主体 */}
            <section id='notion-article' className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full pb-10'>
            <TranslateButton />
              {post && <NotionPage post={post} />}
            </section>

            <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
              <div>
                {' '}
                {post.tagItems.map(tag => (
                  <TagItemMini key={tag.name} tag={tag} />
                ))}
              </div>
            </div>
            <ShareBar {...props} />
            {showArticleInfo && <>
            <RecommendPosts currentPost={post} recommendPosts={recommendPosts} />
            <ArticleAdjacent {...props} />
            </>}
          </article>


        </div>}
      </div>

      <div className='block lg:hidden'>
        <TocDrawer post={post} cRef={drawerRight} targetRef={targetRef} />
      </div>

    </LayoutBase>
  )
}
