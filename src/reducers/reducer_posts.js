import { FETCH_POSTS } from '../actions/index';

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
        all: action.payload.data,
      };

    default:
      return state;
  }
}

/*
STRUCTURE OF OUR STATE:
1. "all"
[{},{},...]
List of blog posts
3 fields

2. "post"
{}
Active post
4 fields
*/
