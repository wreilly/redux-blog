// *** Stateless functional component
// import React from 'react';
// ES6 Class:
import React, { Component } from 'react';

import { connect } from 'react-redux';
// not used ultimately:
// import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

// Stateless functional component
// import React from 'react';
// export default () => {
//   return <div>This is a LIST of blog posts ... </div>;
// }


/* ******** CONTAINER ******
Change from mere Component to a Container:
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


// ES6 Class:
class PostsIndex extends Component {

  // On first page load
  // Not on subsequent ... (?)
  // When I used browser to ReLoad it did redo this message ...
  componentWillMount() {

    console.log("WR__ Here you'd call an Action Creator! or Generator! to hey fetch posts!");

    // Gets 'em all:
    this.props.fetchPosts();
  }

  // ES6 Class:
  render () {
    return (
      <div>ES6 Class PostsIndex Component - List of Blog Posts!</div>
    );
  }
}

/* ** REFACTOR **  (See below) */
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators( { fetchPosts }, dispatch);
// }


// ES6 Class:
// export default connect(null, mapDispatchToProps)(PostsIndex);
/* ** REFACTOR ** */
// export default connect(null,  { fetchPosts: fetchPosts })(PostsIndex);
/* ** REFACTOR ** */
// More ES6 shortcuttery:
export default connect(null,  { fetchPosts })(PostsIndex);
