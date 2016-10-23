import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// const Greeting = () => {
//   return <div>Halloo!</div>;
// };

/* ReactRouter is SO SMART.
Just give it:
    <Route path="posts/:id" component={PostsShow} />
and it will do this FOR YOU:
  this.props.params.id  .... is what that /:id will find

Gets it right out of the URL. Whoa.

  path="mything/:banana" ... gets this.props.params.banana
  gwoovy.
*/
export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />

{/*
    // <Route path="greet" component={Greeting} />
    // <Route path="greet2" component={Greeting} />
    // <Route path="greet3" component={Greeting} />
*/}
  </Route>
);
