import React from 'react';
import { Layout, Menu } from 'antd';
import { Trophy } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from '../utils/constants'

const { SubMenu } = Menu;
const { Header } = Layout;

function NavBar() {

    const history = useHistory();

    const user = {
        isAuth: false,
    }

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff', display: 'flex' }}>
            <Menu theme="light" mode="horizontal" style={{ width: '50%', display: 'flex'}}>
            <Menu.Item
                key="main"
                onClick={() => history.push(MAIN_ROUTE)}
            >
                    Главная
                </Menu.Item>
                <Menu.Item key="staff">
                    Сотрудники
                </Menu.Item>
                <SubMenu key="SubMenu" title="Отделы и продажи">
                <Menu.ItemGroup title="Отделы">
                    <Menu.Item key="setting:1">Отдел 1</Menu.Item>
                    <Menu.Item key="setting:2">Отдел 2</Menu.Item>
                    <Menu.Item key="setting:3">Отдел 3</Menu.Item>
                    <Menu.Item key="setting:4">Отдел 4</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="продажи">
                    <Menu.Item key="setting:3">Все продажи</Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="goods">
                    Товары
                </Menu.Item>
                <Menu.Item key="suppliers">
                    Поставщики
                </Menu.Item>
            </Menu>
            <Menu theme="light" mode="horizontal" style={{ width: '50%', display: 'flex', justifyContent: 'flex-end'}}>
                {
                    user.isAuth ? 
                    <>
                        <Menu.Item key="profile" icon={<Trophy style={{transform: 'translateY(3px)'}} size={16} color="#f39c12"/>}>
                            Профиль
                        </Menu.Item>
                        <Menu.Item
                            key="logout"
                            style={{padding: '0 15px'}}
                            onClick={() => history.push(REGISTRATION_ROUTE)}
                        >
                            Выход
                        </Menu.Item>
                    </> :
                    <>
                        <Menu.Item
                            key="login"
                            style={{padding: '0 15px'}}
                            onClick={() => history.push(LOGIN_ROUTE)}
                        >
                            Вход
                        </Menu.Item>
                        <Menu.Item
                            key="register"
                            style={{padding: '0 15px'}}
                            onClick={() => history.push(REGISTRATION_ROUTE)}
                        >
                            Регистрация
                        </Menu.Item>
                    </>
                }
            </Menu>
      </Header>
    );
}

export default NavBar
