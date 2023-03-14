import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import copy from 'copy-to-clipboard'
import { useGlobal } from '@/lib/global'


const ShareBar = ({ post }) => {
  const router = useRouter()
  const shareUrl = BLOG.LINK + router.asPath

  // 二维码悬浮

  const { locale } = useGlobal()


  const copyUrl = () => {
    copy(shareUrl)
    alert(locale.COMMON.URL_COPIED)
  }

  return <>
    <div
      className='py-2 w-full flex justify-between text-gray-700 text-center space-x-2 flex my-1 dark:text-gray-200'>
   
      <div className='cursor-pointer text-sm bg-gray-200 border py-2 px-3 rounded-md'>
        <a className='' onClick={copyUrl} >
          <i className='fas fa-link pr-1'/> 공유하기
        </a>
      </div>

      <div className='cursor-pointer text-sm bg-gray-200 border py-2 px-3 rounded-md'>
      <Link href='mailto:kkobi.kim@gbike.io' passHref legacyBehavior>
        <a target="_blank">
          <i className='fas fa-envelope pr-1'/> 의견 보내기
        </a>
        </Link>
      </div>

    </div>
  </>
}
export default ShareBar
