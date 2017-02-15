
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import KeyboardEvents from '../helper/KeyboardEvents';
import Base from './Base';
import Swatch from '../component/color-picker/Swatch';
import ColorPaletteComponent from '../component/color-palette/ColorPalette';
import getColor from '../component/color-picker/getColor';

export default class ColorPalette extends Base {
  /**
   * Init and setup the events
   *
   * @param props
   * @param context
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      focus: false,
    };

    /**
     * Setup the global event handlers
     */
    const events = new KeyboardEvents();

    // escape key to cancel
    events.addEscapeKey(this.onEscape);

    // enter key to select and close
    events.addEnterKey((e) => {
      // prevent default otherwise the button will re-open it instantly
      e.preventDefault();
      this.close();
    });

    // only apply the keys when the picker is open
    events.when(() => this.state.show);

    // add key events
    this.addEvent(document, 'keydown', events.handle);
  }

  /**
   * Handle the clicks / toggling the visibility
   *
   */
  onClick = () => (this.state.show ? this.close() : this.open());

  /**
   * Handle the cancel click
   *
   * @param event
   */
  onCancel = (event) => {
    event.preventDefault();
    this.close();
  };

  /**
   * Set the colour
   *
   * @param color
   */
  onChange = (color) => {
    this.props.onChange(this.props.name, color);
    this.close();
  };

  /**
   * Close the picker
   */
  close = () => {
    this.setState({
      focus: false,
      show: false,
    });
  };

  /**
   * Open the picker
   */
  open = () => {
    this.setState({
      show: true,
      focus: true,
    });
  };

  /**
   * Close the window and reset the palette to the original colour
   *
   * @param event
   */
  onEscape = (event) => {
    event.preventDefault();
    this.close();
  };

  /**
   * Render the palette
   *
   * @returns {XML}
   */
  renderColorPalette() {
    const { show } = this.state;
    const { palette, position, value } = this.props;
    const className = ['react-forms-color-picker-popover'];

    if (position === 'top') {
      className.push('react-forms-color-picker-popover--top');
    }

    // create the props
    const props = {
      onChange: this.onChange,
      palette: palette,
      value: value,
    };

    return (
      <ReactCSSTransitionGroup
        transitionName="react-forms-color-picker-transition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className={className.join(' ')}
      >
        {show ? <ColorPaletteComponent {...props} /> : null}
      </ReactCSSTransitionGroup>
    );
  }

  /**
   * Render the color palette form element
   *
   * @returns {XML}
   */
  render() {
    const { palette, value } = this.props;
    const color = getColor(value, palette);

    return (
      <div className="react-forms-color-picker">
        {this.renderColorPalette()}
        <Swatch
          color={color}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

ColorPalette.propTypes = {
  name: PropTypes.string.isRequired,

  /**
   * Change handler
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Color palette
   */
  palette: ColorPaletteComponent.propTypes.palette,

  /**
   * Position the popover relative to the swatch
   */
  position: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Value can either be a color string or a callback
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

ColorPalette.defaultProps = {
  position: 'bottom',
};
