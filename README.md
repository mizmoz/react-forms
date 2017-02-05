# react-forms
ReactJS forms library for handling element creation, validation and history

This is in the very early stages of development so wouldn't recommend using unless you like the
pain of large, frequent changes to the API.

// Look at this implementation for the form handling
http://redux-form.com/6.1.0/examples/syncValidation/


### ColorPicker
```js
<ColorPicker
    value="#ffeeee"
    onChange={this.onChange}
    disableAlpha
/>
```

### Select

Select drop down
```js
<Select 
  name="food"
  onChange={onChange}
  options={options}
/>
```

Options 
```js
// Label only
const options = OrderedMap([
  ['Cheese'],
]);

// Label & value
const options = OrderedMap([
  ['Cheese', 'cheese'],
]);

// Groups
const options = OrderedMap([
  [
    'Dark Colours', OrderedMap([
      ['Black'],
      ['Navy Blue'],
    ]),
  ],
]);