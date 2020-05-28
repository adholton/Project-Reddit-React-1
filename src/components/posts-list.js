import React from 'react'
import Post from './post';

//since this component will just hold other components (posts) that hold data and won't be manipulating any data, we don't need to make this a class component, it can just be a simple component (a function basically). The only functionality we want postList to have is to render the posts given by the App component. Since the posts are the state of the App, we can pass the state as a prop into the function. 
const PostsList = (props) => {
  //here we'll create an array of Post component (instantiations) using the posts passed as a prop. It will be important to set a key prop on the Post component (that will be the index of the posts array), the post prop will be the pojo that has the username and text
  const postItems = props.posts.map((post, index) => {
    return (
      <Post key={index} post={post} upVotePost={props.upVotePost} />
    )
  })

  //the posts-list will return a list with the inside being the postItems array we just created (filled with Post components)
  return (
    <ul className='col-md-6 list-group'>
      {postItems}
    </ul>
  )
}

export default PostsList