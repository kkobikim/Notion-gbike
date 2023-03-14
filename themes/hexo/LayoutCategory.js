import BlogPostListPage from './components/BlogPostListPage'
import LayoutBase from './LayoutBase'
import CategoryList from './components/CategoryList'

export const LayoutCategory = props => {
  const { tags, posts, category, categories } = props
  return <LayoutBase {...props}>
   
      <CategoryList currentCategory={category} categories={categories} />
   
      <BlogPostListPage posts={posts} tags={tags} currentCategory={category}/>
  </LayoutBase>
}
