import { FETCH_POSTS, FETCH_POST  } from '../actions/index';


/*
Thinking through ... the:
STRUCTURE OF OUR STATE:
1. "all"
[{},{},...]
List of blog posts
3 fields

2. "post"
{}
Active post
4 fields

Note, re: above.
Then, this whole "Structure" gets mapped or referenced or named or whatever you like, as:
"posts" in the /src/reducers/index.js file.

posts: postsReducer  <<< postsReducer being the contents of THIS file /src/reducers/reducer_posts.js

Therefore, the state overall becomes:
state.posts   --> N.B.  THIS thing is NOT the "list of posts" nor "all the posts". No. It is this structure:
  state.posts.all  --> all of the posts
  state.posts.post --> one post.  Somehow (don't ask me how) the state knows which one is current/active.

*/

// default initial values
const INITIAL_STATE = {
  all: [], // also could have been simply null, but [] provides hint
  post: null,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        // The API call returns 'data' for our blog info:
        all: action.payload.data,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload.data
      }

    default:
      return state;
  }
}

/* Chrome DevTools | Network | XHR:

GET /api/posts?abcdefghijklmnop HTTP/1.1
Host: reduxblog.herokuapp.com
Accept: application/json, text/plain, ...
Origin: http://127.0.0.1:8080
DNT: 1
Referer: http://127.0.0.1:8080/

DNT? :
https://en.wikipedia.org/wiki/Do_Not_Track#Effectiveness

[{"id":36654,"title":null,"categories":null},{"id":36596,"title":"sup bro, check the detail","categories":"react redux"},{"id":36562,"title":"Title tennis fun","categories":"tennis"},{"id":36523,"title":"test title","categories":"fsdfds"},{"id":36521,"title":"test title","categories":"fsdfds"},{"id":36507,"title":"Test 2","categories":"rr"},{"id":36506,"title":"test 1","categories":"rr"},{"id":36479,"title":"dzdzdzdz","categories":"sasasas"},{"id":36476,"title":"qssqqssqsqqsqs","categories":null},{"id":36475,"title":"qssqqssqsqqsqs","categories":null}]
*/
