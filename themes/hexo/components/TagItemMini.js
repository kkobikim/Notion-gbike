import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return <Link key={tag} href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`} passHref legacyBehavior>
    <a className={`cursor-pointer border-solid border border-gray-200 inline-block rounded-3xl hover:bg-gray-100 duration-200
      mr-2 text-base whitespace-nowrap text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-400 notion-white_background mb-4` }>
    <div className='font-light px-4 py-2'>{selected && <i className='mr-1 fa-tag'/>} {tag.name + (tag.count ? `(${tag.count})` : '')} </div>
    </a>
  </Link>
}

export default TagItemMini
