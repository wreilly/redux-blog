import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions'; // /index ?

// reduxForm provides us form stuff on props
/*
Apparently, 'handleSubmit' is one name you gotta use.
okay.

wr__handleSubmit WR__ orig code :o) :  undefined
bundle.js:34362 Uncaught TypeError: wr__handleSubmit is not a function
*/
/* ReduxForm magic 'n shit.
1. Hmm, at beginning here, what are props?
Where are they coming from?
How do they get here ?

2. However props get here, apparently they're here.
Grab stuff off props and make consts - field names (e.g. 'title'), and, the hard-coded reserved word method 'handleSubmit'.
okay.

3. If you console.log these things (title; handleSubmit) you see they are magical Objects with all sorts of stuff.
ReduxForm stuff.

4.
<form onSubmit={handleSubmit(this.props.createPost)}>
When user clicks Submitify, the form onSubmit says, "okay Mr. handleSubmit, get to work." What we code up to be passed in here is our action generator ("createPost").

Hmm. We did import { createPost } above, so I would have thought we'd do:
<form onSubmit={handleSubmit(createPost)} >
but apparently no, even though we did import, you gots to reference it through this.props: this.props.createPost.
Clear as mud.

Huh. waddayano. It *did* work. Hmm.
=====================
{title: "createPost instead of this.props.createPost", categories: "tennis, doesitwork",…}
categories
:
"tennis, doesitwork"
content
:
"does it work doesitwork"
title
:
"createPost instead of this.props.createPost"
=====================

5. So we pass in that createPost action generator - okay.
But ReduxForm also takes care of slinging over whole Objects full of stuff, props, you name it, to pass along to that action generator, over in /src/actions/index.js for createPost(props).
So all the fields and hootenanny and all that jazz is over there in the action generator.

6. Then the action generator does all that good calling out to axios to hit the API URL for a POST, AND it sends along all the props you could ever wish for, AND the API gets all the fields it needs and so forth.

7. And since you and I had nothing to do with coding that API, we have no idea really what is in that opaque props etc. etc. BUT we know that the clever fellows who did it got all the fields they need to sock away the blog entry and all etc. etc. etc.

8. And so the response comes a'roarin' back and all and lo AND behold there is our data: same stuff we sent. (What's the point you may well ask.) It's in a payload, and that gets returned to the calling method, & all that doo-hickey whatsits.

DONE.
Sort of.
For now.

Next up: doing something here on the client with the data we just socked away on the server/database.


*/
class PostsNew extends Component {

  render () {
    // const {
    //   fields: {
    //     title,
    //     categories,
    //     content
    //   },
    //   handleSubmit
    //  } = this.props;
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    /* Various ways to pull stuff off props ...
      Equivalent to above!

      const title = this.props.fields.title;
      etc.

      AND/OR:

      fields: {
        title: title,
        categories: categories,
        content: content
      },

    */



    // This was breaking owing to my having ReduxForm v6 vs. v4.
    // ----------------------------
    // Nope: console.log("fields.title: ", fields.title);
    console.log("title WR__ orig code :o) : ", title); // undefined ... ?
    // console.log(title); //

    console.log("handleSubmit WR__ orig code :o) : ", handleSubmit); // what the hell is this ??
/*
handleSubmit WR__ orig code :o) :  handleSubmit(submitOrEvent) {
	        var _this2 = this;

	        var _props3 = this.props;
	        var onSubmit = _props3.onSubmit;
	        var fields = _props3.fields;
	        var form…
*/



    return (
      <form onSubmit={handleSubmit(createPost)}>
        <h3>Create a new post!</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
{/*          <input type="text" className="form-control" /> */}
{/*          <Field type="text" className="form-control" /> */}
        </div>
        <div className="form-group">
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
        </div>
        <div className="form-group">
          <label>Content (What you Write)</label>
          <input type="text" className="form-control" {...content} />
        </div>
        <button type="submit" className="btn btn-primary">Submitify</button>
      </form>
    );
  }
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
export default reduxForm({
  form: 'PostsNewForm',
  fields: [ 'title', 'categories', 'content' ]
}, null, { createPost })(PostsNew);

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
