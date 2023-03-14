import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import BlogPostListPage from './components/BlogPostListPage'
import LayoutBase from './LayoutBase'
import SearchInput from './components/SearchInput'
import { useGlobal } from '@/lib/global'
import Card from './components/Card'
import Link from 'next/link'

export const LayoutSearch = props => {
  const { keyword, categories } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s
  const cRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      // 自动聚焦到搜索框
      cRef?.current?.focus()
      if (currentSearch) {
        const targets = document.getElementsByClassName('replace')
        for (const container of targets) {
          if (container && container.innerHTML) {
            const re = new RegExp(`${currentSearch}`, 'gim')
            container.innerHTML = container.innerHTML.replace(
              re,
              `<span class='text-green-400 border-none'>${currentSearch}</span>`
            )
          }
        }
      }
    }, 100)
  })
  return (
    <LayoutBase {...props} currentSearch={currentSearch}>
      <div className="my-6 pb-10 px-2">
        <SearchInput cRef={cRef} {...props} />
      </div>
      <div id="container">
        <BlogPostListPage {...props} />
      </div>
    </LayoutBase>
  )
}
