import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Line from '../../components/line';
export default function ProductDetailFooter() {
  return (
    <Container>
      <hr />
      <div>
        <p>
          상품 고시 정보
          <ArrowDropDownIcon />
          <Line />
        </p>
        <p>
          교환 안내
          <ArrowDropDownIcon />
          <Line />
        </p>
        <p>
          반품 / 환불 안내
          <ArrowDropDownIcon />
          <Line />
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 150px;
  > hr {
    border: 5px solid #f7f8f9;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 70px;
    padding: 100px;
    background-color: #efefef;
    border-radius: 20px;
    height: 500px;
    > p {
      font-weight: 600;
    }
  }
`;
