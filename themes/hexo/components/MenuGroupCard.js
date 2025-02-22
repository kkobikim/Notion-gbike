import React from 'react'
import Link from 'next/link'
import { useGlobal } from '/lib/global'
import CONFIG_HEXO from '../config_hexo'

const MenuGroupCard = (props) => {
  const { postCount, categories, tags } = props
  const { locale } = useGlobal()
  const archiveSlot = <div className='text-center'>{postCount}</div>
  const categorySlot = <div className='text-center'>{categories?.length}</div>
  const tagSlot = <div className='text-center'>{tags?.length}</div>

  const links = [
    { name: locale.COMMON.ARTICLE, to: '/archive', slot: archiveSlot, show: CONFIG_HEXO.MENU_ARCHIVE },
    { name: locale.COMMON.CATEGORY, to: '/category', slot: categorySlot, show: CONFIG_HEXO.MENU_CATEGORY },
    { name: locale.COMMON.TAGS, to: '/tag', slot: tagSlot, show: CONFIG_HEXO.MENU_TAG }
  ]

  return <nav id='nav' className='leading-8 flex justify-center  font-sans w-full'>
      {links.map(link => {
        if (link.show) {
          return <Link key={`${link.to}`} title={link.to} href={link.to} legacyBehavior>
          <a target={link.to.indexOf('http') === 0 ? '_blank' : '_self'} className={'py-1.5 my-1 px-2 duration-300 text-base justify-center items-center cursor-pointer'} >
              <div className='w-full items-center justify-center hover:scale-105 duration-200 transform dark:hover:text-indigo-400 hover:text-indigo-600'>
                <div className='text-center'>{link.name}</div>
                <div className='text-center font-semibold'>{link.slot}</div>
              </div>
            </a>
          </Link>
        } else {
          return null
        }
      })}
    </nav>
}
export default MenuGroupCard
