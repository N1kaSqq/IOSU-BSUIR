import React, { useEffect, useState } from 'react';
import Container from '../layouts/Container';
import { useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import FlexRow from '../layouts/FlexRow';
import { useHistory } from 'react-router-dom'
import { getDepartments } from '../store/appStore/selectors';
import { DEPARTMENTS_ROUTE } from '../utils/constants';
import CreateDepartment from '../components/modal/CreateDepartment';

function AllDepartmentsPage() {
    const departments = useSelector(getDepartments);
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        console.log(11);
    }, [])

    const handleClick = (department) => {
        history.push(DEPARTMENTS_ROUTE + '/' + department.id);
    }

    return (
        <div>
            <Container>
            <h2 style={{fontSize: 24, padding: '15px 0 0 20px'}}>Сотрудники</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 65, borderTop: '1px solid black'}}>
                <h2 style={{fontSize: 16, marginBottom: 0, marginLeft: 30, marginRight: 50}}>Сортировка:</h2>
                <Button type="primary" onClick={showModal}>Добавить отдел</Button>
            </div>
            <FlexRow style={{height: 50, marginLeft: 40}}>
                <div className="w-25 text-center"><img width={50} height={50} src={ require(`../assets/defaultDepartment.png`).default } alt=""/></div>
                <div className="w-25 text-center">Название отдела</div>
                <div className="w-25 text-center">Чеки за месяц</div>
                <div className="w-25 text-center">Сотрудники</div>
            </FlexRow>
            {
                departments.map((department) => {
                    return (
                        <FlexRow
                            key={department.id}
                            style={{height: 50}}
                            onClick={() => handleClick(department)}
                        >
                            <div className="w-25 text-center"><img width={50} height={50} src={ require(`../assets/defaultDepartment.png`).default } alt=""/></div>
                            <div className="w-25 text-center">{department.name}</div>
                            <div className="w-25 text-center">10</div>
                            <div className="w-25 text-center">5/{department.maxWorkers}</div>
                        </FlexRow>
                    );
                })
            }
            {/* <Spin size="large" className="spin" /> */}
        </Container>
        <CreateDepartment handleOk={handleOk} handleCancel={handleCancel} isModalVisible={isModalVisible} />
        </div>
    )
}

export default AllDepartmentsPage
