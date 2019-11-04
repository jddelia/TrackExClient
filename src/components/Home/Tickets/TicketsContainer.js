import React, { useContext } from 'react';

import Ticket from './Ticket';

import TicketsContext from '../../../contexts/TicketsContext';
import ContainerCategories from './ContainerCategories';
import CreateTicket from './CreateTicket/CreateTicket';

function TicketsContainer() {
  const { tickets } = useContext(TicketsContext);

  const ticketsList = tickets.map(ticket => {
    return (
      <Ticket
        key={ticket._id}
        id={ticket._id}
        title={ticket.title}
        priority={ticket.priority}
        assigned={ticket.assigned}
        content={ticket.content}
      />
    );
  });

  return (
    <div className="ticketsContainer">
      <CreateTicket />
      <ContainerCategories />
      {ticketsList}
    </div>
  );
}

export default TicketsContainer;