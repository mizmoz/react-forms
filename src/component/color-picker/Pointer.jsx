
import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Pointer extends Component {
  shouldComponentUpdate = shallowCompare.bind(this, this, arguments[0], arguments[1]);

  /**
   * Render the pointer
   */
  render = () => (
    <div className="react-forms-color-picker-component-pointer" />
  );
}
