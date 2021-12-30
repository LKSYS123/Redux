import React from 'react';
import Header from '../components/common/Header';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPage = () => {
    return (
        <>
            <Header />
            <PostViewerContainer />
        </>
    );
};

export default PostPage;