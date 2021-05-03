import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments, getSuppliers } from '../../store/appStore/selectors';
import { openNotification } from '../../utils/openNotification';
import { setProducts } from '../../store/appStore/actions';
import { getAllProducts, createProduct } from '../../api/departments';

function CreateProduct(props) {
    const dispatch = useDispatch();
    const { Option } = Select;
    const departments = useSelector(getDepartments);
    const suppliers = useSelector(getSuppliers);
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [purchaseСost, setPurchaseСost] = useState(null);
    const [amount, setAmount] = useState(null);
    const [departmentId, setDepartmentId] = useState(null);
    const [supplierId, setSupplierId] = useState(null);

    const selectFile = e => {
        setFile(e.fileList[0]);
    };

    const addDepartment = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('purchaseСost', purchaseСost);
        formData.append('amount', amount);
        formData.append('departmentId', departmentId);
        formData.append('supplierId', supplierId);
        if (file) {
            formData.append('img', file.originFileObj);
        }
        createProduct(formData)
        .then(data => {
            getAllProducts().then((products) => {
                dispatch(setProducts(products));
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
                    label="Название товара"
                    name="username"
                    rules={[{ required: true, message: 'Please input name!' }]}
                >
                    <Input onChange={(e) => setName(e.target.value)}/>
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
                <Form.Item label="Поставщик">
                    <Select onChange={ id => setSupplierId(id) }>
                    <Option value={null}>Не задан</Option>
                    {
                        suppliers.map(supplier => (
                            <Option key={supplier.id} value={supplier.id}>{supplier.name}</Option>
                        ))
                    }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Стоимость"
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }]}
                >
                    <InputNumber min={1} onChange={(value) => setPrice(value)}/>   
                </Form.Item>
                <Form.Item
                    label="Стоимость закупки"
                    name="purchaseСost"
                    rules={[{ required: true, message: 'Please input Purchase Сost!' }]}
                >
                    <InputNumber min={1} onChange={(value) => setPurchaseСost(value)}/>   
                </Form.Item>
                <Form.Item
                    label="Количество товара"
                    name="amount"
                    rules={[{ required: true, message: 'Please input amount!' }]}
                >
                    <InputNumber min={1} onChange={(value) => setAmount(value)}/>   
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

export default CreateProduct