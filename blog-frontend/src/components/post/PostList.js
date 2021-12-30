import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    /* 맨 위 포스트는 padding-top 없음 */
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

const PostItem = ({ post, user }) => {
    const { id, title, body, publishedDate } = post;
    // const { UserName } = user;
    return (
        <PostItemBlock>
            <h2>
                <Link to={`/post/${id}`}>{title}</Link>
            </h2>
            <SubInfo username='UserName' publishedDate={new Date(publishedDate)} />
            <p>{body}</p>
        </PostItemBlock>
    );
};

const PostList = ({ posts, loading, error }) => {
    // 에러 발생시
    if (error) {
        console.log(error);
        return <PostItemBlock>에러가 발생했습니다.</PostItemBlock>
    }
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                <Button cyan to='/write'>
                    새 글 작성
                </Button>
            </WritePostButtonWrapper>
            {/* 로딩 중이 아닌 포스트 배열이 존재시에만 보여 줌*/}
            {!loading && posts && (
                <div>
                    {posts.map(post => (
                        <PostItem post={post} key={post.id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;