
import React, { Component, PropTypes } from 'react';

import Palette from '../color-picker/Palette';

export default class ColorPalette extends Component {
  render() {
    return (
      <div className="react-forms-color-picker-component">
        <Palette
          palette={this.props.palette}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        {this.props.children}
      </div>
    );
  }
}

ColorPalette.propTypes = {
  /**
   * Allow children to be passed for things like buttons etc.
   */
  children: PropTypes.node,

  /**
   * The colours in the palette
   */
  palette: Palette.propTypes.palette,

  /**
   * Palette color or swatch name
   */
  value: PropTypes.string,

  /**
   * handle changes
   */
  onChange: PropTypes.func.isRequired,
};
