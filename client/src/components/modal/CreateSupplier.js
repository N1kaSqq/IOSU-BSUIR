import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { openNotification } from '../../utils/openNotification';
import { setSuppliers } from '../../store/appStore/actions';
import { createSupplier, getAllSuppliers } from '../../api/departments';

function CreateSupplier(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const addSupplier = () => {
        const formData = new FormData();
        formData.append('name', name);
        createSupplier(formData)
        .then(data => {
            getAllSuppliers().then((suppliers) => {
                dispatch(setSuppliers(suppliers));
            });
            props.handleOk();
            openNotification('Поставщик успешно добавлен !', true);
        })
    };

    return (
        <Modal
            title="Добавить отдел"
            visible={props.isModalVisible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            footer={[
                <Button key="back" onClick={props.handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" onClick={addSupplier}>
                    Добавить
                </Button>,
            ]}
        >
            <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Название отдела"
                    name="username"
                    rules={[{ required: true, message: 'Please input name!' }]}
                >
                    <Input onChange={(e) => setName(e.target.value)}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateSupplier