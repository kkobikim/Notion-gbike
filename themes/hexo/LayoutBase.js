import CommonHead from '@/components/CommonHead'
import { useCallback, useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import Footer from './components/Footer'
import JumpToTopButton from './components/JumpToTopButton'
import TopNav from './components/TopNav'
import FloatDarkModeButton from './components/FloatDarkModeButton'
import Live2D from '@/components/Live2D'
import LoadingCover from './components/LoadingCover'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import dynamic from 'next/dynamic'

const FacebookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, headerSlot, meta, siteInfo } = props
  const [showFloatButton, switchShow] = useState(false)
  // const [percent, changePercent] = useState(0) // 页面阅读百分比
  const rightAreaSlot = (
    <>
      <FacebookPage />
      <Live2D />
    </>
  )
  const { onLoading } = useGlobal()
  const throttleMs = 200
  const scrollListener = useCallback(throttle(() => {
    const targetRef = document.getElementById('wrapper')
    const clientHeight = targetRef?.clientHeight
    const scrollY = window.pageYOffset
    const fullHeight = clientHeight - window.outerHeight
    let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
    if (per > 100) per = 100
    const shouldShow = scrollY > 100 && per > 0

    if (shouldShow !== showFloatButton) {
      switchShow(shouldShow)
    }
  }, throttleMs))
  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <div id='theme-hexo'>
      <CommonHead meta={meta} siteInfo={siteInfo}/>

      <TopNav {...props} />

      {headerSlot}

      <main id="wrapper" className="w-full pt-8 pb-56 px-4 lg:px-6 min-h-screen">
      <div
          id="container-inner"
          className="pt-12 w-full mx-auto lg:flex lg:space-x-4 justify-center"
        >
          <div className="w-full max-w-5xl">
            {onLoading ? <LoadingCover /> : children}
          </div>
        </div>
      </main>

      {/* 右下角悬浮 */}
      <div className={(showFloatButton ? 'opacity-100 ' : 'invisible opacity-0') + '  duration-300 transition-all bottom-12 right-1 fixed justify-end z-20  text-white bg-green-600 dark:bg-hexo-black-gray rounded-sm'}>
        <div className={'justify-center  flex flex-col items-center cursor-pointer'}>
          <FloatDarkModeButton />
          <JumpToTopButton />
        </div>
      </div>

      <Footer title={siteInfo?.title || BLOG.TITLE} />
    </div>
  )
}

export default LayoutBase
