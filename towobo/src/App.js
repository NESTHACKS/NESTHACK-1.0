import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import CreateSignature from "./components/CreateSignature";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { APP_NAME } from "./util/constants";
import History from "./components/History";
import Sign from "./components/Sign";
import logo from "./assets/logo.png";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();
  const [loading ,setLoading] = useState(false);

  const login = async () => {
    setLoading(true)
    const e = window.ethereum
    if (!e) {
      alert('Metamask must be connected to use Polysign')
      return
    }
    try {
      const accs = await e.request({ method: 'eth_requestAccounts' });
      console.log('accounts', accs)
      setAccount(accs[0])
    } catch (e) {

    } finally {
      setLoading(false)
    }
  }

  const checkConnected = async () => {
    const e = window.ethereum
    if (!e) {
      return
    }
    const connected = e.isConnected()
    console.log('connected', connected)
    if (connected) {
      await login()
    }
  }

  const logout = 

  useEffect(() => {
    checkConnected()
  }, [])

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isSignature = path.startsWith("/sign");

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
         
          <Menu
            
            mode="horizontal"
            defaultSelectedKeys={[]}
          >
            <Menu.Item key={0}>
              <img
                src={logo}
                className="header-logo pointer"
                onClick={() => navigate("/")}
              />
            </Menu.Item>

            {!isSignature && (
              <>
                <Menu.Item key={1} onClick={() => navigate("/create")}>
                  Create signature request
                </Menu.Item>
                <Menu.Item key={2} onClick={() => navigate("/history")}>
                  History
                </Menu.Item>
              </>
            )}
            {!account && <span>
              <Button type="primary" onClick={login}  loading={loading} disabled={loading}>Connect Wallet</Button>
            </span> }
            {account && <span>
              HI 👋 {account.slice(0, 6)}...{account.slice(-4)}</span>}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign/:signId" element={<Sign account={account} />} />
              <Route path="/create" element={<CreateSignature account={account}/>} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2022 - Towobo
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
