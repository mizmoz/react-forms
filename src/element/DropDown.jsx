
import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { TransitionMotion, spring } from 'react-motion';
import Base from './Base';

export default class DropDown extends Base {
  /**
   * Starting scale for the list items
   *
   * @type {number}
   */
  startScaleX = 0.75;
  startScaleY = 0.5;

  state = {
    show: false,
  };

  /**
   * Handle clicking on an item
   *
   * @param event
   */
  onClick = (event) => {
    this.onChange(event);
    this.hide();
  }

  /**
   * Toggle the drop down
   */
  onToggle = (event) => {
    event.preventDefault();
    this.setState({
      show: !this.state.show,
    });
  }

  /**
   * Hide the options
   */
  hide = () => {
    this.setState({
      show: false,
    });
  }

  /**
   * Show the options
   */
  show = () => {
    this.setState({
      show: true,
    });
  }

  /**
   * Create the spring
   *
   * @param position
   * @returns {*}
   */
  getSpring = position => spring(position, {
    stiffness: 170,
    damping: 25,
  })

  /**
   * Called when a new item is added
   *
   * @returns {{scale: number}}
   */
  willEnter = () => ({
    scaleX: this.startScaleX,
    scaleY: this.startScaleY,
    opacity: 0,
  })

  /**
   * Called whilst leaving
   *
   * @returns {{scale: number}}
   */
  willLeave = () => ({
    scaleX: this.getSpring(this.startScaleX),
    scaleY: this.getSpring(this.startScaleY),
    opacity: this.getSpring(0),
  });

  /**
   * Render the Text
   *
   * @returns {XML}
   */
  render() {
    const className = ['react-forms-drop-down'];

    if (this.state.show) {
      className.push('active');
    }

    const items = [];
    if (this.state.show) {
      this.props.options.forEach((name, value) => {
        items.push({
          key: `option-${value}`,
          style: {
            scaleX: this.getSpring(1),
            scaleY: this.getSpring(1),
            opacity: this.getSpring(1),
          },
          data: {
            name,
            value,
            selected: value === this.props.value,
          },
        });
      });
    }

    const label = (this.props.value
      ? this.props.options.get(this.props.value)
      : this.props.placeholder
    );

    return (
      <div className={className.join(' ')}>
        <div
          key="__form_button"
          className="react-forms-drop-down-item"
        >
          <button
            className="react-forms-drop-down-button"
            onClick={this.onToggle}
          >
            <span>
              {label}
            </span>
            <span>
              <i className="fa fa-angle-down" />
            </span>
          </button>
        </div>
        <TransitionMotion
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          styles={items}
        >
          {interpolatedStyles =>
            <ol
              role="listbox"
            >
              {interpolatedStyles.map((option) => {
                const optionClassName = ['react-forms-drop-down-item'];

                if (option.data.selected) {
                  optionClassName.push('selected');
                }

                return (
                  <li
                    key={option.data.value}
                    role="option"
                    className={optionClassName.join(' ')}
                    style={{
                      opacity: option.style.opacity,
                      transform: `scale(${option.style.scaleX}, ${option.style.scaleY})`,
                    }}
                  >
                    {React.createElement(this.props.optionsComponent, {
                      value: option.data.value,
                      name: option.data.name,
                      onClick: this.onClick,
                    }, option.data.name)}
                  </li>
                );
              })}
            </ol>
          }
        </TransitionMotion>
      </div>
    );
  }
}

DropDown.propTypes = Object.assign({}, Base.propTypes, {
  /**
   * Input placeholder
   */
  options: ImmutablePropTypes.listOf(
    Immutable.map
  ),

  /**
   * Options component for rendering
   */
  optionsComponent: PropTypes.element,

  /**
   * Placeholder for the drop down
   */
  placeholder: PropTypes.string,
});

DropDown.defaultProps = {
  optionsComponent: 'button',
};
