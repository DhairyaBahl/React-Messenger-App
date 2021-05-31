import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { IconProp } from '../../../shared';

/**
 * Drop down link button
 */
const DropDownButton = (props) => {
  const { onClick, icon, children } = props;

  return (
    <li className="bi-dd-btn">
      <Button onClick={onClick} icon={icon} fluid color="transparent">
        {children}
      </Button>
    </li>
  );
};

DropDownButton.propTypes = {
  onClick: PropTypes.func,
  icon: IconProp,
};

DropDownButton.defaultProps = {
  onClick: undefined,
  icon: undefined,
};

export default React.memo(DropDownButton);
