import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import NavBar from './components/NavBar';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NavBar />
        <Content className="site-layout" style={{ padding: '0 25px', marginTop: 64, }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 'calc(100vh - 188px)', background: 'linear-gradient(90deg, #b9deed, #f0f2f5)' }}>
            <AppRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Nikita Bogdanov using Ant Design ©2018</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
