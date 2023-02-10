import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: rgba(153, 164, 151, 1);
  color: rgb(59, 59, 59);
  font-size: 20px;
  border: none;
  border-radius: 15px;
  padding-block: 10px;
  padding-inline: ${props => props.padding};
  text-align: center;
  transition: 0.25s;
  &:hover {
    cursor: pointer;
    background-color: gray;
    color: white;
  }
`;

export default StyledButton;
