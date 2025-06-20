import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Mypage from '../Mypage/Mypage';
import { useQueryClient } from '@tanstack/react-query';

function Logout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("AccessToken");
            queryClient.invalidateQueries({
                queryKey: ["principalUserQuery"],
            }).then(() => {
                navigate("/");
            })
        } else {
            navigate(-1);
        }
    }, []);
    return <></>
}

function AuthRouter(props) {
    return (
        <Routes>
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    );
}

export default AuthRouter;