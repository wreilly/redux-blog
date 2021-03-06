// *** next line is for when this was just a Stateless functional component:
// import React from 'react';
// Now upgraded to ES6 Class:
import React, { Component } from 'react';

import { connect } from 'react-redux';
// not used ultimately:
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
// Link becomes HTML <a /> tag (anchor)
import { Link } from 'react-router';

// WAS: Stateless functional component
// import React from 'react';
// export default () => {
//   return <div>This is a LIST of blog posts ... </div>;
// }


/* ******** CONTAINER ******
NOW: Change from mere Component to a Container:
1. Container has data to attend to
- talks to Redux / store / props / state
2. So: import:
- connect
- bindActionCreators
- your action generators (fetchPosts)

3. Then
- mapDispatchToProps()
- bindActionCreators()
- is "connect"ed
- mapStateToProps (when needed)

4. Finally - note at bottom we did some ES6 shortcuttery and eliminated some of the above (bindActionCreators in particular)
oo-la
mo' magic
*/


// NOW: ES6 Class:
class PostsIndex extends Component {

  // On first page load
  // Not on subsequent ... (?)
  // However: When I used browser button to manually indicate a ReLoad, it did redo this message ... jus' sayin'
  componentWillMount() {

    console.log("WR__ Here you'd call an Action Creator! or Generator! to hey fetch posts!");

    // Gets 'em all:
    this.props.fetchPosts();
  }

  renderPosts() {
    // ?? Q. Where does this 'posts' come from?
    // A. Oh. Down below in mapStateToProps we bothered to rename the STATE 'all' to PROPS 'posts'. And why not.
    return this.props.posts.map( (post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      )
    })
  }

  // ES6 Class:
  render () {
    return (
      <div>
        <p>
        ES6 Class PostsIndex Component - pretend this is a List of Blog Posts!
        </p>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post!
          </Link>
        </div>
        <h3>All Our Blessed POSTS</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

/* ** REFACTOR **  (See below) */
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators( { fetchPosts }, dispatch);
// }


function mapStateToProps(state) {
  // LIST of all posts is on 'all', on the STATE
  // Note also : state.posts is a STRUCTURE, that holds both state.posts.all (All of 'em) AND state.posts.post (the Active one). fwiw.
  // Here, we sort of rename that "all" from STAT to become "posts" on PROPS. What the hell.
  return { posts: state.posts.all };
}

// ES6 Class:
// export default connect(null, mapDispatchToProps)(PostsIndex);
/* ** REFACTOR ** */
// export default connect(null,  { fetchPosts: fetchPosts })(PostsIndex);
/* ** REFACTOR ** */
// More ES6 shortcuttery:
export default connect(mapStateToProps,  { fetchPosts })(PostsIndex);
