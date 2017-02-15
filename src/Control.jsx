
import React, { PropTypes } from 'react';

const Control = ({ children, compact, id, isEmpty, label }) => {
  const child = (children.constructor === Array ? children[0] : children);

  const className = ['react-forms-control'];

  if (child.props.isRequired) {
    className.push('required');
  }

  if (isEmpty) {
    className.push('react-forms-control--empty');
  }

  if (compact) {
    className.push('react-forms-control--compact');
  }

  return (
    <li id={id} className={className.join(' ')}>
      <label htmlFor={child.props.name}>
        {label}
      </label>
      {children}
    </li>
  );
};

Control.propTypes = {
  /**
   * Compact form
   */
  compact: PropTypes.bool,

  /**
   * Id for the li
   */
  id: PropTypes.string,

  /**
   * Group label
   */
  label: PropTypes.string.isRequired,

  /**
   * Tooltip for the input
   */
  tooltip: PropTypes.string,

  /**
   * Is the child element empty?
   */
  isEmpty: PropTypes.bool,

  /**
   * Children should be a single child form element
   */
  children: PropTypes.element,
};

export default Control;
