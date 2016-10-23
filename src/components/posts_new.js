// /SRC/COMPONENTS/POSTS_NEW_REDUXFORMV6.JS
// https://www.udemy.com/react-redux/learn/v4/questions/1710878

import React, { Component, PropTypes } from 'react';
// Q. Hmm, no PropTypes, how get Router ?
// A. YEPPERS, gots to puts it back.
// import React, { Component } from 'react';

// ADD:
import { connect } from 'react-redux';

// import { reduxForm } from 'redux-form';
import { reduxForm, Field } from 'redux-form'; // FIELD is V6 !

import { Link } from 'react-router';

import { createPost } from '../actions';

// *** Define Functions that *types* of form Fields will invoke:

// const renderInput = () => ();
// Fat-arrow function, with implied { return () }
// Param passed-in: object describing field
const renderInput = (
  {
    input,
    label,
    type,
    meta: {
      touched,
      invalid,
      error
    }
  }
) => {
  return (
    <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
      <label>{label}</label>
      <input className="form-control" {...input} type={type} />
      <div className="text-help" style={ {color: 'red'} }>
        { touched ? error : '' }
      </div>
    </div>
  );
}

// Note: The 'error' herein is (magically) coming from the validate() funct we wrote and passed to ReduxForm. Cheers.
const renderTextarea = (
  {
    input,
    label,
    type,
    meta: {
      touched,
      invalid,
      error
    }
  }
) => (
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <textarea className="form-control" {...input} />
    <div className="text-help" style={ {color: 'red'} }>
      { touched ? error : '' }
    </div>
  </div>
);

class PostsNew extends Component {

  handleInitialize () {
    const initData = {
      "title": '',
      "categories": '',
      "content": '',
    };
    this.props.initialize(initData);
  }

  componentDidMount () {
    this.handleInitialize();
  }

/* HMM. Does the solution from fellow student not incorporate the router to go to '/' after submit?
Quite possibly. Let's see ...
YEPPERS.
I added (back) in our Promise-handling .then() :
*/
  handleFormSubmit (formProps) {
    this.props.createPost(formProps)

    .then( () => {
      // console.log("WR__ Hmm, no Context, Q. Do we get back from the Promise something? Anything? ..."); // A. not really. nothing referenceable here (near as I can tell. fine.)
      this.context.router.push('/');
    })
  }


/* HMM. Does the solution from fellow student not incorporate the router to go to '/' after submit?
Quite possibly. Let's see ...
YEPPERS.
I had to put (back) in this contextTypes stuff :
*/
  // CONTEXT stuff:
  // TO GET ACCESS TO REACT ROUTER!
  static contextTypes = {
    // this router is the <Router /> up on the /src/index.js!
    // That is the Context we will get.
    router: PropTypes.object
  }

/* HMM. Does the solution from fellow student not incorporate the router to go to '/' after submit?
Quite possibly. Let's see ...
YEPPERS.
*/
  // // HELPER FUNC
  // // PROPS for the FORM (not 'this.props')
  // onSubmit (props) {
  //   // to use this here, gotta BIND
  //   this.props.createPost(props)
  //   // Action generator (above) creates a PROMISE as its PAYLOAD
  //   // we "dot" (.) add the next step:
  //   .then( () => {
  //     // Promise is done, back, all set. :o)
  //     // Blog post has been created,
  //     // so, navigate to the index page!
  //     // by calling this.context.router.push with the path "/"
  //     this.context.router.push('/');
  //   })
  // }


  render () {
    // WAS: const { fields: { title, categories, content }, handleSubmit } = this.props;
    // As I understand it, this 'handleSubmit' is reserved word. Cheers.
    const { handleSubmit } = this.props;



    // This was breaking owing to my having ReduxForm v6 vs. v4.
    // ----------------------------
    // console.log("title V6 Biz: WR__ : ");
    // Sorry pal. "fields" isn't on props. let it go...
    // console.log(this.props.fields.title); //
    // console.log(this.props); // lot o' stuff, not for me.
    // console.log(title); //

// yeah this shows you the function, the function written by Redux people, not me...
    // console.log("handleSubmit WR__: ", handleSubmit); // what the hell is this ??
/*
handleSubmit WR__ orig code :o) :  handleSubmit(submitOrEvent) {
	        var _this2 = this;

	        var _props3 = this.props;
	        var onSubmit = _props3.onSubmit;
	        var fields = _props3.fields;
	        var form…
*/

    return (
/*
      <form onSubmit={handleSubmit(this.props.createPost)}>

      I believe the LEFT onSubmit attribute MUST have that name (HTML form rule, I think)
      The 'handleSubmit' I think MUST have that name (ReduxForm thing, I think?)
      The 'this.onSubmit' HELPER Func I think does NOT have to have that (mildly confusing) name. We'll sheck it out...
      */
      // WAS: <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h3>Create a new post! (using V6 ReduxForm woot.)</h3>

        <Field
          label="Title"
          name="title"
          type="text"
          component={renderInput} />

        <Field
          label="Categories"
          name="categories"
          type="text"
          component={renderInput} />

        <Field
          label="Content"
          name="content"
          component={renderTextarea} />
{/*
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>
*/}
{/*
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
*/}
{/*
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content (What you Write)</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
*/}
        <button type="submit" className="btn btn-primary">Submitify</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// I believe validate is reserverd word
// My code doesn't call it (explicitly)
// This whole ReduxForm thing (magically) calls your 'validate()'. Cheers.
// UNCHANGED for V6 vs. V4 ReduxForm. Cool.
function validate (values) {
  // to start, call 'em all Valid:
  const errors = {};

  if (!values.title) {
    // This errors.title value becomes title.error up above
    errors.title = 'Enter a title, pls. Grazie.';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories, pls. Grazie.';
  }
  if (!values.content) {
    errors.content = 'Enter some content, pls. Grazie.';
  }

  return errors;
}

// export default PostsNew;
// A LOT LIKE CONNECT()():
// "Decorate" the component with what's in first ()
// Then pass the component to all that reduxForm decorated special magic  in the second (). Voila.
// IT has INJECTED this stuff into PROPS. Cool.

/* *******
// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps

// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
 *************
*/

  // name on right is just unique; doesn't have to match Component name...
  // name on left MUST be form
// WAS: (V4)
// export default reduxForm({
//   form: 'PostsNewForm',
//   fields: [ 'title', 'categories', 'content' ],
//   validate
// }, null, { createPost })(PostsNew);

// NEW V6
const myReduxedFormFunctThatTakesAFormComponent = reduxForm(
  {
    form: 'PostsNewForm',
    validate,
  }
);

export default connect(
  null, // no mapStateToProps
  { createPost } // mapDispatchToProps. Puts createPost onto props (as I understand it...)
)(myReduxedFormFunctThatTakesAFormComponent(PostsNew));

/*
user types something in ...
ReduxForm records it on *application* state.

(cf. with how we did form before: recorded entered data on *Component* level state, right within the form fields)

e.g.: app state will look like:
state === {
  form: {
    PostsNewForm: {  <<<<< Hmmm, should that be PostsNew ?
      title: '....',
      categories: '....',
      content: '....'
    }
  }
}
*/
