import { redirect } from 'next/dist/next-server/server/api-utils'
import { ServerResponse } from 'http'
import { IncomingMessage } from 'http'

export async function getServerSideProps({ res }) {
  res.setHeader('location', 'https://gcoo.io/kr/blog')
  res.statusCode = 302
  res.end()
  return { props: {} }
}

const Index = () => null

export default Index
