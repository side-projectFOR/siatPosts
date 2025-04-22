import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { RootState } from '../app/store';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 400px;
  margin: 0 auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
`;

const LoginPage: React.FC = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) navigate('/boards');
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ username, password }).unwrap();
      dispatch(setCredentials(data));
      navigate('/boards');
    } catch {
      // 로그인 실패
    }
  };

  return (
    <Container>
      <h2>로그인</h2>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          로그인
        </Button>
        {isError && <p style={{ color: 'red' }}>로그인에 실패했습니다.</p>}
      </Form>
    </Container>
  );
};

export default LoginPage;
