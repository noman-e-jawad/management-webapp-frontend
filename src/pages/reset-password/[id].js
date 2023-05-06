import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ChangePasswordForm from '../../components/Forms/ChangePasswordForm'
import { getUserById } from '../../http/http'
const ChangePassword = () => {
  const router = useRouter()
  const { id: link } = router.query

  useEffect(() => {
    if (link) {
      getUserById(link.split('&t=')[0]).then(({ data }) => {
        if (!data) {
          router.push('/')
        }
      })
    }
  }, [link, router])

  return (
    <div>
      <ChangePasswordForm
        id={link?.split('&t=')[0]}
        token={link?.split('&t=')[1]}
      />
    </div>
  )
}

export default ChangePassword
