import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../store/userStore/actions';
import { getIsAuth, getUser } from '../store/userStore/selectors';
import { Button } from 'antd';  

function MainPage() {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const [loading, setloading] = useState(false);

    useEffect(()=> {
        setloading(false);
        console.log(isAuth);
    }, [isAuth]);

    const handleClick = () => {
        setloading(true);
        dispatch(setIsAuth(!isAuth));
    }

    return (
        <div>
            <h2>MainPage</h2>
            <Button
                type="primary"
                loading={loading}
                onClick={handleClick}
            >
                Primary Button
            </Button>
        </div>
    )
}

export default MainPage
