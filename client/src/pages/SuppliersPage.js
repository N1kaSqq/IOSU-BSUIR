import React, { useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
import { $fethAuth } from "../api/index";
import { useSelector, useDispatch } from 'react-redux';
import Container from '../layouts/Container';
import FlexRow from '../layouts/FlexRow';
import CreateSupplier from '../components/modal/CreateSupplier';
import { setSuppliers } from '../store/appStore/actions';
import { getSuppliers } from '../store/appStore/selectors';

function SuppliersPage(props) {
    const dispatch = useDispatch();
    const suppliers = useSelector(getSuppliers);
    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        const {data} = await $fethAuth.get('api/suppliers');
        dispatch(setSuppliers(data));
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

    if (!suppliers) {
        return <Spin size="large" className="spin" />
    }

    return (
        <div>
            <Container>
            <h2 style={{fontSize: 24, padding: '15px 0 0 20px'}}>Поставщики</h2>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 65, borderTop: '1px solid black'}}>
                <h2 style={{fontSize: 16, marginBottom: 0, marginLeft: 30, marginRight: 50}}>Сортировка:</h2>
                <Button type="primary" onClick={showModal}>Добавить поставщика</Button>
            </div>
            <FlexRow style={{height: 50, marginLeft: 40}}>
                <div style={{fontSize: 20}} className="w-25 text-center">#</div>
                <div style={{fontSize: 20}} className="w-25 text-center">Название отдела</div>
                <div style={{fontSize: 20}} className="w-25 text-center">#</div>
                <div style={{fontSize: 20}} className="w-25 text-center">#</div>
            </FlexRow>
            {
                suppliers.map((supplier) => {
                    let img = require(`../assets/defaultDepartment.png`).default;
                    return (
                        <FlexRow
                            key={supplier.id}
                            style={{height: 50}}
                        >
                            <div className="w-25 text-center"><img width={50} height={50} src={ img } alt=""/></div>
                            <div className="w-25 text-center">{supplier.name}</div>
                            <div className="w-25 text-center"><Button ghost>Редактировать</Button></div>
                            <div className="w-25 text-center"><Button ghost danger>Удалить</Button></div>
                        </FlexRow>
                    );
                })
            }
        </Container>
        <CreateSupplier handleOk={handleOk} handleCancel={handleCancel} isModalVisible={isModalVisible} />
        </div>
    )
}

export default SuppliersPage
