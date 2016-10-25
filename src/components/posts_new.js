/* LODASH REFACTORING - DONE
Working through Lecture 99
posts_new_reduxformV4LODASH.js
D'oh!
"Don't forget to (re-)npm install redux-form@4 !!! !!!"
oy.
*/

// *** LODASH stuff:
import _ from 'lodash';

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions';

// *** LODASH stuff:
// Ah-hah. My 'fieldName' is unnecessary:
  // Very clever. "keys" grabs you those "fieldNames".
  // fields: _.keys(FIELDS),
  // Gives you array. Just what you need.

const FIELDS = {
  title: {
    fieldName: 'titleName',
    type: 'input',
    label: 'Title',
    //validate: field-level funct() // option
  },
  categories: {
    fieldName: 'categoriesName',
    type: 'input',
    label: 'Add some categories',
  },
  content: {
    fieldName: 'contentName',
    type: 'textarea',
    label: 'Enter content',
  },
}


// reduxForm provides us form stuff on props
class PostsNew extends Component {

  // CONTEXT stuff:
  // TO GET ACCESS TO REACT ROUTER!
  static contextTypes = {
    // this router is the <Router /> up on the /src/index.js!
    router: PropTypes.object
  }

  // HELPER FUNC
  // PROPS for the FORM (not 'this.props')
  onSubmit (props) {

    // LODASH testing simplification
    // alert("Yes you posted!");
    // return;

    // to use this here, gotta BIND
    this.props.createPost(props)
    // Action generator (above) creates a PROMISE as its PAYLOAD
    // we "dot" (.) add the next step:
    .then( () => {
      this.context.router.push('/');
    })
  }

  // Hmm, looks to be like that damned _.each() bit down below....
    // _.each(FIELDS, (individualFieldObject, keyForThatIndividualFieldObject) => {
  renderField (fieldConfig, field) {

    // This "helper" is the object from reduxForm.
    /* *******
    e.g.
    Object
active:
false
defaultChecked:
false
defaultValue:
undefined
dirty:
false
error:
"Enter title pls."
initialValue:
undefined
invalid:
true
name:
"title"
onBlur:
(event)
onChange:
(event)
onDragStart:
(event)
onDrop:
(event)
onFocus:
()
onUpdate:
(event)
pristine:
true
touched:
false
valid:
false
visited:
false

    */
    const fieldHelper = this.props.fields[field];


    console.log("WR__ 99 this.props.fields ? ", this.props.fields); // Object that has title obj, categories obj, content obj
    console.log("WR__ 98 this.props.fields[field] ? ", this.props.fields[field]); // Obj for title has name: "title" etc.
    console.log("WR__ 97 this.props.fields.field ? ", this.props.fields.field); // undefined
    console.log("WR__ 96 this.props.fields[field].name ? ", this.props.fields[field].name); // title  (good)
// key={fieldHelper.name}
// Notes:
// 1) Gots to be on the outermost DIV of whatever you're stacking up in your list, kid. (outer div, not that other one just inside. who knew)
// 2) Gots to be called "key" I'm sure, but, for super-duper-tip-top security and all that bananabiz, this attribute "key" is NOT shown in the view "source" /elements thing. Also Who Knew.
    return (
      <div key={fieldHelper.name} >

        <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
          <label>{fieldConfig.label}</label>
          <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
          <div className="text-help">
            {fieldHelper.touched ? fieldHelper.error : ''}
          </div>
        </div>
        {/*
        // <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
        //   <label>Title</label>
        //   <input type="text" className="form-control" {...title} />
        //   <div className="text-help">
        //     {title.touched ? title.error : ''}
        //   </div>
        // </div>
        */}
      </div>
    )
  }

