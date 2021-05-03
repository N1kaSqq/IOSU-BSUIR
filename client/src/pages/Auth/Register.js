import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, DatePicker, InputNumber, Switch, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDepartments } from '../../store/appStore/selectors';
import { setIsAuth, setUser } from '../../store/userStore/actions';
import { registration } from "../../api/auth";
import {  MAIN_ROUTE } from '../../utils/constants';
import './auth.css';

function Register() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { Option } = Select;
    const departments = useSelector(getDepartments);
    const [contractNumber, setContractNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [employmentDate, setEmploymentDate] = useState('');
    const [salary, setSalary] = useState(null);
    const [departmentId, setDepartmentId] = useState();
    const [role, setRole] = useState('USER');

    const handleRegister = async () => {
      if (confirmPassword !== password) {
        alert('Пароли не совпадают');
      }
      try {
        const user = await registration(
          email,
          password,
          name,
          phoneNumber,
          contractNumber,
          birthDate,
          employmentDate,
          salary,
          departmentId,
          role
        );
        console.log(user);
        dispatch(setUser(user));
        dispatch(setIsAuth(true));
        history.push(MAIN_ROUTE);
    } catch (e) {
        alert(e.message)
    }
    }

    /* useEffect(() => {
      console.log(birthDate);
    }, [birthDate]) */

    return (
        <Card className="auth-card" title="Регистрация пользователя" bordered={false}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Номер договора"
              name="username"
              rules={[{ required: true, message: 'Введите номер договора' }]}
            >
              <Input onChange={(e) => setContractNumber(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="ФИО"
              name="user"
              rules={[{ required: true, message: 'Введите ФИО' }]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Номер телефона"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input onChange={(e) => setPhoneNumber(e.target.value)} style={{ width: '100%'}} />
            </Form.Item>

            <Form.Item label="Отдел">
                <Select onChange={ id => setDepartmentId(id) }>
                <Option value={null}>Не задан</Option>
                {
                    departments.map(department => (
                        <Option key={department.id} value={department.id}>{department.name}</Option>
                    ))
                }
                </Select>
            </Form.Item>

            <Form.Item label="Дата рождения">
                <DatePicker onChange={(e, date) => setBirthDate(date)} />
              </Form.Item>

            <Form.Item
              label="Дата приема на работу"
            >
                <DatePicker onChange={(e, date) => setEmploymentDate(date)} />
              </Form.Item>

              <Form.Item
                label="Оклад"
                name="salary"
                rules={[{ required: true, message: 'Введите оклад' }]}
              >
                <InputNumber onChange={(value) => setSalary(value)} />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Повторите пароль"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Item>

            <Form.Item label="Администратор">
                <Switch onClick={(checked) => {
                  if (checked) {
                    return setRole('ADMIN');
                  }
                  return setRole('USER');
                }} />
              </Form.Item>

            <Form.Item>
              <Button onClick={handleRegister} type="primary" htmlType="submit" style={{padding: '0px 20px'}}>
                Регистрация
              </Button>
            </Form.Item>
          </Form>
        </Card>
    )
}

export default Register
