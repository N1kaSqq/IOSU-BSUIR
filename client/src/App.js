import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import NavBar from './components/NavBar';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NavBar />
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <div className="site-layout-background content">
            <AppRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Nikita Bogdanov using Ant Design ©2018</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
