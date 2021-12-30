import client from './client';

// 로그인
export const login = ({ UserId, UserPass }) =>
    client.post('/api/login', { UserId, UserPass });

// 로그아웃
export const logout = () =>
    client.post('/api/logout');

// 회원가입
export const register = ({ UserId, UserPass, UserName }) =>
    client.post('/api/register', { UserId, UserPass, UserName });

// 로그인 상태 확인
export const check = ({ UserId }) =>
    client.post(`/api/loginCheck/${UserId}`);