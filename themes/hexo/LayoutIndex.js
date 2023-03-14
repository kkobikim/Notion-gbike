import BLOG from '@/blog.config'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Header from './components/Header'
import CategoryList from './components/CategoryList'
import CONFIG_HEXO from './config_hexo'
import LayoutBase from './LayoutBase'
import React from 'react'

export const LayoutIndex = (props) => {
  const { category, categories } = props
  
  return <LayoutBase {...props} headerSlot={CONFIG_HEXO.HOME_BANNER_ENABLE && <Header {...props} />}>
            <CategoryList currentCategory={category} categories={categories} />
    {BLOG.POST_LIST_STYLE === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
  </LayoutBase>
}
