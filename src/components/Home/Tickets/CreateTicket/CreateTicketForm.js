import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';

import TicketsContext from '../../../../contexts/TicketsContext';

function CreateTicketForm() {
  const [isDiabled, setIsDisabled] = useState(false);
  const { setForceUpdate } = useContext(TicketsContext);

  const titleRef = useRef();
  const assignedRef = useRef();
  const priorityRef = useRef();
  const contentRef = useRef();

  function handleSubmitTicket(e) {
    e.preventDefault();
    setIsDisabled(true);

    const title = titleRef.current.value;
    const assigned = assignedRef.current.value;
    const priority = priorityRef.current.value;
    const content = contentRef.current.value;

    const params = new URLSearchParams();
    params.append('title', title);
    params.append('assigned', assigned);
    params.append('priority', priority);
    params.append('content', content);

    axios.post('https://trackexserver.herokuapp.com/tickets/create', params)
      .then(res => {
        console.log(res.data);
        setIsDisabled(false);
        setForceUpdate(prevState => !prevState)
      })
      .catch(error => {
        console.log(error);
      });

    titleRef.current.value = '';
    assignedRef.current.value = '';
    priorityRef.current.value = '';
    contentRef.current.value = '';
  }

  return (
    <div className="createTicketFormContainer">
      <div className="createTicketFormTitle">
        <span className="createTicketTitleText">
          Create Ticket
        </span>
      </div>

      <form className="createTicketForm" onSubmit={handleSubmitTicket}>
        <div className="formField">
          <label className="fieldLabel">Title:</label>
          <input ref={titleRef} type="text" className="titleInput" required></input>
        </div>

        <div className="formField">
          <label className="fieldLabel">Assigned:</label>
          <input ref={assignedRef} type="text" className="assignedInput" required></input>
        </div>

        <div className="formField">
          <label className="fieldLabel">Priority:</label>
          <select ref={priorityRef} className="prioritySelect" required>
            <option className="priorityOption">Standard</option>
            <option className="priorityOption">High</option>
            <option className="priorityOption">Critical</option>
          </select>
        </div>

        <div className="formField">
          <label className="fieldLabel">Content:</label>
          <textarea ref={contentRef} className="contentTextArea" rows="15" required></textarea>
        </div>

        <button className="sendComment" disabled={isDiabled}>
          <img 
            className="sendIcon" 
            src={require('../../../../assets/message.png')}
            alt="close icon"
          />
        </button>
      </form>
    </div>
  );
}

export default CreateTicketForm;