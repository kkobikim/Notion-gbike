import { useGlobal } from '/lib/global'
import throttle from 'lodash.throttle'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CategoryGroup from './CategoryGroup'
import Collapse from './Collapse'
import Logo from './Logo'
import SearchDrawer from './SearchDrawer'
import MenuButtonGroupTop from './MenuButtonGroupTop'
import MenuList from './MenuList'
import { useRouter } from 'next/router'
import DarkModeButton from '/components/DarkModeButton'
import ProgressBar from 'react-progressbar-on-scroll'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const TopNav = props => {
  const { categories, currentCategory } = props
  const { locale } = useGlobal()
  const searchDrawer = useRef()
  const { isDarkMode } = useGlobal()
  const router = useRouter()

  const scrollTrigger = throttle(() => {
    const scrollS = window.scrollY
    const nav = document.querySelector('#sticky-nav')
    const header = document.querySelector('#header')
    const showNav = scrollS <= windowTop || scrollS < 5 || (header && scrollS <= header.clientHeight)// 非首页无大图时影藏顶部 滚动条置顶时隐藏
    const navTransparent = (scrollS < document.documentElement.clientHeight - 12 && router.route === '/') || scrollS < 20 // 透明导航条的条件

    if (header && navTransparent) {
      nav && nav.classList.replace('bg-white', 'bg-none')
      nav && nav.classList.replace('text-black', 'text-white')
      nav && nav.classList.replace('shadow-md', 'shadow-none')
      nav && nav.classList.replace('glassmorphism', 's')
      nav && nav.classList.replace('border-b', 'border-transparent')
    } else {
      nav && nav.classList.replace('bg-none', 'bg-white')
      nav && nav.classList.replace('s', 'glassmorphism')
      nav && nav.classList.replace('text-white', 'text-black')
      nav && nav.classList.replace('border-transparent', 'border-b')
      nav && nav.classList.replace('shadow-none', 'shadow-md')
    }

    navDarkMode()
  }, 200)

  const navDarkMode = () => {
    const nav = document.getElementById('sticky-nav')
    const header = document.querySelector('#header')
    if (!isDarkMode && nav && header) {
      if (window.scrollY < 20) {
        nav?.classList?.add('dark')
      } else {
        nav?.classList?.remove('dark')
      }
    }
  }

  // 监听滚动
  useEffect(() => {
    scrollTrigger()

    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  const [isOpen, changeShow] = useState(false)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const searchDrawerSlot = <>
    { categories && (
        <section className='mt-8'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-th-list' />{locale.COMMON.CATEGORY}</div>
            <Link href={'/category'} passHref legacyBehavior>
              <a className='mb-3 text-gray-400 md:hover:text-black dark:text-gray-400 dark:md:hover:text-white md:hover:underline cursor-pointer'>
                {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
              </a>
            </Link>
          </div>
          <CategoryGroup currentCategory={currentCategory} categories={categories} />
        </section>
    ) }


    </>
  return (<div id='top-nav' className='z-40'>
    <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot}/>

    {/* 导航栏 */}
    <div id='sticky-nav' className={'top-0 fixed bg-none animate__animated animate__fadeIn dark:text-gray-200 text-black w-full z-20 transform duration-200 font-san border-transparent dark:border-transparent justify-center s'}>
      <div className='w-full max-w-screen-lg flex justify-between m-auto items-center pl-5 pr-0 pt-3 pb-2'>
        <div className='flex'>
         <Logo {...props}/>
        </div>

        {/* 右侧功能 */}
        <div className='mr-1 justify-end items-center font-serif '>
          <div className='hidden md:flex'> <MenuButtonGroupTop {...props}/> </div>
          <div onClick={toggleMenuOpen} className='w-8 pr-3 justify-end items-center h-8 cursor-pointer flex md:hidden'>
          { isOpen ? <i className='fas fa-times'/> : <i className='fas fa-bars'/>  }
          </div>
        </div>
      </div>
      <Collapse type='vertical' isOpen={isOpen} className='shadow-xl'>
        <div className='bg-white dark:bg-hexo-black-gray pt-1 py-2 px-5 md:hidden '>
          <MenuList {...props}/>
        </div>
      </Collapse>
      <ProgressBar
  color="#000"
  height={3}
  position="bottom"
/>
    </div>
  </div>)
}

export default TopNav
