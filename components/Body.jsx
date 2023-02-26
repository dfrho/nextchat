import React from 'react';
import { useState } from 'react';
import { MessageBar } from './MessageBar';
import { MessageHistory } from './MessageHistory';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 85%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HistoryContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const BarContainer = styled.div`
  flex-shrink: 0;
  width: 100%;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-top: 1px solid #ccc;
    z-index: 1;
  }


export const Body = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const onNewMessage = async (message) => {
    setMessageHistory((prev) => [
      ...prev,
      {
        text: message.replace(/^([\n]*)/g, '').replace(/([\n]*)$/g, '').trim(),
        sender: 'me',
      },
    ]);
    setLoading(true);

    const response = await fetch('/.netlify/functions/queryopenai', {
      method: 'POST',
      body: JSON.stringify({ newMessage: message, messageHistory }),
    });
    const data = await response.json();

    setMessageHistory((prev) => [
      ...prev,
      {
        text: data.result.replace(/^([\n]*)/g, '').replace(/([\n]*)$/g, '').trim(),
        sender: 'bot',
      },
    ]);
    setLoading(false);
  };

  return (
    <Container>
      <HistoryContainer>
        <MessageHistory messageHistory={messageHistory} />
      </HistoryContainer>
      <BarContainer>
        <MessageBar onNewMessage={onNewMessage} disabled={loading} />
      </BarContainer>
    </Container>
  );
};
