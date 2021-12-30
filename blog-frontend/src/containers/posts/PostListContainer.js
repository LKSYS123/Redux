import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { posts, error, loading } = useSelector(
        ({ posts, loading }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
        }),
    );
    useEffect(() => {
        dispatch(listPosts());
    }, [dispatch]);
    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
        />
    );
};

export default withRouter(PostListContainer);