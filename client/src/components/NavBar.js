import React from 'react';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Header } = Layout;

function NavBar() {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#fff' }}>
            <Menu theme="light" mode="horizontal">
                <Menu.Item key="mail">
                Navigation One
                </Menu.Item>
                <Menu.Item key="app" disabled>
                Navigation Two
                </Menu.Item>
                <SubMenu key="SubMenu" title="Navigation Three - Submenu">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>
            </Menu>
      </Header>
    );
}

export default NavBar
