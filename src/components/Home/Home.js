import React from 'react';
import { withRouter } from 'react-router-dom';


import TicketsContainer from './Tickets/TicketsContainer';

const Home = ({ history }) => {
  history.listen(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="homeContainer">
      <TicketsContainer />
    </div>
  );
};

export default withRouter(Home);