
import React, { PropTypes, Component } from 'react'; // eslint-disable-line no-unused-vars

/**
 * Base element
 *
 */
export default class Base extends Component {
  /**
   * Is the input in it's empty state?
   *
   * @return boolean
   */
  static isEmpty(value) {
    return !value;
  }

  /**
   * Events to add when the component mounts
   *
   * @type {Array}
   */
  events = [];

  /**
   * Attach any events
   */
  componentDidMount() {
    this.attachAddEvents();
  }

  /**
   * Detach any events
   */
  componentWillUnmount() {
    this.detachAddEvents();
  }

  /**
   * Get the value from the event object and call the passed onChange call back
   *
   * @param event
   */
  onChange = (event) => {
    event.preventDefault();

    // get the value and check if we need to cast it to a number
    const value = (this.props.valueIsNumber ? Number(event.target.value) : event.target.value);
    this.props.onChange(this.props.name, value);
  };

  /**
   * Add an event which will be added when componentDidMount is called and
   * removed when componentWillUnmount
   *
   * @param element
   * @param event
   * @param callback
   * @returns {Base}
   */
  addEvent = (element, event, callback) => {
    this.events.push({
      element: element,
      event: event,
      callback: callback,
    });
  };

  /**
   * Attach the event handlers
   */
  attachAddEvents = () => {
    this.events.forEach((add) => {
      const element = (typeof add.element === 'function' ? add.element() : add.element);
      element.addEventListener(add.event, add.callback, false);
    });
  };

  /**
   * Attach the event handlers
   */
  detachAddEvents = () => {
    this.events.forEach((remove) => {
      remove.element.removeEventListener(remove.event, remove.callback);
    });
  };

  /**
   * Is the element valid?
   *
   * @todo Need to implement element validation
   * @return bool
   */
  isValid() {
    return true;
  }
}

Base.propTypes = {
  /**
   * Element name, passed back in the onChange call
   */
  name: PropTypes.string.isRequired,

  /**
   * Value for the element
   */
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types

  /**
   * Handle on change events
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Element tab
   */
  tabIndex: PropTypes.number,

  /**
   * Is this element required?
   */
  isRequired: PropTypes.bool,

  /**
   * Value should be converted to a number before passing to the onChange callback
   */
  valueIsNumber: PropTypes.bool,
};

Base.defaultProps = {
  /**
   * Not required by default
   */
  isRequired: false,
};
