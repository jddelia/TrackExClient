import React, { useState, useEffect } from 'react';

import CommentDialog from './CommentDialog';

function TicketPage({ ticket, didSubmit, setDidSubmit }) {
  const [dialogView, setDialogView] = useState("hidden");

  function handleDialogView() {
    if (dialogView === "hidden") {
      setDialogView("visible");
    } else {
      setDialogView("hidden")
    }

    return;
  }

  const spinner = (
    <div className="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>
  );

  if (!ticket) {
    return spinner;
  };

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

  let ticketComments;

  if (ticket.comments.length > 0) {
    ticketComments = ticket.comments.map(comment => {
      if (didSubmit) {
        return (
          <div key={comment._id} className="ticketComment">
            {spinner}
          </div>
        )
      }

      let commentDate = new Date(comment.date);
      return (
        <div key={comment._id} className="ticketComment">
          <div className="commentInfo">
            <span className="commentCreator">{comment.createdBy}</span>
            <span className="commentDate">{commentDate.toDateString()}</span>
          </div>
          <span className="commentContent">{comment.content}</span>
        </div>
      )
    })
  }

  let ticketDateCreated = new Date(ticket.created);
  return (
    <div className="ticketPage">
      <div className="ticketPageTitle">
        <span className="ticketPageTitleText">{ticket.title}</span>
      </div>

      <div className="ticketPageContent">
        <div className="ticketDetails">
          <div className="mainDetails">
            <span className="assignedDetail">Assigned: {ticket.assigned}</span>
            <span className="priorityDetail">
              Status:
              <span style={priorityStyles[ticket.priority]}> {ticket.priority}</span>
            </span>
          </div>

          <div className="addComment">
            <img 
              className="messageIcon" 
              src={require('../../../assets/notes.png')} 
              onClick={handleDialogView}
              alt="add comment icon"
            />
          </div>

          <CommentDialog 
            ticket={ticket}
            dialogView={dialogView}
            setDidSubmit={setDidSubmit}
            handleDialogView={handleDialogView}
          />
        </div>

        <div className="mainContent">
          <div className="mainContentInfo">
            <span className="mainContentText">{ticket.content}</span>
            <span className="mainContentDate">{ticketDateCreated.toDateString()}</span>
          </div>

          <div className="ticketCommentsContainer">
            {ticketComments}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketPage;