/* eslint-disable consistent-return */
import Link from 'next/link'
import { useState } from 'react'
import { HiStar, HiXCircle } from 'react-icons/hi'
import Modal from '../Modal'

export const View = ({ title, icon, link }) => (
  <Link href={link}>
    <abbr title={title}>
      <span style={{ cursor: 'pointer', fontSize: '1.6rem' }}>{icon}</span>
    </abbr>
  </Link>
)

export const Edit = ({ title, icon, link }) => (
  <Link href={link}>
    <abbr title={title}>
      <span
        style={{
          cursor: 'pointer',
          fontSize: '1.6rem',
          marginLeft: '1em',
        }}
      >
        {icon}
      </span>
    </abbr>
  </Link>
)

export const Verify = ({ id, isVerified, title, icon, handleVerify }) =>
  isVerified === 'true' ? (
    <abbr title="Unverify">
      <span
        style={{
          cursor: 'pointer',
          fontSize: '1.6rem',
          marginLeft: '1em',
        }}
        onClick={() => handleVerify(id)}
      >
        <HiXCircle color="white" fill="red" size={16} />
      </span>
    </abbr>
  ) : (
    <abbr title={title}>
      <span
        style={{
          cursor: 'pointer',
          fontSize: '1.6rem',
          marginLeft: '1em',
        }}
        onClick={() => handleVerify(id)}
      >
        {icon}
      </span>
    </abbr>
  )

export const Delete = ({ id, title, icon, handleDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <>
      <Modal
        title="Are You Sure?"
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={() => handleDelete(id)}
        content="Deleting will remove the data from the database. You can not revert this change."
      />
      <abbr title={title}>
        <span
          style={{ cursor: 'pointer', fontSize: '1.6rem', marginLeft: '1em' }}
          onClick={() => setShowDeleteModal(true)}
        >
          {icon}
        </span>
      </abbr>
    </>
  )
}

export const Star = ({ id, isStarred, title, icon, handleStar }) =>
  isStarred === 'true' ? (
    <abbr title="unstar">
      <span
        style={{
          cursor: 'pointer',
          fontSize: '1.6rem',
          marginLeft: '1em',
        }}
        onClick={() => handleStar(id)}
      >
        <HiStar fill="red" size={16} />
      </span>
    </abbr>
  ) : (
    <abbr title={title}>
      <span
        style={{
          cursor: 'pointer',
          fontSize: '1.6rem',
          marginLeft: '1em',
        }}
        onClick={() => handleStar(id)}
      >
        {icon}
      </span>
    </abbr>
  )

export const Comment = ({ id, title, icon, agentComments, handleComment }) => {
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [commentText, setCommentText] = useState(agentComments || '')

  return (
    <>
      {/* comment modal */}
      <Modal
        title="Add A New Comment"
        open={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        onSubmit={() => handleComment(id, commentText)}
        content={
          <textarea
            placeholder="Write your comment"
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{
              resize: 'none',
              width: '100%',
              height: '100px',
              padding: '10px',
            }}
          />
        }
      />
      {/* comment modal end */}

      <abbr title={title}>
        <span
          style={{ cursor: 'pointer', fontSize: '1.6rem', marginLeft: '1em' }}
          onClick={() => setShowCommentModal(true)}
        >
          {icon}
        </span>
      </abbr>
    </>
  )
}
