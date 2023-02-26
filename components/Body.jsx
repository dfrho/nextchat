import React from 'react';
import { useState } from 'react';
import { MessageBar } from './MessageBar';
import { MessageHistory } from './MessageHistory';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

const Container = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

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
      <MessageHistory messageHistory={messageHistory} />
      <MessageBar onNewMessage={onNewMessage} disabled={loading} />
    </Container>
  );
};
