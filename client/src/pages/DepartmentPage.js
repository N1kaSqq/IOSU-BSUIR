import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { $fethAuth } from "../api/index";
import Container from '../layouts/Container';

function DepartmentPage(props) {
    const [department, setDepartment] = useState({});
    
    useEffect(() => {
        getDepartment();
    }, []);

    const getDepartment = async () => {
        const {data} = await $fethAuth.get(`api/departments/${props.match.params.id}`);
        setDepartment(data);
    }

    if (!department) {
        return <Spin size="large" className="spin" />
    }

    let img = require(`../assets/defaultDepartment.png`).default;
    if (department.img) {
        img = process.env.REACT_APP_API_URL + department.img;
    }

    return (
        <Container>
            <div className="user-box">
                <img width={250} height={250} src={ img } alt=""/>
                <div style={{width: 300, height: 250, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column'}}>
                    <h1>{department.name}</h1>
                    <h2>Максимальное число товаров {department.maxGoods}</h2>
                    <h3>Максимальное число сотрудников {department.maxWorkers}</h3>
                </div>
            </div>
        </Container>
    )
}

export default DepartmentPage
