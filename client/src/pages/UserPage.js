import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { $fethAuth } from "../api/index";
import Container from '../layouts/Container';

function UserPage(props) {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const {data} = await $fethAuth.get(`api/users/${props.match.params.id}`);
        setUser(data);
    }

    if (!user) {
        return <Spin size="large" className="spin" />
    }

    return (
        <Container>
            <div className="user-box">
                <img width={250} height={250} src={ require('../assets/defaultUser1.png').default } alt=""/>
                <div style={{width: 300, height: 250, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column'}}>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                    <h3>{user.phoneNumber}</h3>
                </div>
            </div>
            {
                user.department && user.department.name && <h1 style={{textAlign: 'center', marginTop: 50}}>{user.department.name}</h1>
            }
        </Container>
    )
}

export default UserPage
