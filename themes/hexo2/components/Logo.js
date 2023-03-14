import BLOG from '@/blog.config'
import Link from 'next/link'
import React from 'react'

const Logo = props => {
  const { siteInfo } = props
  return <Link href='/' passHref>
    <div className='flex flex-col logo dark:logo-dark justify-center items-center cursor-pointer space-y-3'>
    </div>
  </Link>
}
export default Logo
