import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { Message } from './Message';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BubblesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) => (sender === 'me' ? 'flex-start' : 'flex-end')};
  width: 100%;
  max-width: 600px;
  overflow: auto;
  max-height: calc(100vh - 200px);
`;

export const MessageHistory = ({ messageHistory }) => {
  const messageHistoryRef = useRef(null);

  useEffect(() => {
    messageHistoryRef.current.scrollTo({
      left: 0,
      top: messageHistoryRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messageHistory]);

  return (
    <Container>
      <BubblesContainer ref={messageHistoryRef}>
        {messageHistory.map(({ text, sender }, i) => (
          <Message message={text} sender={sender} key={i} />
        ))}
      </BubblesContainer>
    </Container>
  );
};
