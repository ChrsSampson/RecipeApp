import React from 'react'
import {Link} from 'react-router-dom'

// a recipe "display"
const Display = (props) => {
  console.log(props)
  return(
    <article className="Display">
      <Link to={`/client/show/${props.id}`}>
        <div>
          <h3>{props.title}</h3>
        </div>
        <div>
          <img src={props.img} />
        </div>
      </Link>
    </article>
  )
}

export default Display;