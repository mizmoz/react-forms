
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import tinycolor from 'tinycolor2';
import KeyboardEvents from '../helper/KeyboardEvents';
import Base from './Base';
import ColorPickerComponent from '../component/color-picker/ColorPicker';
import Buttons from '../component/color-picker/Buttons';
import getColor from '../component/color-picker/getColor';
import Tooltip from '../component/Tooltip';

/**
 * Responsibilities:
 *
 */
export default class ColorPicker extends Base {
  constructor(props, context) {
    super(props, context);

    /**
     * Setup the state
     *
     * @type {*}
     */
    this.state = {
      focus: false,
      show: false,
      initialColor: '',
      color: getColor(props.value, props.palette),
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
    this.addEvent(document, 'click', this.onDocumentClick);
  }

  // shouldComponentUpdate = shallowCompare.bind(this, this, arguments[0], arguments[1]);

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

  /**
   * Close the picker
   */
  close = () => {
    this.setState({
      focus: false,
      show: false,
      initialColor: '',
    });
  };

  /**
   * Open the picker
   */
  open = () => {
    this.setState({
      show: true,
      focus: true,
      initialColor: this.state.color,
    });
  };

  /**
   * Handle the clicks / toggling the visibility
   *
   * @param event
   */
  onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!this.state.show) {
      return this.open();
    }

    return this.close();
  };

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
  };

  /**
   * Handle clicks on the document
   *
   * @param event
   */
  onDocumentClick = (event) => {
    if (!this.state.show) {
      // ignore as the picker is closed
      return;
    }

    if (this.picker !== event.target && !this.picker.contains(event.target)) {
      // click is outside of the popup so close the window
      this.close();
    }
  };

  /**
   * Close the window and reset the palette to the original colour
   *
   * @param event
   */
  onEscape = (event) => {
    event.preventDefault();

    if (this.state.initialColor !== this.state.color) {
      // reset the color
      this.props.onChange(this.props.name, this.state.initialColor);
    }

    // close the picker
    this.close();
  };

  /**
   * Focus
   *
   */
  onFocus = () => {
    this.setState({
      focus: true,
    });

    this.props.onFocus(this.props.name);
  };

  /**
   * Un-focus
   *
   */
  onBlur = () => {
    this.setState({
      focus: false,
    });

    this.props.onBlur(this.props.name);
  };

  /**
   * Get the tooltip
   *
   * @returns {string}
   */
  getToolTip = () => {
    const parts = [];
    const { title, value } = this.props;

    if (title) {
      parts.push(title);
    }

    if (value) {
      parts.push(value);
    }

    return parts.join(' - ');
  };

  /**
   * Render the color picker
   *
   * @return {XML}
   */
  renderColorPicker = () => {
    const className = ['react-forms-color-picker-popover'];

    if (this.props.position === 'top') {
      className.push('react-forms-color-picker-popover--top');
    }

    // create the props
    const props = {
      onChange: this.onChange,
      palette: this.props.palette,
      value: this.props.value,
      disableAlpha: this.props.disableAlpha,
    };

    return (
      <ReactCSSTransitionGroup
        transitionName="react-forms-color-picker-transition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        className={className.join(' ')}
      >
        {this.state.show ?
          <ColorPickerComponent {...props}>
            <Buttons>
              <button
                onClick={this.onClick}
                type="button"
              >Use</button>
              <button
                onClick={this.onEscape}
                type="button"
              >Cancel</button>
            </Buttons>
          </ColorPickerComponent> : null}
      </ReactCSSTransitionGroup>
    );
  };

  /**
   * Render the Text
   *
   * @returns {XML}
   */
  render() {
    const className = [
      'react-forms-color-picker',
    ];

    if (this.state.focus) {
      className.push('react-forms--focus');
    }

    const { name } = this.props;
    const brightness = tinycolor(this.state.color).getBrightness();
    const borderColor = (brightness > 200 ? '#dadadc' : 'transparent');

    const style = {
      backgroundColor: this.state.color,
      borderColor: borderColor,
    };

    return (
      <div
        className={className.join(' ')}
        ref={r => (this.picker = r)}
      >
        {this.renderColorPicker()}
        <Tooltip text={this.getToolTip()}>
          <button
            name={name}
            type="button"
            className="react-forms-color-picker-swatch"
            style={style}
            onClick={this.onClick}
          />
        </Tooltip>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  /**
   * Disable the alpha select
   */
  disableAlpha: PropTypes.bool,

  /**
   * Element blurred
   */
  onBlur: PropTypes.func,

  /**
   * Element is in focus
   */
  onFocus: PropTypes.func,

  /**
   * Default position to display the picker
   */
  position: PropTypes.string,

  /**
   * Colour palette
   */
  palette: ColorPickerComponent.propTypes.palette,

  /**
   * Element name
   */
  name: PropTypes.string,

  /**
   * Title for the element, this is used in the hover tooltip
   */
  title: PropTypes.string,

  /**
   * Value can either be a color string or a callback
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

ColorPicker.defaultProps = {
  /**
   * Show alpha by default
   */
  disableAlpha: false,

  /**
   * Called when the element blurs
   */
  onBlur: () => {},

  /**
   * Called when the element is in focus
   */
  onFocus: () => {},

  /**
   * Colour palette
   */
  palette: ColorPickerComponent.palette,
};
