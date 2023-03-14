import React from 'react'
import BLOG from '@/blog.config'
import DarkModeButton from '@/components/DarkModeButton'

const Footer = ({ title }) => {
  return (
    <footer
      className='justify-center text-center m-auto w-full leading-6 '
    >
      <embed type="text/html" src="https://gcoo.io/kr/bottom" width="100%" height="466px"></embed>

    </footer>
  )
}

export default Footer
