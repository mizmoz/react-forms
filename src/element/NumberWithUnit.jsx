
import React, { PropTypes } from 'react';
import Base from './Base';

/**
 * Create a number and unit input for things like CSS values
 * where a text input would be 10 and select allow %, px, em, rem etc
 *
 */
export default class NumberWithUnit extends Base {
  /**
   * Init the form state
   *
   * @type {{}}
   */
  state = {
    number: NumberWithUnit.getNumber(this.props.value),
    unit: NumberWithUnit.getUnit(this.props.value),
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

    const number = Number(value.split(/^([0-9]*)/)[1]);
    return (number.toString() === 'NaN' ? 0 : number);
  }

  /**
   * Get the unit part of the value
   *
   * @param value
   * @returns {*}
   */
  static getUnit(value) {
    return (value ? value.split(/^([0-9]*)/)[2] : '%');
  }

  /**
   * Handle changes to the element
   *
   * @param event
   */
  onChange = (event) => {
    let values = {};

    if (event.target.name.search(/-number$/) !== -1) {
      const number = Number(event.target.value);

      if (number.toString() === 'NaN') {
        // don't allow non numbers to be entered in to the input
        return;
      }

      // number field
      values = {
        number: Number(event.target.value),
        unit: this.state.unit,
      };
    } else {
      values = {
        number: this.state.number,
        unit: event.target.value,
      };
    }

    this.props.onChange(this.props.name, `${values.number}${values.unit}`);
  };

  /**
   * Render the input
   *
   * @returns {XML}
   */
  render() {
    return (
      <div className="react-forms-number-with-unit">
        <input
          className="react-forms-input-range"
          type="range"
          min="50"
          max="250"
          step="5"
        />
        <input
          type="text"
          name={`${this.props.name}-number`}
          value={this.state.number}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
        />
        <div className="select">
          <select
            name={`${this.props.name}-unit`}
            value={this.state.unit}
            onChange={this.onChange}
          >
            {this.props.units.map(unit => <option>{unit}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

NumberWithUnit.propTypes = {
  /**
   * Allowed options
   */
  units: PropTypes.arrayOf(PropTypes.string),

  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,
};

NumberWithUnit.defaultProps = {
  /**
   * Allowed options
   */
  units: [
    '%',
    'px',
  ],
};
