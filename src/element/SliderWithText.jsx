
import React, { PropTypes } from 'react';
import Base from './Base';
import Text from './Text';

/**
 * Create a number and unit input for things like CSS values
 * where a text input would be 10 and select allow %, px, em, rem etc
 *
 */
export default class SliderWithText extends Base {
  /**
   * Init the form state
   *
   * @type {{}}
   */
  state = {
    number: SliderWithText.getNumber(this.props.value),
    unit: SliderWithText.getUnit(this.props.value),
    focus: false,
  };

  /**
   * Check if we need to update the state
   *
   * @param nextProps
   */
  componentWillReceiveProps = (nextProps) => {
    const nextState = {
      number: SliderWithText.getNumber(nextProps.value),
      unit: SliderWithText.getUnit(nextProps.value),
      focus: this.state.focus,
    };

    if (nextState.number !== this.state.number || nextState.unit !== this.state.unit) {
      this.setState(nextState);
    }
  };

  /**
   * Get the number part of the value
   *
   * @param value
   * @returns {number}
   */
  static getNumber(value) {
    if (!value) {
      return 0;
    }

    if (typeof value === 'number') {
      return value;
    }

    const number = Number(value.split(/^([-0-9]*)/)[1]);
    return (number.toString() === 'NaN' ? 0 : number);
  }

  /**
   * Get the unit part of the value
   *
   * @param value
   * @returns {*}
   */
  static getUnit(value) {
    if (!value || typeof value === 'number') {
      return '';
    }

    const unit = value && value.split(/^([-0-9]*)/)[2];
    return (unit || '');
  }

  /**
   * Focus
   *
   * @param event
   */
  onFocus = () => {
    this.setState({
      focus: true,
      initialUnit: this.state.unit,
    });
  };

  /**
   * Un-focus
   *
   */
  onBlur = () => {
    this.setState({
      focus: false,
    });

    // make sure we've updated the props before we finish
    this.changeProps(this.state.number, this.state.unit);
  };

  /**
   * Handle changes to the element
   *
   * @param event
   */
  onChange = (event) => {
    const number = SliderWithText.getNumber(event.target.value);
    this.changeProps(number, this.state.unit);
  };

  /**
   * Watch the middle mouse scroll and increment or decrement as required
   *
   * @param event
   */
  onWheel = (event) => {
    const number = (event.deltaY > 0
      ? this.state.number + this.props.step : this.state.number - this.props.step);

    this.onChangeText(this.props.name, `${number}${this.state.unit}`);
  };

  /**
   * Handle changes to the text element
   *
   * @param event
   */
  onChangeText = (name, value) => {
    const unit = SliderWithText.getUnit(value);
    let number = SliderWithText.getNumber(value);

    if (number > this.props.max) {
      number = this.props.max;
    }

    if (number < this.props.min) {
      number = this.props.min;
    }

    this.setState({
      number,
      unit,
    });
  };

  /**
   * Change the value on the props
   *
   * @param number
   * @param unit
   */
  changeProps = (number, unit) => {
    if (this.props.valueIsNumber) {
      // only return the number
      return this.props.onChange(this.props.name, number);
    }

    // check this is a valid unit, reset to the initial unit if not
    const newUnit = (this.props.units.length && this.props.units.indexOf(unit) === -1
      ? this.state.unit : unit);
    return this.props.onChange(this.props.name, `${number}${newUnit}`);
  };

  /**
   * Render the input
   *
   * @returns {XML}
   */
  render() {
    const value = `${this.state.number}${this.state.unit}`;

    const className = ['react-forms-slider-with-text'];
    if (this.state.focus) {
      className.push('react-forms--focus');
    }

    const rangeClassName = ['react-forms-input-range'];
    if (this.props.compact && !this.state.focus) {
      rangeClassName.push('react-forms-input-range--hidden');
    }

    return (
      <div className={className.join(' ')}>
        <input
          className={rangeClassName.join(' ')}
          type="range"
          value={this.state.number}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChange}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
        <Text
          name={`${this.props.name}-number`}
          value={value}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={this.onChangeText}
          onWheel={this.onWheel}
          tabIndex={this.props.tabIndex}
          fitToContent
        />
      </div>
    );
  }
}

SliderWithText.propTypes = {
  /**
   * Compact mode will hide the slider when not mouse over or focused
   */
  compact: PropTypes.bool,

  /**
   * Allowed options
   */
  units: PropTypes.arrayOf(PropTypes.string),

  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,

  /**
   * Min value for the slider
   */
  min: PropTypes.number,

  /**
   * Max value for the slider
   */
  max: PropTypes.number,

  /**
   * Step size for the slider
   */
  step: PropTypes.number,
};

SliderWithText.defaultProps = {
  /**
   * Allowed options
   */
  units: [
    '%',
    'px',
  ],

  /**
   * Min value
   */
  min: 0,

  /**
   * Max value
   */
  max: 100,

  /**
   * Step size
   */
  step: 1,
};