  render () {
    console.log("WR__ 00 this.props ? ", this.props);
    console.log("WR__ 00A this.props.fields ? ", this.props.fields); // Object. title; content; categories on it.
    console.log("WR__ 00B this.props.fields.categories ? ", this.props.fields.categories); // Object. name: "categories"
    console.log("WR__ 00C this.props.fields.categories.label ? ", this.props.fields.categories.label); // undefined. all right.

    const { fields: { title, categories, content }, handleSubmit } = this.props;

    const wmTitle = this.props.title;
    console.log("WR__ wmTitle this.props.title hmm, ", wmTitle); // undefined

    const wmTitle02 = this.props.fields.title;
    console.log("WR__ wmTitle02 this.props.fields.title hmm, ", wmTitle02); // yep. whole object

    const wmTitle03 = title;
    console.log("WR__ wmTitle03 title hmm, ", wmTitle03); //  yep. whole object

    const wmTitle04 = title[name];
    console.log("WR__ wmTitle04 title[name] hmm, ", wmTitle04); //  undefined

    const wmTitle05 = title.name;
    console.log("WR__ wmTitle05 title.name hmm, ", wmTitle05); //  undefined

    // console.log("WR__ 01 fields ? ", fields); // bundle.js:34546 Uncaught ReferenceError: fields is not defined(…)
    console.log("WR__ 02 handleSubmit? ", handleSubmit);
    // console.log("WR__ 03 fields.title ? ", fields.title);
    console.log("WR__ 04 title ? ", title);

    // *** LODASH stuff: (get our fields from other const ?) (no longer off this.props ??) Hmm.
    // ??? const { handleSubmit } = this.props;

    // console.log("title WR__ orig code :o) : ", title); //

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post!</h3>

        {_.map(FIELDS, this.renderField.bind(this))}
{/*
        // <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
        //   <label>Title</label>
        //   <input type="text" className="form-control" {...title} />
        //   <div className="text-help">
        //     {title.touched ? title.error : ''}
        //   </div>
        // </div>
        // <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
        //   <label>Categories</label>
        //   <input type="text" className="form-control" {...categories} />
        //   <div className="text-help">
        //     {categories.touched ? categories.error : ''}
        //   </div>
        // </div>
        //
        // <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
        //   <label>Content (What you Write)</label>
        //   <textarea type="text" className="form-control" {...content} />
        //   <div className="text-help">
        //     {content.touched ? content.error : ''}
        //   </div>
        // </div>
*/}
        <button type="submit" className="btn btn-primary">Submitify</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// *** LODASH stuff:
function validate (values) {
  // to start, call 'em all (in)Valid:
  const errors = {};

// https://lodash.com/docs/4.16.4#forEach
// "type" is the configuration object. Hmm.
// Apparently you can call that fucking thing ANYTHING you care.
// Sorry. "type" is a STUPID choice.
// "field" is the fieldname.  yaddaya...
// Apparently you can call that fucking thing ANYTHING you care, ALSO.
// But, you can NOT leave off the first one. Hmmph.

/* Okay, so for this collection, the _.each grabs the title: {} for "each" "foobartype" below, and it grabs the goddamned KEY for the "bazbatfield" below.
Sorry (not really): WHY (the fuck) cannot the professor make these kinds of things PLAIN.
Or for that god-damned matter the god-damned & useless lodash documenstupidfuckingtation.
https://lodash.com/docs/4.16.4#forEach
const FIELDS = {
  title: {
    fieldName: 'titleName',
    type: 'input',
    label: 'Title',
  }, ...
*/

  // _.each(FIELDS, (type, field) => {
  // _.each(FIELDS, (individualFieldObject, keyForThatIndividualFieldObject) => {
  _.each(FIELDS, (foobartype, bazbatfield) => {
    console.log("WR__ having the fun. foobartype, bazbatfield: ", foobartype, bazbatfield);
    if (!values[bazbatfield]) {
      errors[bazbatfield] = `Enter ${bazbatfield} pls.`;
    }
  });

  // if (!values.title) {
  //   // This errors.title value becomes title.error up above
  //   errors.title = 'Enter a title, pls. Grazie.';
  // }
  // if (!values.categories) {
  //   errors.categories = 'Enter categories, pls. Grazie.';
  // }
  // if (!values.content) {
  //   errors.conten  t = 'Enter some content, pls. Grazie.';
  // }

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
export default reduxForm({
  form: 'PostsNewForm',
  // *** LODASH stuff:
  // "fields:" here has to be an Array of Strings
  // Very clever. "keys" grabs you those "fieldNames".
    // Gives you array. Just what you need.
  fields: _.keys(FIELDS),
  // fields: ['title', 'categories', 'content'],
  validate
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
