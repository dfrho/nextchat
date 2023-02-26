import { useRef, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

const MessageBarContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  width: ${({ hasFocus }) => (hasFocus ? '90%' : '100%')};
  position: ${({ hasFocus }) => (hasFocus ? 'absolute' : 'relative')};
  bottom: 0;

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    max-width: 100%;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  width: 60%;
  font-size: 1rem;
  resize: none;
  overflow: hidden;
  outline: none;
  transition: height 0.3s ease-in-out;
  box-shadow: ${({ hasFocus }) =>
    hasFocus && '0px 4px 4px rgba(0, 0, 0, 0.25)'};

  &:focus {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const SendButton = styled.button`
  background-color: #1d4ed8;
  color: white;
  border-radius: 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #718096;
    cursor: not-allowed;
  }

  @media screen and (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const SendIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

export const MessageBar = ({ onNewMessage, disabled }) => {
  const [message, dispatchMessage] = useReducer(messageReducer, '');
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  //reducer for message
  function messageReducer(state, action) {
    switch (action.type) {
      case 'set':
        return action.payload;
      case 'reset':
        return '';
      default:
        return state;
    }
  }

  const resetMessage = () => {
    dispatchMessage({ type: 'reset' });
  };

  const setMessage = (message) => {
    dispatchMessage({ type: 'set', payload: message });
  };

  //ref for textarea
  const textAreaRef = useRef();

  //resizes textarea to fit content, called on input
  const resize = () => {
    textAreaRef.current.style.height = 'inherit';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  };

  //whenever message changes, resize textarea
  useEffect(() => {
    resize();
  }, [message]);

  //try to send message, if message is not empty newmessage is sent and
  //message is reset
  const tryNewMessage = () => {
    if (message.trim() !== '') {
      onNewMessage(message);
      resetMessage();
    }
  };

  return (
    <MessageBarContainer>
      <StyledTextArea
        ref={textAreaRef}
        hasFocus={focus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={1}
        type="text"
        placeholder="Enter your message"
        onInput={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            tryNewMessage();
          }
        }}
        value={message}
      />
      <SendButton
        disabled={disabled}
        onClick={() => {
          tryNewMessage();
          resetMessage();
        }}
      >
        <SendIcon
          src={disabled ? '/loading.svg' : '/icon-send.png'}
          className={`w-6 h-6 }`}
          alt=""
        />
      </SendButton>
    </MessageBarContainer>
  );
};
