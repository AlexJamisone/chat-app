import { Session } from 'next-auth'
import React, { FC } from 'react'

interface FeedWrapperProps {
    session: Session
}

const FeedWrapper: FC<FeedWrapperProps> = ({session}) => {
  return (
    <div>Feed Wrapper</div>
  )
}

export default FeedWrapper