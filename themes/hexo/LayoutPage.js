import BlogPostListPage from './components/BlogPostListPage'
import CategoryList from './components/CategoryList'
import LayoutBase from './LayoutBase'

export const LayoutPage = (props) => {
  const {  category, categories } = props
  return <LayoutBase {...props}>
    <CategoryList currentCategory={category} categories={categories} />
      <BlogPostListPage {...props}/>
  </LayoutBase>
}
