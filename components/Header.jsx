import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: #1e40af;
  padding: 1rem 0;
  color: white;
  font-weight: 600;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  font-size: 1.25rem;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderTitle = styled.span`
  /* Use the Tailwind CSS class name for the font color */
  color: #fff;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderTitle>OPEN AI CHAT</HeaderTitle>
      </HeaderContainer>
    </HeaderWrapper>
  );
};
