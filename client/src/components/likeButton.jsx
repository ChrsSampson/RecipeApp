import React from 'react'

const LikeButton = (props) => {

  return(
    <button onClick={(e) => props.onClick() }>{props.liked ? 'Liked': '<3'}</button>
  )

}

export default LikeButton