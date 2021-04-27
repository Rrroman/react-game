import React from 'react';
import classes from './Footer.module.css';
import logo from '../../assets/rs_school_js.svg';

const Footer = () => (
  <div className={classes.footer}>
    <a className={classes.footer__link} href="https://github.com/Rrroman">
      Created by Roman 2021
    </a>
    <a className={classes.footer__link} href="https://rs.school/js/">
      <img className={classes.footer__logo} src={logo} alt="Rs School" />
    </a>
  </div>
);

export default Footer;
