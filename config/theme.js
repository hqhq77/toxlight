import styled from 'styled-components/native';

const theme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#1e90ff',
    safe: '#32CD32',
    warning: '#FF4500',
    cardBg: '#1e1e1e',
    itemBg: '#2a2a2a',
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
`;

const Card = styled.View`
  background-color: ${(props) => props.theme.colors.cardBg};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
`;

const ItemRow = styled.View`
  background-color: ${(props) => props.theme.colors.itemBg};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export { theme, Container, Card, ItemRow };