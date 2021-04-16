import React from 'react';
import { Form, Input, Button, Card, Select, DatePicker, InputNumber, Switch, } from 'antd';  

function Register() {
    const { Option } = Select;

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 85, height: 30 }}>
            <Option value="375">+375</Option>
            <Option value="7">+7</Option>
          </Select>
        </Form.Item>
      );

    return (
        <Card title="Регистрация пользователя" bordered style={{ width: 500, padding: '0 30px', margin: '60px auto' }}>
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
        <Input />
      </Form.Item>

      <Form.Item
        label="ФИО"
        name="user"
        rules={[{ required: true, message: 'Введите ФИО' }]}
      >
        <Input />
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
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Номер телефона"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%'}} />
      </Form.Item>

      <Form.Item label="Отдел">
          <Select>
            <Select.Option value="demo">Отдел 1</Select.Option>
            <Select.Option value="demo2">Отдел 2</Select.Option>
          </Select>
      </Form.Item>

      <Form.Item label="Дата рождения">
          <DatePicker />
        </Form.Item>

      <Form.Item
        label="Дата приема на работу"
      >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Оклад" name="salary" rules={[{ required: true, message: 'Введите оклад' }]}>
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Повторите пароль"
        name="confirmPassword"
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Администратор">
          <Switch />
        </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{padding: '0px 20px'}}>
          Регистрация
        </Button>
      </Form.Item>
    </Form>
    </Card>
    )
}

export default Register
