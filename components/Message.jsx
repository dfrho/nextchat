import styled from 'styled-components';

// Create a styled div for the message bubble
const Bubble = styled.div`
  background: linear-gradient(to right, #0d6efd, #0dcaf0);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  color: white;
  max-width: 60%;
  min-width: 4rem;
  padding: 1rem;
  border-radius: 1.5rem;
  break-word: break-word;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Add different styles depending on sender */
  ${({ sender }) =>
    sender === 'me'
      ? `
      align-self: flex-end;
      border-top-right-radius: 0;
      animation-name: fadeInRight;
    `
      : `
      align-self: flex-start;
      border-top-left-radius: 0;
      animation-name: fadeInLeft;
    `}
`;

// Message component, renders a single message.
export const Message = ({ message, sender }) => {
  return (
    <>
      <Bubble sender={sender}>
        {/* Split the message by line and wrap each line in a span */}
        {message.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </Bubble>
    </>
  );
};
