import { useRouter } from 'next/router'
import CreateStuffForm from '../components/Forms/CreateStuffForm'
import { useUserContext } from '../contexts/UserContext'
import { authorize } from '../utils/authorize'

const CreateStuff = () => {
  const { user } = useUserContext()
  const router = useRouter()
  if (!authorize(user.role, 'create-stuff')) {
    router.push('/dashboard')
  }
  return (
    <>
      <CreateStuffForm />
    </>
  )
}

export default CreateStuff
