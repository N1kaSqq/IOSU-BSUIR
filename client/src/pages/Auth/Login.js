import React from 'react';
import { Form, Input, Button, Checkbox, Card  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {  MAIN_ROUTE } from '../../utils/constants';
import { setIsAuth, setUser } from '../../store/userStore/actions';
import './auth.css';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(setIsAuth(true));
    history.push(MAIN_ROUTE)
  }

    return (
        <Card className="auth-card" title="Вход в систему" bordered={false}>
        <Form
        layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Номер договора"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{padding: '0px 20px'}}
          onClick={handleLogin}
        >
          Вход
        </Button>
      </Form.Item>
    </Form>
    </Card>
    )
}

export default Login
