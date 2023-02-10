import styled from 'styled-components';

export default function MainThemeLine({ widthLength }) {
  return <Line widthLength={widthLength} />;
}

const Line = styled.hr`
  width: ${props => props.widthLength};
  background: rgba(153, 164, 151, 1);
  border-radius: 15px;
  height: 10px;
`;
