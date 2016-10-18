
import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List as list, Map as map } from 'immutable';
import tinycolor from 'tinycolor2';
import Tooltip from '../Tooltip';

export default class Palette extends Component {
  /**
   * Handle the swatch clicks
   *
   * @param event
   */
  onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange(event.currentTarget.value);
  };

  /**
   * Render the color
   *
   * @param swatch
   * @param key
   * @returns {XML}
   */
  renderSwatch = (swatch, key) => {
    const color = (typeof swatch === 'string' ? swatch : swatch.get('color'));
    const value = (typeof swatch === 'string' ? swatch : swatch.get('value'));
    const tooltip = (typeof swatch === 'string' ? '' : swatch.get('name'));
    const shadowSize = (this.props.hex === color ? '.2rem' : '1.1rem');

    const brightness = tinycolor(color).getBrightness();
    const borderColor = (brightness > 200 ? '#dadadc' : 'transparent');

    const style = {
      boxShadow: `${color} 0px 0px 0px ${shadowSize} inset`,
      border: `1px solid ${borderColor}`,
    };

    const button = (
      <button
        key={key}
        className="react-forms-color-picker-swatch"
        onClick={this.onClick}
        value={value}
        style={style}
      />
    );

    return (tooltip ? <Tooltip key={value} text={tooltip}>{button}</Tooltip> : button);
  };

  /**
   * Render the colour pallet
   *
   * @returns {XML}
   */
  render() {
    return (
      <div className="react-forms-color-picker-component-palette">
        <header>
          <h5>{this.props.title}</h5>
          {this.props.help ?
            <Tooltip text={this.props.help}>
              <i key="help" className="material-icons">help_outline</i>
            </Tooltip> : null}
        </header>
        <section>
          {this.props.palette.map(this.renderSwatch)}
        </section>
      </div>
    );
  }
}

Palette.propTypes = {
  /**
   * Hex colour passed by the colorWrap HOC
   */
  hex: PropTypes.string,

  /**
   * Selected value, can be either the color or the swatch name
   */
  value: PropTypes.string,

  /**
   * On change handler
   */
  onChange: PropTypes.func,

  /**
   * Colour palette title
   */
  title: PropTypes.string,

  /**
   * Help text to display near the title
   */
  help: PropTypes.string,

  /**
   * Color palette
   */
  palette: PropTypes.oneOfType([
    ImmutablePropTypes.listOf(
      PropTypes.string
    ),
    ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    ),
  ]),
};

Palette.defaultProps = {
  /**
   * Colour palette
   */
  palette: list(),

  /**
   * Title for the palette
   */
  title: 'Colour palette',
};
