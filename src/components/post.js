import React, {Component} from 'react'
//we could have also passed in (props) and changed the variables in li to props.post.test, etc. 
const Post = ({post}) => {
  return (
    <li>
      <span>{post.user} - {post.text} - UpVotes: {post.upvotes}</span>
      <button onClick={post.upVotePost}>Upvotes</button>
    </li>
  )
}


export default Post