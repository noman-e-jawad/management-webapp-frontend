import axios from 'axios'
import nextCookie from 'next-cookies'
import Router from 'next/router'

const redirectOnError = (ctx) => {
  if (typeof window !== 'undefined') {
    Router.push('/')
  } else {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }
}
export const handleAuthSSR = async (ctx) => {
  const { token } = nextCookie(ctx)
  const url = `${process.env.API_URL}/api/auth/validate`

  try {
    if (!token) {
      return redirectOnError(ctx)
    }
    const response = await axios.get(url, {
      headers: { Authorization: token },
    })

    if (!response.data.user) {
      return redirectOnError(ctx)
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(ctx)
  }
  return {}
}
