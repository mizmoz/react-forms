
import React, { PropTypes } from 'react';
import RcTooltip from 'rc-tooltip';

const Tooltip = ({ children, enterDelay, placement, text }) => (
  <RcTooltip
    mouseEnterDelay={enterDelay}
    overlay={text}
    placement={placement}
    prefixCls="react-forms-tooltip"
    transitionName="react-forms-tooltip"
  >{children}</RcTooltip>
);

Tooltip.propTypes = {
  /**
   * Element that has the tooltips
   */
  children: PropTypes.element,

  /**
   * Where should the tooltip be placed?
   */
  placement: PropTypes.string,

  /**
   * Tooltip text
   */
  text: PropTypes.string.isRequired,

  /**
   * Delay showing the tooltip
   */
  enterDelay: PropTypes.number,
};

Tooltip.defaultProps = {
  placement: 'bottom',
  enterDelay: 0.3,
};

export default Tooltip;
