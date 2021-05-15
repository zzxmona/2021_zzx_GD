import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card ,Table, Tag, Space, Layout, Menu, Breadcrumb  } from 'antd';
import { UserOutlined, SketchOutlined } from '@ant-design/icons';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Web3 from "web3";
import "./contract.address"
import FormItem from 'antd/lib/form/FormItem';

class Apply extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          address:"",
          address2:"",
          time:"",
          imf:[]
      };
    }
    async componentDidMount() {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum
        ethereum.autoRefreshOnNetworkChange = false
        try {
          const accounts = await ethereum.enable()
          const provider = window['ethereum']
          const web3 = new Web3(provider)
          const abi = require("./contract.abi.json")
          const address = global.contract.address
          window.myContract = new web3.eth.Contract(abi.abi,address)
          window.defaultAccount = accounts[0].toLowerCase()
          this.setState({address:window.defaultAccount})
          ethereum.on('accountsChanged', function () {
            window.location.href="/find"
          })
        } catch (e) {
  
        }
      } else {
        console.log('没有metamask')
      }
    }
      submit = ()  =>{
        window.myContract.methods.applyDiploma(
          ).send({from:this.state.address}).on('transactionHash',(transactionHash)=>{
            console.log('transactionHash',transactionHash)
          })
      }
        submit2=()=>{
            window.myContract.methods.getchange().call({from:this.state.address}).then(value=>{
              console.log(value)
              this.setState({
                imf:value
              })
            })
          }
          submit3=()=>{
            window.myContract.methods.quanxianaddress(this.state.address).call({from:this.state.address}).then(value=>{
              console.log(value)
              if(value){
                this.props.history.push("/change");
              }else{
                alert("您未拥有修改权限")
              }
            })
          }
        render() {
          const { Header, Content, Footer } = Layout;
      return (
        <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="position">
        <Menu.Item key="1"><NavLink to = "/find" className="pure-menu-link">认证申请</NavLink></Menu.Item>
      </Menu>
    </Header>
        <Content style={{ padding: '0 50px' ,margin: '200px 0'}}>
        <div>当前地址为：{this.state.address}</div>
            <h1>学历认证申请</h1>
          <Form >
        <Form.Item>
           <Button style={{left:10}}
          type="primary" htmlType="submit" onClick={this.submit}>
          认证申请
          </Button>
        </Form.Item>
        <h1>学历认证查询</h1>
        <Form.Item
          name="eduid">
           <Button style={{left:10}}
          type="primary" htmlType="submit" onClick={this.submit2}>
          认证查询
          </Button>
          <div>当前认证状态：{this.state.imf._time}</div>
          <div>当前修改权限：{this.state.imf._quanxian}</div>
        </Form.Item>
        <h1>信息修改</h1>
        <Form.Item
          name="eduid">
           <Button style={{left:10}}
          type="primary" htmlType="submit" onClick={this.submit3}>
          前往
          </Button>
        </Form.Item>
      </Form>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ZZX Design ©2021 </Footer>
      </Layout>
      );
    }
  }

  export default Apply;