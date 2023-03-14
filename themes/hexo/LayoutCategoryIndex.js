import Link from 'next/link'
import Card from './components/Card'
import LayoutBase from './LayoutBase'

export const LayoutCategoryIndex = props => {
  const { categories } = props
  
  return (
    <LayoutBase {...props}>
      <Card className="w-full">

        <div id="category-list" className="duration-200 flex flex-wrap mx-8">
          {categories.map(category => {
            return (
              <Link key={category.name} href={`/category/${category.name}`} passHref>
                <div
                  className={
                    ' duration-300 dark:hover:text-white px-5 cursor-pointer py-2 hover:text-indigo-400'
                  }
                >
                
                  {category.name}
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
    </LayoutBase>
  )
}
LayoutCategoryIndex