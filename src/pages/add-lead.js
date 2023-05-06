import { useEffect, useState } from 'react'
import AgentIdForm from '../components/Forms/AgentIdForm'
import CreateLeadForm from '../components/Forms/CreateLeadForm'
import { checkStuffValidity } from '../utils/checkStuffValidity'

const CreateLead = () => {
  const [agentId, setAgentId] = useState('')

  useEffect(() => {
    setAgentId(localStorage.getItem('agentId') || '')
  }, [])

  return checkStuffValidity(agentId) ? (
    <CreateLeadForm />
  ) : (
    <AgentIdForm setAgentId={setAgentId} />
  )
}

export default CreateLead
