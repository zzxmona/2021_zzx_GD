import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card ,Table, Tag, Space, Layout, Menu, Breadcrumb ,Select  } from 'antd';
import { UserOutlined, SketchOutlined } from '@ant-design/icons';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Web3 from "web3";
import "./contract.address"

class Find extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username:"",
        address1:"", 
        address2:"",  
        imformation:[],
        applycount:"",
        stucount:"",
        manage:""
      };
    }
    async componentDidMount() {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum
        ethereum.autoRefreshOnNetworkChange = false
        try {
          const accounts = await ethereum.enable()
          console.log(accounts)
          const provider = window['ethereum']
          console.log(provider)
          console.log(provider.chainId)
          const web3 = new Web3(provider)
          console.log(web3)
          const abi = require("./contract.abi.json")
          const address = global.contract.address
          window.myContract = new web3.eth.Contract(abi.abi,address)
          console.log(window.myContract)
          window.defaultAccount = accounts[0].toLowerCase()
          this.setState({address:window.defaultAccount})
          console.log(window.defaultAccount)
          ethereum.on('accountsChanged', function (accounts) {
            console.log("accountsChanged:" + accounts)
          })
          ethereum.on('networkChanged', function (networkVersion) {
            console.log("networkChanged:" + networkVersion)
          })
        } catch (e) {
  
        }
      } else {
        console.log('没有metamask')
      }
    }

      findimf = e => {
        this.setState({ address2: e.target.value });
      };


      getimf=()=>{
        window.myContract.methods.findbyaddress(this.state.address2).call().then(value=>{
          console.log(value)
          this.setState({
            imformation:value
          })
        })
      }
      getStuAccount=()=>{
        window.myContract.methods.getStuAccount().call().then(value=>{
          console.log(value)
          this.setState({
            stucount:value
          })
        })
      }
      getApplyAccount=()=>{
        window.myContract.methods.getApplyAccount().call().then(value=>{
          console.log(value)
          this.setState({
            applycount:value
          })
        })
      }
      manage = ()  =>{
        window.myContract.methods.manager(
          this.state.address2,
          this.state.manage
          ).send({from:this.state.address}).on('transactionHash',(transactionHash)=>{
            console.log('transactionHash',transactionHash)
          })
      }
      handle=() =>{
        const w=window.open('about:blank');
        w.location.href='https://ipfs.io/ipfs/' + this.state.imformation._hash
        }        
    render() {
        const dataSource = [
            {
              id: this.state.imformation._sid,
              name: this.state.imformation._name,
              major: this.state.imformation._major,
              eduType: this.state.imformation._eduType,
              overtime: this.state.imformation._overtime,
              time: this.state.imformation._time,
            },
          ];
          
          const columns = [
            {
                title: '学号',
                dataIndex: 'id',
              },
            {
              title: '姓名',
              dataIndex: 'name',
            },
            {
              title: '专业',
              dataIndex: 'major',
            },
            {
              title: '教育层次',
              dataIndex: 'eduType',
            },
              {
                title: '毕业时间',
                dataIndex: 'overtime',
              },
              {
                title: '认证状态',
                dataIndex: 'time',
              },

          ];
          const { Option } = Select;
          const { Header, Content, Footer } = Layout;
      return (
        <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="position">
        <Menu.Item key="1"><NavLink to = "/find" className="pure-menu-link">管理员确认</NavLink></Menu.Item>

      </Menu>
    </Header>
        <Content style={{ padding: '0 50px' ,margin: '50px 0'}}>
        <Form style={{margin: '100px 0'}}> 
        <Button style={{left:40}}
        type="primary" htmlType="submit" onClick={this.getStuAccount}>
          查询学生数量
          </Button>
          <div>当前学生数量为：{this.state.stucount}</div>
          <Button style={{left:40}}
        type="primary" htmlType="submit" onClick={this.getApplyAccount}>
          查询申请信息数量
          </Button>
          <div>当前申请数量为：{this.state.applycount}</div>
          </Form>
          <Form >
        <Form.Item name="address">
          <Input style={{width: 500}}
          prefix={<SketchOutlined />} placeholder="地址" onChange={this.findimf}/>
        <Button style={{left:20}}
        type="primary" htmlType="submit" onClick={this.getimf}>
          查询学历信息
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataSource} columns={columns} />
      <Form.Item >
      <Button style={{left:20}}
        type="primary"  onClick={this.handle}>
          查询学籍文件
          </Button>
      <div style={{ marginBottom: 16 ,width : 200 }}>
      选择认证结果：
              <Select defaultValue="选择审核结果" onChange= {e => {
        this.setState({ manage: e });
      }}>
              <Option value="通过">通过</Option>
              <Option value="未通过">未通过</Option>
            </Select>
    </div>
        <Button style={{left:20}}
        type="primary" htmlType="submit" onClick={this.manage}>
          认证
          </Button>
        </Form.Item>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ZZX Design ©2021 </Footer>
      </Layout>
      );
    }
  }

  export default Find;