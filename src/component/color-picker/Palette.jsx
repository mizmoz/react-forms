
import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List as list } from 'immutable';
import Tooltip from '../Tooltip';
import Swatch from './Swatch';

export default class Palette extends Component {
  /**
   * Render the color
   *
   * @param swatch
   * @returns {XML}
   */
  renderSwatch = (swatch) => {
    const color = (typeof swatch === 'string' ? swatch : swatch.get('color'));
    const value = (typeof swatch === 'string' ? swatch : swatch.get('value'));
    const tooltip = (typeof swatch === 'string' ? '' : swatch.get('name'));

    // match the colour if swatch is a string otherwise match the swatch name
    const active = (typeof swatch === 'string'
      ? this.props.hex === color : this.props.value === value);

    const button = (
      <div>
        <Swatch
          onClick={this.props.onChange}
          color={color}
          value={value}
          active={active}
        />
      </div>
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
  onChange: PropTypes.func.isRequired,

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
        color: PropTypes.oneOfType([
          ImmutablePropTypes.list,
          PropTypes.string,
          PropTypes.array,
        ]).isRequired,
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
