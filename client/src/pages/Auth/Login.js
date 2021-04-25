import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {  MAIN_ROUTE } from '../../utils/constants';
import { setIsAuth, setUser } from '../../store/userStore/actions';
import { login } from "../../api/auth";
import './auth.css';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [contractNumber, setContractNumber] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
        const user = await login(contractNumber, password);
        dispatch(setUser(user));
        dispatch(setIsAuth(true));
        history.push(MAIN_ROUTE);
    } catch (e) {
        alert(e.response.data.message)
    }

}

  /* useEffect(() => {
    console.log(contractNumber, password);
  }, [contractNumber, password]) */

    return (
        <Card className="auth-card" title="Вход в систему" bordered={false}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Номер договора или почта"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input onChange={e => setContractNumber(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={e => setPassword(e.target.value)} />
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
