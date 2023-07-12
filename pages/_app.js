import BLOG from 'blog.config'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    router.replace('https://gcoo.io/kr/blog')
  }, [])

  return null
}

export default MyApp
