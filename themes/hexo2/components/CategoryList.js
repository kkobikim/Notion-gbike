import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router';
import { useGlobal } from '@/lib/global'

const CategoryList = ({ currentCategory, categories }) => {
  if (!categories) {
    return <></>
  }

  const { locale } = useGlobal()
  const router = useRouter();
  const selected0 = router.pathname !== '/category/[category]'
  return <ul className='flex py-4 md:pl-5 pb-12 space-x-3 overflow-x-scroll hidden-scrollbar'>
    <Link href={`../`} passHref>
    <li
            className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                 ${selected0
                ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300  dark:text-gray-600'
              }`}
          >
            <a>
              전체
            </a>
            </li>
    </Link> 
    
   {categories.map(category => {
      const selected = category.name === currentCategory
      return (
        <Link key={category.name} href={`/category/${category.name}`} passHref>
          <li
            className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                 ${selected
                ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300  dark:text-gray-600'
              }`}
          >
            <a>
              {`${category.name}`}
            </a>
          </li>
        </Link>)
    })}
  </ul>
}

export default CategoryList
