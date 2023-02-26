import React from 'react';
import { useState } from 'react';
import { MessageBar } from './MessageBar';
import { MessageHistory } from './MessageHistory';

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

    const response = await fetch('/.netlify/functions/query-openai', {
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
    <div className='h-full flex flex-col overflow-hidden container'>
      <MessageHistory messageHistory={messageHistory} />
      <MessageBar onNewMessage={onNewMessage} disabled={loading} />
    </div>
  );
};
