
import React, { PropTypes } from 'react';

/**
 * Render a field set for the passed form elements
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Group = (props) => {
  const className = ['react-forms-group'];

  return (
    <fieldset className={className.join(' ')}>
      {props.title ? <h3>{props.title}</h3> : null}
      <ul>
        {props.children}
      </ul>
    </fieldset>
  );
}

Group.propTypes = {
  /**
   * Group title
   */
  title: PropTypes.string,

  /**
   * Group form inputs
   */
  children: PropTypes.elements,
};

export default Group;
