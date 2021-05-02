import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openNotification } from '../../utils/openNotification';
import { setDepartments } from '../../store/appStore/actions';
import { createDepartment, getAllDepartments } from '../../api/departments';

function CreateDepartment(props) {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [maxGoods, setMaxGoods] = useState(null);
    const [maxWorkers, setMaxWorkers] = useState(null);

    const selectFile = e => {
        setFile(e.fileList[0]);
    };

    const addDepartment = () => {
        console.log(name, maxGoods, maxWorkers);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('maxGoods', maxGoods);
        formData.append('maxWorkers', maxWorkers);
        if (file) {
            formData.append('img', file.originFileObj);
        }
        createDepartment(formData)
        .then(data => {
            getAllDepartments().then((departments) => {
                dispatch(setDepartments(departments));
            });
            props.handleOk();
            openNotification('Раздел успешно добавлен !', true);
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
                <Button key="submit" type="primary" onClick={addDepartment}>
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
                <Form.Item
                    label="Число сотрудников"
                    name="maxWorkers"
                    rules={[{ required: true, message: 'Please input maxWorkers!' }]}
                >
                    <InputNumber min={1} max={100}  onChange={(value) => setMaxWorkers(value)}/>   
                </Form.Item>
                <Form.Item
                    label="Число товаров"
                    name="maxGoods"
                    rules={[{ required: true, message: 'Please input maxGoods!' }]}
                >
                    <InputNumber min={1}  onChange={(value) => setMaxGoods(value)}/>   
                </Form.Item> 


                <Form.Item
                    name="upload"
                    label="Картинка"
                    valuePropName="fileList"
                    getValueFromEvent={selectFile}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        method="GET"
                        maxCount={1}
                    >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateDepartment
