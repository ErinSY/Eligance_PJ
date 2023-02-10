import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import kakao from '../../images/kakao.png';
import styled from 'styled-components';
import SignupForm from './SignupForm';
import MainThemeLine from '../../components/line';

export default function Signup() {
  const navigate = useNavigate();
  return (
    <Container>
      <MainTitle>
        <span>회원가입</span>
      </MainTitle>
      <MainThemeLine widthLength="35%" />
      {/* <Line /> */}
      <UserInputContainer>
        <SignupForm />
        <button
          onClick={() => {
            navigate('/user/login');
          }}
        >
          로그인하러 가기
        </button>
        <input className="kakao" type="image" src={kakao} alt="카카오로그인" />
        <Link className="link-to-home" to="/">
          홈으로 이동
        </Link>
      </UserInputContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 90px;
  width: 100%;
  height: max-content;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.div`
  width: 35%;
  font-weight: 600;
  font-size: 25px;
  display: flex;
  justify-content: center;
`;
const Line = styled.hr`
  width: 35%;
  padding-bottom: 10px;
  margin-bottom: 20px;
  background: rgba(153, 164, 151, 1);
  border-radius: 15px;
`;

const UserInputContainer = styled.div`
  width: 35%;
  height: 70vh;
  background-color: #e8e8e8;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 13px;

  .sign-up-btn {
    height: 30px;
    width: 120px;
    font-size: 12px;
  }

  .error-msg {
    color: red;
    font-size: 10.5px;
    padding-top: 5px;
  }
  > button,
  .kakao {
    margin-top: 15px;
    height: 30px;
    width: 120px;
    font-size: 12px;
  }

  > .kakao {
    margin-bottom: 15px;
  }

  > form {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > .form-field {
        width: 70%;
        > input {
          border: hidden;
          width: 70%;
          border-bottom-style: groove;
          background-color: inherit;
        }
      }
    }
  }
`;
