import React, {Component} from 'react';
import PostForm from './post-form';
import PostsList from './posts-list';

//We first put all the static html from our project reddit inside the App component. The next step is to break apart the page into components. (see diagram in Day1 Lesson2). There will be an outermost app component, a post-form component (with the input fields), a post-list component that contains all the posts, and a post component, that is one post. First we'll take out all the code for the form and place it inside another file (post-form.js), export the PostForm component from that file, import the PostForm component above and lastly, put the PostForm instantiation inside the render/return (<PostForm />) in the same place it originally was.

//By now we've created the post-form component and we have it set up to have a state and that state is set by the change in values in the input fields (user and text). We want that data available across our application, so we need a constructor and state for the App component as well. The state for the App will be the array that holds all the posts
class App extends Component {
  constructor () {
    super()

    this.state = {
      posts: [
        { text: 'I like cheese', user: 'Aaron', upvotes: 0}
      ], 
      showPosts: true
    }
    //anytime we want to use 'this' inside a function (like addPost), we need to bind the function to the component like so:
    this.addPost = this.addPost.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)
  }


  //we need a way to access the state (user,text) of the post form, a way to pass up that data from postForm to app so that we can store the post in the post array (the state of the app). We'll do this by adding a function in App that we can pass as a prop (in the PostForm instantiation). After we pass the function to postForm we'll update the handleClick function to use it. The handle click will create a post object based on the form's state and pass the post pojo (user, text) back through this function. Now we just add the post to the app state's post array. We need to treat the posts array as immutable, meaning we can't change the original posts array (using push would do this), map/filter/concat are safe because they return new array objects instead of changing the current one. The reason state should be immutable is that React works by saving previous and current copies of state, it compares the two states and renders changes based on that. setState is more of a request to compare and trigger render on changes it sees.

  //Now that we can update our App state (a posts array), we want to pass that state to the post-list so the posts can be rendered. We'll create a simple post-list component and instantiate it in render and pass the posts from state to post-list as a prop (make sure to also import post-list at the top)
  addPost (post) {
    this.setState({posts: this.state.posts.concat([post])});
  }

  upVotePost (post) {
    //we want to somehow get the post to invoke a function here on the app component, we need to pass this function down to postList
  }

  //following the rules of data flow, we need to update the state, when the state changes the render will either hide or show the posts
  handleHideClick () {
    this.setState({showPosts: !this.state.showPosts})
  }

  render() {
    //We will add a function to render to check to if the showPosts is true or false, if true, then we will reeturn the PostsList component (need to add a jsx function to call render posts, see below)
    const renderPosts = () => {
      if (this.state.showPosts) {
        return <PostsList posts={this.state.posts} upVotePost={this.upVotePost} />
      }
    }

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="page-header">
            <h1>Project Reddit</h1>
          </div>

          <button onClick={this.handleHideClick}>Hide Posts</button>

          {renderPosts()}

          <PostForm addPost={this.addPost} />

        </div>
      </div>
    );
  }
}

export default App;