import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
//import styles from "assets/jss/material-kit-react/components/cardFooterStyle.js";
// const cardFooterStyle = {
//   cardFooter: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     padding: "0.9375rem 1.875rem"
//   }
// };

//const useStyles = makeStyles(cardFooterStyle);

const useStyles = makeStyles((theme) => ({
  cardFooter: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: "0.9375rem 1.875rem"
  }
}));

export default function CardFooter(props) {
  const classes = useStyles();
  const { className, children, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};
