
import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Body from './Body';
import Palette from './Palette';
import getColor from './getColor';

/**
 * Responsibilities:
 *
 */
export default class ColorPicker extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      color: getColor(props.value, props.palette),
    };
  }

  /**
   * Update the state from the props
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const color = getColor(nextProps.value, nextProps.palette);

    if (color !== this.state.color) {
      this.setState({
        color,
      });
    }
  }

  shouldComponentUpdate = shallowCompare.bind(this, this, arguments[0], arguments[1]);

  /**
   * Set the colour
   *
   * @param color
   */
  onChange = (color) => {
    const value = (typeof color === 'string' ? color : color.hex);
    this.props.onChange(value);
  };

  /**
   * Render the picker
   *
   * @returns {XML}
   */
  render() {
    const props = Object.assign({}, this.props, {
      onChange: this.onChange,
      color: this.state.color,
    });

    return (
      <Body {...props}>
        {this.props.palette ? <Palette
          onChange={this.onChange}
          palette={this.props.palette}
          value={this.props.value}
          hex={this.state.color}
        /> : null}
        {this.props.children}
      </Body>
    );
  }
}

ColorPicker.propTypes = {
  /**
   * Child elements to be included in the color picker
   */
  children: PropTypes.element,

  /**
   * Disable the alpha selection
   */
  disableAlpha: PropTypes.bool,

  /**
   * Handle changes to the color
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Colour palette
   */
  palette: Palette.propTypes.palette,

  /**
   * Selected value, can be either the color or the swatch name
   */
  value: PropTypes.string,
};

ColorPicker.defaultProps = {
  /**
   * Colour palette
   */
  palette: Palette.palette,
};
