import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router';

class PostsShow extends Component {

  // Like in posts_new.js
  // Refers to the router defined here: this.context.router;
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount () {
    this.props.fetchPost(this.props.params.id);
  }
/*
http://127.0.0.1:8080/posts/7878
Show this post! 7878
*/

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
    .then( () => {
      // after successful deletion ... (I am assuming that even humble (quick) Delete is via a Promise). Yep.
      this.context.router.push("/"); // Back to homepage for you!
    });
  }

  render() {
    const { post } = this.props;

    console.log("WR__ this.props.post: ", this.props.post);

    // For network latency!
    if (!this.props.post) {
      return <div>Solly! Roading...!</div>;
    }

    return (
      <div>
        <p>Show this post!</p>
        <Link to="/">Home</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >Delete This Post!</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p> {this.props.params.id}</div>
    )
  }

}

// Yeah, you MUST name this function like so (to work with react-redux):
function mapStateToProps(state) {
  /*
  // Q. "currently selected post" ( ?? )
  // That is, from that remark, I thought S. Grider (Instructor) meant, "Okay people, from out of that collection of ALL possible posts, the system has gone through that collection and has indicated which of THOSE is the 'currently active post'."
  But no.
  That is not what is happening here.
  (And that is not what S. Grider was saying.)
  Instead, it is: "Okay people, remember back up at the top of designing the whole Structure of our Application State? In reducer_posts.js? That's right. That is where we DESIGNED this to be: state.all is ALL the posts, and, state.post to be (somehow don't ask me how) to be the CURRENT/ACTIVE post. Voila."
  So, NO "going over" ALL the posts to find the Active one. No.
  Somehow (don't ask me how) the State at I guess any given moment has a read on 1) ALL the posts (fine), and 2) WHICH post is the Current/Active one.
  But you in your app don't need to A) handle the list of ALL posts and then B) figure out which of those is the Active one. No. The State already knows that for you, from our data design.
  Ta-da.
  // A. See above.

Also:
state.posts   --> N.B.  THIS thing is NOT the "list of posts" nor "all the posts". No. It is this structure:
  state.posts.all  --> all of the posts
  state.posts.post --> one post.  Somehow (don't ask me how) the state knows which one is current/active.

  */
  console.log("WR__ mapStateToProps() state.posts.post: ", state.posts.post);
  /* worked, like a Charm:
Object {id: 36838, title: "All Validated Up!", categories: "basketball", content: "Nobodaddy"}
categories:
"basketball"
content:
"Nobodaddy"
id:
36838
title:
"All Validated Up!"
  */

  console.log("WR__ 02 mapStateToProps() state.posts: ", state.posts);

/*
 Object { all: Array[0], post: Object}
 all: Array[0]length: 0

 post: Object
 categories: "basketball"
 content: "Nobodaddy"
 id: 36838
 title: "All Validated Up!"
*/

  return { post: state.posts.post };
}

/* *******
// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
*/
// null (so far) for mapStateToProps.
// for mapDispatchToProps, we send in { fetchPost: fetchPost }
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
