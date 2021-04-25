import React, { useEffect } from 'react';
import Container from '../layouts/Container';
import { useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import FlexRow from '../layouts/FlexRow';
import { useHistory } from 'react-router-dom'
import { getUsers, getDepartments } from '../store/appStore/selectors';
import getRandomNumber from '../utils/getRandomNumber';
import { EMPLOYEES_ROUTE } from '../utils/constants'

const { Option } = Select;

function EmployeesPage() {
    const users = useSelector(getUsers);
    const departments = useSelector(getDepartments);
    const history = useHistory();

    useEffect(() => {
        console.log(11);
    }, [])

    const handleClick = (employee) => {
        history.push(EMPLOYEES_ROUTE + '/' + employee.id);
    }

    const setColor = (employee) => {
        if (employee.monthSales < 4 && employee.role !== 'ADMIN') {
            return 'red';
        }
        return 'green';
    }

    return (
        <Container>
            <h2 style={{fontSize: 24, padding: '15px 0 0 20px'}}>Сотрудники</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 65, borderTop: '1px solid black'}}>
                <h2 style={{fontSize: 16, marginBottom: 0, marginLeft: 30}}>Сортировка:</h2>
                <Select defaultValue="Все отделы" style={{ width: 140, marginLeft: 30 }}>
                <Option value="Все отделы">Все отделы</Option>
                {
                    departments.map(department => (
                        <Option key={department.id} value={department.name}>{department.name}</Option>
                    ))
                }
                </Select>
                <Select defaultValue="По умолчанию" style={{ width: 140, marginLeft: 30 }}>
                    <Option value="По умолчанию">По умолчанию</Option>
                    <Option value="По возрастанию">По возрастанию</Option>
                    <Option value="По убыванию">По убыванию</Option>
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
                    return (
                        <FlexRow
                            key={employee.id}
                            style={{height: 50}}
                            onClick={() => handleClick(employee)}
                        >
                            <div className="w-25 text-center"><img width={50} height={50} src={ require(`../assets/defaultUser${getRandomNumber(1,3)}.png`).default } alt=""/></div>
                            <div className="w-25 text-center">{employee.name}</div>
                            <div className="w-25 text-center">{employee.department}</div>
                            <div style={{fontSize: 20}} className={`w-25 text-center ${setColor(employee)}`}>{employee.monthSales}</div>
                        </FlexRow>
                    );
                })
            }
            {/* <Spin size="large" className="spin" /> */}
        </Container>
    )
}

export default EmployeesPage
