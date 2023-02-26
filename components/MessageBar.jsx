import iconSend from '../assets/icon-send.png';
import { useRef, useEffect, useReducer } from 'react';
import loading from '../assets/loading.svg';
import styled from 'styled-components';

const MessageBarContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  max-width: 800px;
  position: fixed;
  bottom: 0;
`;

const StyledTextArea = styled.textarea`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  resize: none;
  overflow: hidden;
  outline: none;
  transition: height 0.3s ease-in-out;
  box-shadow: ${({ hasFocus }) => hasFocus && '0px 4px 4px rgba(0, 0, 0, 0.25)'};

  &:focus {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const SendButton = styled.button`
  background-color: #1d4ed8;
  color: white;
  border-radius: 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem 1rem;
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
`;

const SendIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;



export const MessageBar = ({ onNewMessage, disabled }) => {
	const [message, dispatchMessage] = useReducer(messageReducer, '');

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
		textAreaRef.current.style.height =
			textAreaRef.current.scrollHeight + 'px';
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
            rows={1}
            type='text'
            placeholder='Enter your message'
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
              src={disabled ? '/loading' : '/icon-send'}
              className={`w-6 h-6 }`}
              alt=''
            />
          </SendButton>
        </MessageBarContainer>
      );
      
};
