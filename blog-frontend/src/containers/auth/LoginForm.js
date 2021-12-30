import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { withRouter } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));

    // 인풋 변경 이벤트
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    // 폼 등록 이벤트
    const onSubmit = e => {
        e.preventDefault();
        const { UserId, UserPass } = form;
        dispatch(login({ UserId, UserPass }));
    };

    // 컴포넌트가 처음 렌더링 될 때 form 초기화
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('===== authError 오류 발생 =====');
            console.log('authError ===== ' + authError);
            setError('===== 로그인 실패 =====');
            return;
        }
        if (auth) {
            history.push('/');
            try {
                sessionStorage.setItem('auth', JSON.stringify(auth));
            } catch (e) {
                console.log('sessionStorage is not working');
            }
            // console.log('===== auth 로그인 성공 =====')
            // const { UserId, UserPass, UserName } = auth;
            // dispatch(check(UserId));
        }
    }, [history, auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
            try {
                sessionStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('sessionStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm type='login' form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    );
};

export default withRouter(LoginForm);