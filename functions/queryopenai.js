const fetch = require('isomorphic-fetch');

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

  const DEFAULT_PARAMS = {
    model: 'text-davinci-002',
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const params_ = { ...DEFAULT_PARAMS, prompt: query };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_OPEN_AI_API_KEY,
    },
    body: JSON.stringify(params_),
  };

  const response = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  );
  console.log(
    '🚀 ~ file: queryopenai.js:40 ~ exports.handler= ~ response:',
    response
  );
  const data = await response.json();
  console.log('🚀 file: queryopenai.js:41 ~ exports.handler= ~ data:', data);

  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].text || {} }),
  };
};
