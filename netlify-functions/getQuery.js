exports.handler = async (event) => {
  const { newMessage, messageHistory } = JSON.parse(event.body);

  const intro =
    'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.';
  const prompt = messageHistory
    .map((message) => {
      return message.sender === 'me'
        ? `Human: ${message.text}`
        : `AI: ${message.text}`;
    })
    .join('\n');

  const query = intro + '\n' + prompt + '\nHuman: ' + newMessage + '\nAI:';

  return {
    statusCode: 200,
    body: JSON.stringify({ query }),
  };
};
