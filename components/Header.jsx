import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: #1e40af;
  padding: 1rem 0;
  color: white;
  font-weight: 600;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  font-size: 1.25rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const HeaderTitle = styled.span`
  text-align: center;
  color: #fff;

  @media only screen and (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle>OPENAI CHAT</HeaderTitle>
      </HeaderContainer>
    </HeaderWrapper>
  );
};
