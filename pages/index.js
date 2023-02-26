import styled from 'styled-components';
import { Body } from '../components/Body';
import { Header } from '../components/Header';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 4rem;
  }
`;

export default function Home() {
  return (
    <Container>
      <Header />

      <Content>
        <Body />
      </Content>
    </Container>
  );
}
