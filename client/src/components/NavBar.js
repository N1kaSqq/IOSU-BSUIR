import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { Trophy } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE,
        REGISTRATION_ROUTE,
        MAIN_ROUTE,
        EMPLOYEES_ROUTE,
        DEPARTMENTS_ROUTE,
} from '../utils/constants'
import { setIsAuth, setUser } from '../store/userStore/actions';
import { getIsAuth, getUser } from '../store/userStore/selectors';
import { getDepartments } from '../store/appStore/selectors';

const { SubMenu } = Menu;
const { Header } = Layout;

function NavBar() {

    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const departments = useSelector(getDepartments);

    const handleLogout = () => {
        dispatch(setIsAuth(false));
        history.push(MAIN_ROUTE)
      }

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff', display: 'flex' }}>
            <Menu theme="light" mode="horizontal" style={{ width: '50%', display: 'flex'}}>
                {
                    isAuth ?
                    <>
                        <Menu.Item
                            key="main"
                            onClick={() => history.push(MAIN_ROUTE)}
                        >
                            Главная
                        </Menu.Item>
                        <Menu.Item
                            key="staff"
                            onClick={ ()=> history.push(EMPLOYEES_ROUTE) }
                        >
                            Сотрудники
                        </Menu.Item>
                        <SubMenu key="SubMenu" title="Отделы и продажи">
                            <Menu.ItemGroup title="Отделы">
                                {
                                    departments.map(department => (
                                        <Menu.Item key={department.id}>{department.name}</Menu.Item>
                                    ))
                                }
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="продажи">
                                <Menu.Item key="setting:1" onClick={() => history.push(DEPARTMENTS_ROUTE)}>Все отделы</Menu.Item>
                                <Menu.Item key="setting:2">Все продажи</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Menu.Item key="goods">
                            Товары
                        </Menu.Item>
                        <Menu.Item key="suppliers">
                            Поставщики
                        </Menu.Item>
                    </>
                    :
                    <>
                        <Menu.Item
                            key="main"
                            onClick={() => history.push(MAIN_ROUTE)}
                        >
                            Главная
                        </Menu.Item>
                    </>
                }
                
            </Menu>
            <Menu theme="light" mode="horizontal" style={{ width: '50%', display: 'flex', justifyContent: 'flex-end'}}>
                {
                    isAuth ? 
                    <>
                        <Menu.Item key="profile" icon={<Trophy style={{transform: 'translateY(3px)'}} size={16} color="#f39c12"/>}>
                            Профиль
                        </Menu.Item>
                        <Menu.Item
                            key="logout"
                            style={{padding: '0 15px'}}
                            onClick={handleLogout}
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
