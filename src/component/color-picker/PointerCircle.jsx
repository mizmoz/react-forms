
import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class PointerCircle extends Component {
  shouldComponentUpdate = shallowCompare.bind(this, this, arguments[0], arguments[1])

  /**
   * Render the pointer
   */
  render = () => (
    <div
      style={{ color: this.props.overlayColor }}
      className="react-forms-color-picker-component-pointer-circle"
    />
  );
}

PointerCircle.propTypes = {
  overlayColor: PropTypes.string,
};
