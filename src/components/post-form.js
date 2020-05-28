import React, {Component} from 'react';

//now that we've separated the form as a separate component, we need to add a click handler and function to handle the click of the post button. Because we want our form to handle data and accept input, which affects the condition of the overall app, we want it to have state, so we need to have a constructor to the PostForm class. The postForm only cares about the text input fields, it doesn't care about keeping track of all the posts, so we just limit its state to user and text - keep the components dumb and unaware of each other
class PostForm extends Component {
  constructor () {
    //we have to call super before we can use 'this' in the constructor and set the state for the component
    super()

    //this is where we store data on a component. If any data in the state object changes, a render is automatically triggered (no listener code needed!). It's important to note that whenever we change the state of a component we MUST use 'setState' not this.state directly
    this.state = {
      user: '',
      text: ''
    }
//anytime we want to use 'this' inside a function (like handleClick), we need to bind the function to the component
    this.handleClick = this.handleClick.bind(this)
  }

  
 //now that the addPost function has been passed down as a prop from App, we can access it here, to create a new post based on the info in the state and by putting post inside addPost as an argument, we have access to the post in App
  handleClick () {
    const post = {
      user: this.state.user,
      text: this.state.text
    }

    this.props.addPost(post);
  }

  render() {
    //make sure to update the values of the inputs to point to the properties of the state
    //since our state is based on our inputs, we need to add onChange event listeners to the inputs, note the shortened es6 syntax, when the user types, the state is updated and render is triggered
    return (
      <form className="post-form">
      <h3>Add a New Post</h3>

      <div className="form-group">
        <input
        value={this.state.text} 
        onChange={event => this.setState({text: event.target.value})}
        type="text" id="post-text" className="form-control" placeholder="Post Text"/>

        <br/>

        <input
        value={this.state.user} 
        onChange={event => this.setState({user: event.target.value})}
        type="text" id="post-user" className="form-control" placeholder="Your Name"/>
      </div>

      <button onClick={this.handleClick} type="button" className="btn btn-primary add-post">Post</button>
    </form>
    )
  }
}

export default PostForm;