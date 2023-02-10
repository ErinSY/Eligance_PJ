import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import StyledButton from '../../components/StyledButton';
import jwt_decode from 'jwt-decode';

const DivStyle = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 30;
  font-weight: bold;
`;

const HrStyle = styled.hr`
  background-color: rgba(153, 164, 151, 1);
  width: 700px;
  height: 5px;
  border: none;
  border-radius: 0px;
  text-align: center;
`;

const LoginBoxStyle = styled.div`
  background-color: rgba(217, 217, 217, 1);
  height: 300px;
  width: 700px;
  border-radius: 20px;
  margin: 180px 0 0 0px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoginFormStyle = styled.form`
  font-size: 20px;
  font-weight: normal;
  margin: 50px 0 0 200px;
  position: absolute;
  color: rgba(90, 89, 89, 1);
`;

const InputStyle = styled.input`
  height: 25px;
  width: 300px;
  border: 0;
  border-bottom: 1px solid #757575;
  font-size: 20px;
  background: transparent;
  outline: none;
  margin-top: 10px;
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onEmailHandler = event => {
    setEmail(event.target.value);
  };
  const onPasswordHandler = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5001/user/login', {
        email,
        password,
      });
      const user = res.data;
      const jwtToken = user.token;
      const decodedJwt = jwt_decode(jwtToken);
      localStorage.setItem('userToken', JSON.stringify(decodedJwt));
      navigate('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <DivStyle>로그인</DivStyle>
      <HrStyle />
      <LoginBoxStyle>
        <LoginFormStyle onSubmit={handleSubmit}>
          <p style={{ paddingRight: '20px' }}>이메일</p>
          <InputStyle
            type="email"
            placeholder="EMAIL"
            onChange={onEmailHandler}
          />
          <p style={{ paddingTop: '10px', paddingRight: '20px' }}>패스워드</p>
          <InputStyle
            type="password"
            placeholder="PASSWORD"
            onChange={onPasswordHandler}
          />
          <div
            style={{
              textAlign: 'center',
              margin: '35px 0 0 0px',
            }}
          >
            <StyledButton title="로그인" type="submit" padding="100px">
              로그인
            </StyledButton>
          </div>
        </LoginFormStyle>
      </LoginBoxStyle>
    </div>
  );
}

export default LoginPage;
