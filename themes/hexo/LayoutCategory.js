import BlogPostListScroll from './components/BlogPostListScroll'
import BlogPostListPage from './components/BlogPostListPage'
import CategoryList from './components/CategoryList'
import LayoutBase from './LayoutBase'
import BLOG from '/blog.config'

export const LayoutCategory = props => {
    const { tags, posts, category, categories } = props
  return <LayoutBase {...props}>
       <CategoryList currentCategory={category} categories={categories} />
   
   <BlogPostListPage posts={posts} tags={tags} currentCategory={category}/>
    </LayoutBase>
}
