import React, { useEffect, useState } from 'react';
import Container from '../layouts/Container';
import { useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import FlexRow from '../layouts/FlexRow';
import { useHistory } from 'react-router-dom'
import { getUsers, getDepartments } from '../store/appStore/selectors';
import getRandomNumber from '../utils/getRandomNumber';
import { EMPLOYEES_ROUTE } from '../utils/constants'
import { $fethAuth } from "../api/index";

const { Option } = Select;

function EmployeesPage() {
    /* const users = useSelector(getUsers); */
    const departments = useSelector(getDepartments);
    const history = useHistory();

    const [users, setUsers] = useState([]);
    const [departmentId, setDepartmentId] = useState('all');
    const [orderBy, setOrderBy] = useState('default');
    
    useEffect(() => {
        getUsers();
    }, [departmentId, orderBy]);

    const getUsers = async () => {
        const {data} = await $fethAuth.get(`api/users?departmentId=${departmentId}&orderBy=${orderBy}`);
        setUsers(data);
    }

    const handleClick = (employee) => {
        history.push(EMPLOYEES_ROUTE + '/' + employee.id);
    }

    const setColor = (employee) => {
        if (employee.monthSales < 4 && employee.role !== 'ADMIN') {
            return 'red';
        }
        return 'green';
    }

    if (!users) {
        return <Spin size="large" className="spin" />
    }

    return (
        <Container>
            <h2 style={{fontSize: 24, padding: '15px 0 0 20px'}}>Сотрудники</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 65, borderTop: '1px solid black'}}>
                <h2 style={{fontSize: 16, marginBottom: 0, marginLeft: 30}}>Сортировка:</h2>
                <Select onChange={ id => setDepartmentId(id)} defaultValue="Все отделы" style={{ width: 140, marginLeft: 30 }}>
                <Option value="all">Все отделы</Option>
                {
                    departments.map(department => (
                        <Option key={department.id} value={department.id}>{department.name}</Option>
                    ))
                }
                </Select>
                <Select onChange={ e => setOrderBy(e)} defaultValue="default" style={{ width: 140, marginLeft: 30 }}>
                    <Option value="default">По умолчанию</Option>
                    <Option value="ASC">По возрастанию</Option>
                    <Option value="DESC">По убыванию</Option>
                </Select>
            </div>
            <FlexRow style={{height: 50, marginLeft: 40}}>
                <div style={{fontSize: 20}} className="w-25 text-center">#</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Имя</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Отдел</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Продажи за месяц</div>
            </FlexRow>
            {
                users.map((employee) => {
                    employee.monthSales = 10;
                    return (
                        <FlexRow
                            hover
                            key={employee.id}
                            style={{height: 50}}
                            onClick={() => handleClick(employee)}
                        >
                            <div className="w-25 text-center"><img width={50} height={50} src={ require(`../assets/defaultUser${getRandomNumber(1,3)}.png`).default } alt=""/></div>
                            <div className="w-25 text-center">{employee.name}</div>
                            <div className="w-25 text-center">{employee?.department?.name}</div>
                            <div style={{fontSize: 20}} className={`w-25 text-center ${setColor(employee)}`}>{employee.monthSales}</div>
                        </FlexRow>
                    );
                })
            }
        </Container>
    )
}

export default EmployeesPage
