import React, { useState, useRef } from 'react';
import axios from 'axios';

function CommentDialog({ ticket, dialogView, setDidSubmit, handleDialogView }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const createdByRef = useRef();
  const contentRef = useRef();

  function handleSubmitComment(e) {
    e.preventDefault();
    setIsDisabled(true);

    const createdBy = createdByRef.current.value;
    const content = contentRef.current.value;

    if (createdBy.length < 1 || content.length < 1) {
      return;
    }

    const params = new URLSearchParams();

    params.append('createdBy', createdBy);
    params.append('content', content);

    axios.put(
      `https://trackexserver.herokuapp.com/tickets/update/${ticket._id}`,
      params,
    ).then(res => {
      setDidSubmit(true);
      setIsDisabled(false);
    }).catch(error => {
      console.log(error);
    })

    createdByRef.current.value = '';
    contentRef.current.value = '';
  }

  const dialogStyles = {
    "visible": {
      height: "370px",
      border: "2px solid #cccccc",
      overflow: "auto"
    },
    "hidden": {
      height: "0px",
      border: "2px solid #ffffff"
    }
  }

  return (
    <div className="commentDialog" style={dialogStyles[dialogView]}>
      <div className="commentDialogTitle">
        <span className="dialogTitleText">Add Comment</span>

        <img 
          className="closeIcon" 
          src={require('../../../assets/close.png')} 
          onClick={handleDialogView}
          alt="close icon"
        />
      </div>

      <div className="dialogFormContainer">
        <form className="dialogForm" onSubmit={handleSubmitComment}>
          <div className="createdByField">
            <label className="createdByLabel">Created By:</label>
            <input ref={createdByRef} className="createdByInput" required></input>
          </div>

          <div className="contentField">
            <label className="contentLabel">Content:</label>
            <textarea 
              ref={contentRef} 
              className="contentTextArea"
              rows="8"
              required
              ></textarea>
          </div>

          <button className="sendComment" disabled={isDisabled}>
            <img 
              className="sendIcon" 
              src={require('../../../assets/message.png')}
              alt="close icon"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentDialog;