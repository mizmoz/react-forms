# React-forms changes

## v0.5.5

- Fix default value for TextArea not populating the field
- Add onPaste handler to fire the onChange event and update the value

## v0.5.4

- Fix text area not firing the focus state change

## v0.5.3

- Add text area like field. Actually uses content editable to easily expand to the size of the content
- Allow style object to be passed to Group and Control components

## v0.5.2

- Add ability to set ID on Group and Control components

## v0.5.1

- Fix ColorPalette so it only marks a swatch as selected if the name matches if it's named or 
colour if it is not
- Fix slider width so it doesn't change size when going between different digit numbers such as 9 -> 10

## v0.5.0

- Add support for optgroup in Select
- Changed the order of values for the OrderedMap to `[label, value]` or alternatively just `label]`
If you're currently using the Select this will break it!
