import React, { Component } from 'react';
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import Web3 from "web3";
import "./contract.address"
class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "1",
        password: "1"
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
            window.location.reload()
          })
          console.log(this.state.address)
        } catch (e) {
        }
      } else {
        console.log('没有metamask')
      }
    }

    
      onUsernameChange = e => {
        this.setState({ username: e.target.value });
      };
    
      onPasswordChange = e => {
        this.setState({ password: e.target.value });
      };
    
      onSubmit=()=>{
        window.myContract.methods.adminLogin(
          this.state.username,
          this.state.password,
          ).call({from:this.state.address}).then(value =>{
            console.log(value)
            if (value) {
              console.log(value)
              alert("欢迎您，管理员")
              this.props.history.push("/admin");
            } else{
              alert("账户或者密码错误")
            }
          }
        )
      }  

    render() {
      return (
          <div className="wrapper">
          <div className="container_main">
          <div class="login1"></div>
          <div class="bg_fff">
          <Form style={{ width:300,height:300,position:"absolute",right:"10%",top:"25%"}}>  
          <div style={{color:"#ffffff"}}>当前账户地址为：{this.state.address}</div>    
          <div><h1 style={{color:"#ffffff"}}>管理员登录</h1></div>
        <Form.Item style={{width: 200}}
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input prefix={<UserOutlined/>} placeholder="用户名" onChange={this.onUsernameChange}/>
        </Form.Item>
        <Form.Item style={{width: 200}}
          name="passward"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input prefix={<LockOutlined/>} type="password" placeholder="密码" onChange={this.onPasswordChange}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.onSubmit} >
          登录
          </Button>
          
        </Form.Item>
      </Form>
          </div> 
          </div>
          </div>
      );
    }
  }

  export default App;