import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import Card from './components/Card'
import { useRouter } from 'next/router';
import LayoutBase from './LayoutBase'

export const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const router = useRouter();
  const selected0 = router.pathname !== '/category/[category]'
  return (
    <LayoutBase {...props}>
      <Card className="w-full min-h-screen">
        <div id="category-list" className="flex py-4 md:pl-5 pb-12 space-x-3 overflow-x-scroll hidden-scrollbar">
        <Link href="../"><div className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                 ${selected0
                ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300  dark:text-gray-600'
              }`}
        >
          전체</div></Link>
          {categoryOptions.map(category => {
            return (
              <Link key={category.name} href={`/category/${category.name}`} passHref>
                <div
                  className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                  ${selected0
                 ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                 : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300  dark:text-gray-600'
               }`}
                >
                  {category.name}({category.count})
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </LayoutBase>
  )
}
