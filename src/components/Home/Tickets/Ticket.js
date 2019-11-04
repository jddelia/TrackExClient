import React from 'react';
import { Link } from 'react-router-dom';


function Ticket({ id, title, priority, assigned, content }) {
  const priorityStyles = {
    Standard: {
      color: "#333333"
    },
    High: {
      color: "gold"
    },
    Critical: {
      color: "red"
    }
  }

  return (
    <Link to={`/ticket/${id}`} className="ticket">
      <div className="ticketTitle">
        <span className="titleText">{title}</span>
        <span className="ticketPriority" style={priorityStyles[priority]}>
          {priority}
        </span>
        <span className="ticketAssigned">{assigned}</span>
      </div>

      <div className="ticketContent">
        <p className="ticketContentText">
          {content}
        </p>
      </div>
    </Link>
  );
}

export default Ticket;