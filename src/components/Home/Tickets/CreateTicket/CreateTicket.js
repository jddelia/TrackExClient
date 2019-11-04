import React from 'react';
import { Link } from 'react-router-dom';

function CreateTicket() {
  return (
    <Link to="/create/ticket" className="createTicket">
      <img 
        className="createTicketIcon" 
        src={require('../../../../assets/add.png')} 
        alt="create ticket icon"
      />
    </Link>
  );
}

export default CreateTicket;