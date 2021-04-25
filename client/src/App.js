import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppRouter from './routes/AppRouter';
import { setIsAuth, setUser } from './store/userStore/actions';
import NavBar from './components/NavBar';
import { Layout, Spin } from 'antd';
import { check } from "./api/auth";
import 'antd/dist/antd.css';

const { Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    check().then((data) => {
        console.log(data);
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Spin size="large" className="spin" />
  }

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
