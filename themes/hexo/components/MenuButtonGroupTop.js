import React from 'react'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import CONFIG_HEXO from '../config_hexo'

const MenuButtonGroupTop = (props) => {
  const { customNav } = props
  const { locale } = useGlobal()

  let links = [
    { icon: '', name: locale.COMMON.MAIN, to: '/', show: CONFIG_HEXO.MENU_MAIN },
    { icon: '', name: locale.COMMON.ARTICLE, to: '/archive', show: CONFIG_HEXO.MENU_ARCHIVE }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  return <nav id='nav' className='leading-8 flex justify-center font-sans font-light w-full'>
    {links.map(link => {
        return <Link key={`${link.to}`} title={link.to} href={link.to} legacyBehavior>
          <a target={link.to.indexOf('http') === 0 ? '_blank' : '_self'} className={'my-1 px-2 duration-300 text-base justify-center items-center cursor-pointer'} >
            <div className='w-full flex text-sm items-center justify-center px-1 py-1.5 transform hover:bg-opacity-25 hover:bg-gray-500  rounded-md'>
              <i className={`${link.icon} mr-1  pt-1 pl-1`}/>
              <div className='text-center font-medium pr-2'>{link.name}</div>
            </div>
          </a>
        </Link>
    })}
     <Link key={`/search`} title='검색' href='/search' legacyBehavior>
          <a target='_self' className={' my-1 px-2 duration-300 text-base justify-center items-center cursor-pointer'} >
            <div className='w-full flex text-sm items-center justify-center pt-1.5 pb-2.5 px-2 transform hover:bg-opacity-25 hover:bg-gray-500  rounded-md'>
              <i className={`fas fa-search mr-1  pt-1 pl-1`}/>
            </div>
          </a>
        </Link>
  </nav>
}
export default MenuButtonGroupTop
