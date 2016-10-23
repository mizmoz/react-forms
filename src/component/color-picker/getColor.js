/**
 * Get the color from the value or palette
 *
 * @param value
 * @param palette
 * @returns {*}
 */
export default (value, palette) => {
  if (!value) {
    return '#ffffff';
  }

  if (value.search(/^#[a-f0-9]{3,6}$/i) === 0) {
    // value is a colour
    return value;
  }

  // lookup the value in the palette if one is provided
  return palette.findEntry(s => s.get('value') === value)[1]
    .get('color');
};
