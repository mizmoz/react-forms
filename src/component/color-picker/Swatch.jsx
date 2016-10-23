
import React, { Component, PropTypes } from 'react';
import { List as list } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import tinycolor from 'tinycolor2';

export default class Swatch extends Component {
  /**
   * Handle the swatch clicks
   *
   * @param event
   */
  onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick(event.currentTarget.value);
  };

  /**
   * Get the color as an array
   *
   * @returns {*}
   */
  getColor() {
    if (typeof this.props.color === 'string') {
      return [
        this.props.color,
      ];
    }

    if (this.props.color.constructor === Array) {
      return this.props.color;
    }

    if (list.isList(this.props.color)) {
      return this.props.color.toArray();
    }

    console.warn('Unknown color:', this.props.color);
  }

  /**
   * Render the swatch
   *
   * @returns {XML}
   */
  render() {
    const colors = this.getColor();

    const brightness = colors.reduce((level, color) => {
      const colorBrightness = tinycolor(color).getBrightness();
      return Math.max(level, colorBrightness);
    }, 0);

    const borderColor = (brightness > 200 ? '#dadadc' : colors[0]);

    const backgroundColor = (colors.length === 1
      ? colors[0]
      : `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)`
    );

    const style = {
      background: backgroundColor,
      borderColor: borderColor,
    };

    if (this.props.active) {
      const shadowColor = (brightness > 200 ? '#dadadc' : 'white');
      style.boxShadow = `${shadowColor} 0 0 0 2px inset`;
    }

    return (
      <button
        type="button"
        name={this.props.name}
        value={this.props.value}
        onClick={this.onClick}
        className="react-forms-color-picker-swatch"
        style={style}
      />
    );
  }
}

Swatch.propTypes = {
  /**
   * Name of the swatch
   */
  name: PropTypes.string,

  /**
   * Swatch value
   */
  value: PropTypes.string,

  /**
   * Colour
   */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    ImmutablePropTypes.list,
  ]).isRequired,

  /**
   * Click handler
   */
  onClick: PropTypes.func,

  /**
   * Is this swatch active?
   */
  active: PropTypes.bool,
};
