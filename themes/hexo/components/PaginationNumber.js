import BLOG from '/blog.config'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 数字翻页插件
 * @param page 当前页码
 * @param showNext 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = page < totalPage
  const pages = generatePages(page, currentPage, totalPage)

  return (
    <div className="mt-10 mb-5 font-sans flex justify-center items-end font-medium text-black duration-500 dark:text-gray-300 py-3 space-x-2">
      {/* 上一页 */}
      <Link
        href={{
          pathname:
            currentPage - 1 === 1
              ? `${BLOG.SUB_PATH || '/'}`
              : `/page/${currentPage - 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        passHref
        legacyBehavior
      >
        <div
          rel="prev"
          className={`${currentPage === 1 ? 'invisible' : 'block'
            } pb-0.5 w-6 text-center cursor-pointer duration-200  hover:font-bold`}
        >
          <i className="fas fa-angle-left" />
        </div>
      </Link>

      {pages}

      {/* 下一页 */}
      <Link
        href={{
          pathname: `/page/${currentPage + 1}`,
          query: router.query.s ? { s: router.query.s } : {}
        }}
        passHref
        legacyBehavior
      >
        <div
          rel="next"
          className={`${+showNext ? 'block' : 'invisible'
            } pb-0.5  w-6 text-center cursor-pointer duration-500  hover:font-bold`}
        >
          <i className="fas fa-angle-right" />
        </div>
      </Link>
    </div>
  )
}

function getPageElement(page, currentPage) {
  return (
    <Link href={page === 1 ? '/' : `/page/${page}`} key={page} passHref legacyBehavior>
      <a
        className={
          (page + '' === currentPage + ''
            ? 'font-bold bg-gray-500 hover:bg-gray-500 rounded-md dark:bg-indigo-500 text-white '
            : 'duration-500 border-indigo-300 hover:border-indigo-400 ') +
          ' cursor-pointer p-1 w-8 text-center font-light hover:font-bold'
        }
      >
        {page}
      </a>
    </Link>
  )
}

function generatePages(page, currentPage, totalPage) {
  const pages = []
  const groupCount = 7 // 最多显示页签数
  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(i, page))
    }
  } else {
    pages.push(getPageElement(1, page))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) {
      startPage = 2
    }
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    if (startPage > 2) {
      pages.push(<div key={-1}>... </div>)
    }

    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, page))
      }
    }

    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(<div key={-2}>... </div>)
    }

    pages.push(getPageElement(totalPage, page))
  }
  return pages
}
export default PaginationNumber
