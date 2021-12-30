import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { deletePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
    // 처음 마운트될 때 포스트 읽기 API 요청
    const { id } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading } = useSelector(({ post, loading }) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
    }));

    useEffect(() => {
        dispatch(readPost(id));
        // 언마운트될 때 리덕스에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, id]);

    const onEdit = () => {
        dispatch(setOriginalPost(post[0]));
        history.push('/write');
    }

    const onRemove = async () => {
        try {
            await deletePost(id);
            history.push('/postList');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <PostViewer
            post={post}
            loading={loading}
            error={error}
            actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
        />
    );
};

export default withRouter(PostViewerContainer);