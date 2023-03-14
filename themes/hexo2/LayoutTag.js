import BlogPostListPage from './components/BlogPostListPage'
import LayoutBase from './LayoutBase'

export const LayoutTag = (props) => {
  const { tags, posts, tag } = props

  return <LayoutBase {...props}>{tag}
      <BlogPostListPage posts={posts} tags={tags} currentTag={tag}/>
   </LayoutBase>
}
