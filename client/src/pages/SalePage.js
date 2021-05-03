import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin, InputNumber, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { getUser } from '../store/userStore/selectors';
import { setCurrentCheck } from '../store/appStore/actions';
import { openNotification } from '../utils/openNotification';
import Container from '../layouts/Container';
import { $fethAuth } from "../api/index";
import { CURRENTCHECK_ROUTE } from '../utils/constants';
import { createCheck } from '../api/departments'

const { Option } = Select;
const uuid = require('uuid');

function SalePage() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const history = useHistory();
    const [products, setProducts] = useState([])
    const [extendedUser, setExtendedUser] = useState({});
    const [productId, setProductId] = useState(null);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        getExtendedUser();
    }, []);

    const getExtendedUser = async () => {
        if (user) {
            const {data} = await $fethAuth.get(`api/users/${user.id}`);
            await setExtendedUser(data);
            await getProducts(data.departmentId);
        }
    }

    const getProducts = async (id) => {
        const {data} = await $fethAuth.get(`api/products?departmentId=${id}&orderBy=default`);
        setProducts(data);
    }

    const handleCheck = () => {
        if (!productId || !amount) {
            openNotification('Выберите товар!!', false);
            return;
        }
        let rightNow = new Date();
        let time = rightNow.toISOString();
        const newCheck = {
            uuid: uuid.v4(),
            time: time,
            employeeId: user.id,
            productId: productId,
            amount: amount,
        };
        if (time && newCheck.employeeId && amount && newCheck.productId) {
            createCheck({time, userId: newCheck.employeeId, amount, productId: newCheck.productId});
        }
        dispatch(setCurrentCheck(newCheck));
        history.push(CURRENTCHECK_ROUTE);
    }

    if (!user) {
        return <Spin size="large" className="spin" />
    }

    return (
        <Container>
            <div className="user-box">
                <img width={150} height={150} src={ require('../assets/defaultUser1.png').default } alt=""/>
                <div style={{width: 300, height: 150, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column'}}>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                    <h3>{user.phoneNumber}</h3>
                </div>
            </div>
            {
                extendedUser.department && extendedUser.department.name && <h1 style={{textAlign: 'center', marginTop: 50}}>{extendedUser.department.name}</h1>
            }
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Select onChange={ id => setProductId(id)} defaultValue="товары" style={{ width: 280, marginTop: 15 }}>
                    {
                        products.map(product => (
                            <Option key={product.id} value={product.id}>{product.name}</Option>
                        ))
                    }
                </Select>
                <p style={{ marginBottom: 2, marginTop: 10 }} >количество товара</p>
                <InputNumber min={1} max={100} defaultValue={1} onChange={(value) => setAmount(value)} />
                <Button onClick={handleCheck} style={{ width: 240, height: 40, marginTop: 30 }} ghost block>Напечатать чек</Button>
                {
                    productId ? 
                    <p style={{ marginBottom: 2, marginTop: 10 }} >Цена: {amount * (products.find((e) => e.id === productId)).price }</p>
                    : null
                }
            </div>
        </Container>
    )
}

export default SalePage