import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import TicketPage from './TicketPage';

const TicketPageContainer = ({ history, match }) => {
  const [ticket, setTicket] = useState(null);
  const [didSubmit, setDidSubmit] = useState(true);

  history.listen(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    function fetchData() {
      axios.get(`https://trackexserver.herokuapp.com/tickets/ticket/${match.params.id}`)
        .then(response => {
          setTicket(response.data[0]);
          setDidSubmit(false);
        })
        .catch(err => {
          throw err;
        });
    }

    if (didSubmit) fetchData();
  }, [setTicket, didSubmit]);

  return (
    <>
      <TicketPage 
        ticket={ticket}
        didSubmit={didSubmit}
        setDidSubmit={setDidSubmit}
      />
    </>
  );
};

export default withRouter(TicketPageContainer);