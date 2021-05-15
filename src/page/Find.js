import React, { Component } from 'react';
import { Form, Input, Button,Table,  Layout, Menu} from 'antd';
import { SketchOutlined } from '@ant-design/icons';
import { NavLink} from "react-router-dom";
import Web3 from "web3";
import "./contract.address"
import FormItem from 'antd/lib/form/FormItem';

class Find extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address:"",  
        name:"",
        imformation:[]
      };
    }
    async componentDidMount() {
        const ethereum = window.ethereum
        ethereum.autoRefreshOnNetworkChange = false
          const provider = window['ethereum']
          const web3 = new Web3(provider)
          const abi = require("./contract.abi.json")
          const address = global.contract.address
          window.myContract = new web3.eth.Contract(abi.abi,address)
    }

      addimf = e => {
        this.setState({ address: e.target.value });
      };
      nameimf = e => {
        this.setState({ name: e.target.value });
      };

      getimfadd=()=>{
        window.myContract.methods.outfindbyaddress(this.state.address).call().then(value=>{
          console.log(value)
          this.setState({
            imformation:value
          })
        })
      }
      getimfname=()=>{
        window.myContract.methods.outfindbyname(this.state.name).call().then(value=>{
          console.log(value)
          this.setState({
            imformation:value
          })
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
            },
          ];
          
          const columns = [
            {
                title: '学号',
                dataIndex: 'id',
                key: 'id',
              },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '专业',
              dataIndex: 'major',
              key: 'major',
            },
            {
              title: '教育层次',
              dataIndex: 'eduType',
              key: 'eduType',
            },
              {
                title: '毕业时间',
                dataIndex: 'overtime',
                key: 'overtime',
              },
          ];
          const { Header, Content, Footer } = Layout;
      return (
        <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="position">
        <Menu.Item key="1"><NavLink to = "/find" className="pure-menu-link">信息查询</NavLink></Menu.Item>
        <Menu.Item key="2"><NavLink to = "/resign" className="pure-menu-link">用户注册</NavLink></Menu.Item>
        <Menu.Item key="3"><NavLink to = "/login" className="pure-menu-link">用户登录</NavLink></Menu.Item>
        <Menu.Item key="4"><NavLink to = "/adminlogin" className="pure-menu-link">管理员登录</NavLink></Menu.Item>

      </Menu>
    </Header>
        <Content style={{ padding: '0 50px' ,margin: '200px 0'}}>
          <Form >
        <FormItem></FormItem>
        <Form.Item
          name="address"
        >
          <Input style={{width: 500}}
          prefix={<SketchOutlined />} placeholder="根据地址查询" onChange={this.addimf}/>

        <Button style={{left:10}}
        type="primary" htmlType="submit" onClick={this.getimfadd}>
          查询学历信息
          </Button>
        </Form.Item>
        <Form.Item name="name">
          <Input style={{width: 200}}
          prefix={<SketchOutlined />} placeholder="根据姓名查询" onChange={this.nameimf}/>

        <Button style={{left:10}}
        type="primary" htmlType="submit" onClick={this.getimfname}>
          查询学历信息
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataSource} columns={columns} />;
      <Button style={{left:20}}
        type="primary"  onClick={this.handle}>
          查询学籍文件
          </Button>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ZZX Design ©2021 </Footer>
      </Layout>
      );
    }
  }

  export default Find;