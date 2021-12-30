import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/auth';

const HeaderContainer = ({ history }) => {
    const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        if (auth === null) {
            history.push('/');
        }
    }
    return <Header auth={auth} onLogout={onLogout} />;
};

export default HeaderContainer;