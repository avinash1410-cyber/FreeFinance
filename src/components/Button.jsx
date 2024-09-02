// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function CustomButton({ onClick, color, variant, children }) {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      className={classes.button}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  color: 'primary',
  variant: 'contained',
};

export default CustomButton;
