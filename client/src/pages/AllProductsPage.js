import React, { useEffect, useState } from 'react';
import Container from '../layouts/Container';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Spin, Button } from 'antd';
import FlexRow from '../layouts/FlexRow';
import { useHistory } from 'react-router-dom'
import { getDepartments, getProducts } from '../store/appStore/selectors';
import { setProducts } from '../store/appStore/actions';
import { GOODS_ROUTE } from '../utils/constants'
import CreateProduct from '../components/modal/CreateProduct';
import { $fethAuth } from "../api/index";

const { Option } = Select;

function AllProductsPage() {
    const dispatch = useDispatch();
    const departments = useSelector(getDepartments);
    const products = useSelector(getProducts);
    const history = useHistory();

    const [departmentId, setDepartmentId] = useState('all');
    const [orderBy, setOrderBy] = useState('default');
    
    useEffect(() => {
        loadProducts();
    }, [departmentId, orderBy]);

    const loadProducts= async () => {
        const {data} = await $fethAuth.get(`api/products?departmentId=${departmentId}&orderBy=${orderBy}`);
        dispatch(setProducts(data));
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (product) => {
        history.push(GOODS_ROUTE + '/' + product.id);
    }

    const setColor = (monthSales) => {
        if (monthSales < 4) {
            return 'red';
        }
        return 'green';
    }

    if (!products) {
        return <Spin size="large" className="spin" />
    }

    return (
      <div>
        <Container>
            <h2 style={{fontSize: 24, padding: '15px 0 0 20px'}}>Товары</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 65, borderTop: '1px solid black'}}>
                <h2 style={{fontSize: 16, marginBottom: 0, marginLeft: 30}}>Сортировка:</h2>
                <Button style={{ width: 140, marginLeft: 30 }} type="primary" onClick={showModal}>Добавить Товар</Button>
                <Select onChange={ id => setDepartmentId(id)} defaultValue="Все отделы" style={{ width: 140, marginLeft: 30 }}>
                <Option value="all">Все отделы</Option>
                {
                    departments.map(department => (
                        <Option key={department.id} value={department.id}>{department.name}</Option>
                    ))
                }
                </Select>
                <Select onChange={ e => setOrderBy(e)} defaultValue="default" style={{ width: 140, marginLeft: 30 }}>
                    <Option value="default">По умолчанию</Option>
                    <Option value="ASC">По возрастанию</Option>
                    <Option value="DESC">По убыванию</Option>
                </Select>
            </div>
            <FlexRow style={{height: 50, marginLeft: 40}}>
                <div style={{fontSize: 20}} className="w-25 text-center">#</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Имя</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Отдел</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Стоимость</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Продажи за месяц</div>
            </FlexRow>
            {
                products.map((product) => {
                    const monthSales = 10;
                    let img = require(`../assets/defaultDepartment.png`).default;
                    if (product.img) {
                        img = process.env.REACT_APP_API_URL + product.img;
                    }
                    return (
                        <FlexRow
                            hover
                            key={product.id}
                            style={{height: 50}}
                            onClick={() => handleClick(product)}
                        >
                            <div className="w-25 text-center"><img width={50} height={50} src={ require(`../assets/defaultDepartment.png`).default } alt=""/></div>
                            <div className="w-25 text-center">{product.name}</div>
                            <div className="w-25 text-center">{product?.department?.name}</div>
                            <div style={{fontSize: 20}} className="w-25 text-center">{product.price}</div>
                            <div style={{fontSize: 20}} className={`w-25 text-center ${setColor(monthSales)}`}>{monthSales}</div>
                        </FlexRow>
                    );
                })
            }
        </Container>
        <CreateProduct handleOk={handleOk} handleCancel={handleCancel} isModalVisible={isModalVisible} />
      </div>
    )
}

export default AllProductsPage