import React from 'react';
import { Form, Input, Button, Checkbox, Card  } from 'antd';  

function Login() {
    return (
        <Card title="Вход в систему" bordered style={{ width: 500, padding: '0 30px', margin: '60px auto' }}>
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
        <Button type="primary" htmlType="submit" style={{padding: '0px 20px'}}>
          Вход
        </Button>
      </Form.Item>
    </Form>
    </Card>
    )
}

export default Login
