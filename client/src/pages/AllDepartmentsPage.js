import React, { useEffect, useState } from 'react';
import Container from '../layouts/Container';
import { useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import FlexRow from '../layouts/FlexRow';
import { useHistory } from 'react-router-dom'
import { getDepartments } from '../store/appStore/selectors';
import { DEPARTMENTS_ROUTE } from '../utils/constants';
import CreateDepartment from '../components/modal/CreateDepartment';
import { $fethAuth } from "../api/index";

function AllDepartmentsPage() {
    const departments = useSelector(getDepartments);
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [extendedDepartmamts, setExtendedDepartmamts] = useState([]);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (department) => {
        history.push(DEPARTMENTS_ROUTE + '/' + department.id);
    }

    useEffect(() => {
        getExtendedDepartmamts();
    }, []);

    const getExtendedDepartmamts = async () => {
        const {data} = await $fethAuth.get(`api/departments/extend`);
        setExtendedDepartmamts(data);
    }

    if (!departments) {
        return <Spin size="large" className="spin" />
    }

    const getCurrentWorkers = (id) => {
        const item = extendedDepartmamts.find((elem) => id === elem.id)

        if (item) {
            return item.countworkers;
        }

        return 0;
    }

    return (
        <div>
            <Container>
            <h2 style={{fontSize: 24, padding: '15px 0 0 20px'}}>Отделы</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 65, borderTop: '1px solid black'}}>
                <h2 style={{fontSize: 16, marginBottom: 0, marginLeft: 30, marginRight: 50}}>Сортировка:</h2>
                <Button type="primary" onClick={showModal}>Добавить отдел</Button>
            </div>
            <FlexRow style={{height: 50, marginLeft: 40}}>
                <div style={{fontSize: 20}} className="w-25 text-center">#</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Название отдела</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Чеки за месяц</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Сотрудники</div>
            </FlexRow>
            {
                departments.map((department) => {
                    let img = require(`../assets/defaultDepartment.png`).default;
                    if (department.img) {
                        img = process.env.REACT_APP_API_URL + department.img;
                    }
                    return (
                        <FlexRow
                            hover
                            key={department.id}
                            style={{height: 50}}
                            onClick={() => handleClick(department)}
                        >
                            <div className="w-25 text-center"><img width={50} height={50} src={ img } alt=""/></div>
                            <div className="w-25 text-center">{department.name}</div>
                            <div className="w-25 text-center">10</div>
                            <div className="w-25 text-center">{getCurrentWorkers(department.id)}/{department.maxWorkers}</div>
                        </FlexRow>
                    );
                })
            }
        </Container>
        <CreateDepartment handleOk={handleOk} handleCancel={handleCancel} isModalVisible={isModalVisible} />
        </div>
    )
}

export default AllDepartmentsPage
