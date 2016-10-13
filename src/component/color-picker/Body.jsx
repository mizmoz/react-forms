
import React, { PropTypes, Component } from 'react';
import tinycolor from 'tinycolor2';
import { ColorWrap as colorWrap, Saturation, Hue, Alpha, EditableInput } from 'react-color/lib/components/common';

import Pointer from './Pointer';
import PointerCircle from './PointerCircle';

/**
 * Responsibilities:
 *
 */
class Body extends Component {
  /**
   * Render the picker
   *
   * @returns {XML}
   */
  render() {
    const brightness = tinycolor(this.props.hex).getBrightness();
    const overlayColor = (brightness > 175 ? '#525252' : '#FFF');

    const editableStyle = {
      wrap: {
        backgroundColor: this.props.hex,
      },
      input: {
        color: overlayColor,
      },
    };

    return (
      <div className="react-forms-color-picker-component">
        <div className="react-forms-color-picker-component-input">
          <EditableInput
            style={editableStyle}
            value={this.props.hex}
            onChange={this.props.onChange}
          />
        </div>
        <div className="react-forms-color-picker-component-saturation">
          <Saturation
            {...this.props}
            overlayColor={overlayColor}
            pointer={PointerCircle}
            onChange={this.props.onChange}
          />
        </div>
        <div className="react-forms-color-picker-component-sliders">
          <div>
            <Hue
              {...this.props}
              pointer={Pointer}
              onChange={this.props.onChange}
            />
          </div>
          {!this.props.disableAlpha ? <div>
            <Alpha
              {...this.props}
              pointer={Pointer}
              onChange={this.props.onChange}
            />
          </div> : null}
        </div>
        {this.props.children}
      </div>
    );
  }
}

Body.propTypes = {
  /**
   * Disable the alpha selection
   */
  disableAlpha: PropTypes.bool,

  /**
   * Hex colour passed by the colorWrap HOC
   */
  hex: PropTypes.string,

  /**
   * Handle changes to the color
   */
  onChange: PropTypes.func.isRequired,

  /**
   * RGB colour passed by the colorWrap HOC
   */
  rgb: PropTypes.string,

  /**
   * Pass extra fields in using the children
   */
  children: PropTypes.element,
};

export default colorWrap(Body);
