import React, { useEffect, useState, useRef, Component  } from 'react';
import { Spin, Button } from 'antd';
import { $fethAuth } from "../api/index";
import Container from '../layouts/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCheck } from '../store/appStore/selectors';
import { useReactToPrint } from 'react-to-print';

class ComponentToPrint extends Component {
    render() {
        return (
            <div style={{ paddingTop: 50 }} className="check-wrapper">
                <h1 className="pd-10">Чек №{this.props.currentCheck.uuid}</h1>
                <h1 className="pd-10">{this.props.currentCheck.uuid}</h1>
                <h2 className="pd-10">Дата: {this.props.currentCheck.time}</h2>
                <h2 className="pd-10">Сотрудник: {this.props.user.name}</h2>
                <h2 className="pd-10">Отдел: {this.props.user?.department?.name}</h2>
                <h2 className="pd-10">Товар: {this.props.product.name}, {this.props.currentCheck.amount} шт.</h2>
                <h2 className="pd-10">стоимость: {this.props.currentCheck.amount * this.props.product.price}</h2>
        </div>
        )
    }
}


function CurrentCheckPage(props) {
    const [user, setUser] = useState({});
    const [product, setProduct] = useState({});
    const currentCheck = useSelector(getCurrentCheck);
    const dispatch = useDispatch();
    const [date, setDate] = useState('2020-04-21 09:25:00');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    
    useEffect(() => {
        getUser();
        getProduct();
        console.log(currentCheck);
    }, []);

    const getUser = async () => {
        const {data} = await $fethAuth.get(`api/users/${currentCheck.employeeId}`);
        console.log(data);
        setUser(data);
    }

    const getProduct = async () => {
        const {data} = await $fethAuth.get(`api/products/${currentCheck.productId}`);
        console.log(data);
        setProduct(data);
    }

    if (!currentCheck) {
        return <Spin size="large" className="spin" />
    }

    return (
        <Container>
            <Button onClick={handlePrint}>Печать</Button>
            <ComponentToPrint currentCheck={currentCheck} user={user} product={product} ref={componentRef} />
        </Container>
    )
}

export default CurrentCheckPage
