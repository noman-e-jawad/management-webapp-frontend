import { useRouter } from 'next/router'
import { useUserContext } from '../contexts/UserContext'

const Index = () => {
  const router = useRouter()
  const { user } = useUserContext()
  if (user) {
    router.push('/dashboard')
  }
  return <></>
}

export default Index
