import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  /* Other global styles go here */
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
