import client from './client';

// 목록조회
export const listPosts = () =>
    client.get(`/api/posts`);

// 글 작성
export const writePost = ({ title, body }) =>
    client.post('/api/addPost', { title, body });

// 글 조회
export const readPost = id =>
    client.get(`/api/post/${id}`);

// 글 수정
export const updatePost = ({ id, title, body }) =>
    client.post(`/api/updatePost/${id}`, { id, title, body });

// 글 삭제
export const deletePost = id =>
    client.post(`/api/deletePost/${id}`);