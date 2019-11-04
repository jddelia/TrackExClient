import React from 'react';

function Footer() {
  return (
    <footer className="appFooter">
      <span className="footerText">
        JDelia 2019
      </span>

      <img className="rocketIcon" src={require('../assets/startup.png')} />
    </footer>
  );
}

export default Footer;