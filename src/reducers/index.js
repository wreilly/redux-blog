import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  // state: (state = {}) => state
  posts: PostsReducer,
  // MUST be 'form' on left !!!
  // http://redux-form.com/6.1.1/docs/GettingStarted.md/
  form: formReducer,
});

export default rootReducer;
