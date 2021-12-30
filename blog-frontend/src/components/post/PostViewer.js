import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
    // 에러 발생시
    if (error) {
        if (error.response && error.response.status === 404) {
            return <PostViewerBlock>존재하지 않는 포스트 입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류오류 발생</PostViewerBlock>
    }

    // 로딩중이거나 아직 포스트 데이터가 없을 때
    if (loading || !post) {
        return null;
    }
    const { title, body, publishedDate } = post[0];
    return (
        <PostViewerBlock>
            <PostHead>
                <h2>{title}</h2>
                <SubInfo 
                username='{user.username}'
                publishedDate={publishedDate}
                hasMarginTop
                />
            </PostHead>
            <PostContent
                dangerouslySetInnerHTML={{ __html: body }}
            />
            {actionButtons}
        </PostViewerBlock>
    );
};

export default PostViewer;