# React-forms changes

## v0.5.2

### New

- Add ability to set ID on Group and Control components

## v0.5.1

### Bugs

- ColorPalette now only marks a swatch as selected if the name matches if it's named or 
colour if it is not
- Make slider fixed width so it doesn't change size when going between different digit numbers such as 9 -> 10

## v0.5.0

### New

- Added a changelog!
- Add support for optgroup in Select

### Changes

- Changed the order of values for the OrderedMap to `[label, value]` or alternatively just `label]`
If you're currently using the Select this will break it!
