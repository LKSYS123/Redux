import React, { useEffect } from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, body, post, postError, id } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
        post: write.post,
        postError: write.postError,
        id: write.id,
    }));

    // 포스트 등록
    const onPublish = () => {
        if (id) {
            dispatch(updatePost({ id: id, title, body }))
        } else {
            dispatch(writePost({ title, body })
            )
        }
    }

    // 취소 
    const onCancel = () => {
        history.goBack();
    }

    // 성공 혹은 실패시 할 작업
    useEffect(() => {
        if (post) {
            const { id, title, body } = post;
            history.push(`/postList`);
        }
        if (postError) {
            console.log(postError);
        }
    }, [history, post, postError]);
    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!id} />;
};

export default withRouter(WriteActionButtonsContainer);