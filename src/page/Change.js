import React, { Component } from 'react';
import { Form, Input, Button,  Card ,Layout, Menu, } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Web3 from "web3";
import "./contract.address"
const IPFS = require('ipfs-http-client')
const ipfs = IPFS({host: 'localhost', port: '5001', protocol: 'http'});
class Change extends Component {
    constructor(props) {
      super(props);
      this.captureFile = this.captureFile.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        address:"",
        id:"",
        username: "",
        major: "",
        eduid: "",
        edutype: "",
        overtime: "",
        ipfsHash:"",
        buffer:null
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
          window.myContract.methods.gethash().call({from:this.state.address}).then(value =>{
              this.setState({ipfsHash:value})
              console.log(this.state.ipfsHash)
            }
          )

        } catch (e) {
  
        }
      } else {
        console.log('没有metamask')
      }
    }
    
    
      onIdChange = e => {
        this.setState({ id: e.target.value });
      };
      onUsernameChange = e => {
        this.setState({ username: e.target.value });
      };
      onPasswordChange = e => {
        this.setState({ password: e.target.value });
      };
      onmajorChange = e => {
        this.setState({ major: e.target.value });
      };
      onedutypeChange = e => {
        this.setState({ edutype: e.target.value });
      };
      onovertimeChange = e => {
        this.setState({ overtime: e.target.value });
      };
      captureFile(){
        console.log('xxx')
        const file = this.refs.file.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend =() => {
         this.setState({buffer:Buffer(reader.result)}) 
         console.log('buffer',this.state.buffer)
        }
      }
    
      onSubmit(Event){
        Event.preventDefault()
        console.log('zzz')
        ipfs.add(this.state.buffer).then((result) =>{
          this.setState({ipfsHash: result.path})
          console.log('hash',this.state.ipfsHash)
        })
      }
      onSubmit1 = ()  =>{
        if(this.state.id==""||this.state.username==""||this.state.major==""||this.state.edutype==""||this.state.overtime==""){
          alert("存在必填项未输入！请重新填写")
          window.location.reload()
        }
        window.myContract.methods.change(
          this.state.id,
          this.state.username,
          this.state.major,
          this.state.edutype,
          this.state.overtime,
          this.state.ipfsHash
          ).send({from:this.state.address}).on('transactionHash',(transactionHash)=>{
            console.log('transactionHash',transactionHash)
          })
      }
      back=()=>{
        this.props.history.push("/apply");
      }  

    render() {
      return (
<div className="wrapper">
<div className="container_main">
<div class="login1"></div>
<div class="bg_fff">
<Form style={{ width:300,height:500,position:"absolute",right:"10%",top:"25%"}}>
<div style={{color:"#ffffff"}}>当前账户地址为：{this.state.address}</div>
<div><h1 style={{color:"#ffffff"}}>用户信息修改</h1></div>
<tr></tr>
         <Form.Item style={{width: 200}}
        name="id"
        rules={[{ required: true, message: '请输入学号！' }]}
       >
       <Input prefix={<UserOutlined/>} placeholder="学号" onChange={this.onIdChange}/>
      </Form.Item>
     <Form.Item style={{width: 200}}
    name="username"
    rules={[{ required: true, message: '姓名' }]}
  >
    <Input prefix={<UserOutlined/>} placeholder="姓名" onChange={this.onUsernameChange}/>
  </Form.Item>
  <Form.Item style={{width: 200}}
    name="major"
    rules={[{ required: true, message: '专业' }]}
  >
    <Input prefix={<UserOutlined/>} placeholder="专业" onChange={this.onmajorChange}/>
  </Form.Item>
  <Form.Item style={{width: 200}}
    name="eduype"
    rules={[{ required: true, message: '教育层次' }]}
  >
    <Input prefix={<UserOutlined/>} placeholder="教育层次" onChange={this.onedutypeChange}/>
  </Form.Item>
  <Form.Item style={{width: 200}}
    name="overtime"
    rules={[{ required: true, message: '毕业时间' }]}
  >
    <Input prefix={<UserOutlined/>} placeholder="毕业时间" onChange={this.onovertimeChange}/>
  </Form.Item>
</Form>
<form style={{ width:300,height:500,position:"absolute",right:"10%",top:"125%"}} onSubmit={this.onSubmit}>
    <div style={{color:"#ffffff"}}>上传学籍证明</div>
          <input style={{color:"#ffffff"}} type='file' ref="file"  onChange={this.captureFile}></input><br/>
          <input type='submit'></input>
  </form>
<Form style={{ width:300,height:500,position:"absolute",right:"10%",top:"150%"}}>
  <Form.Item>
    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.onSubmit1}>
    确定修改
    </Button> 
    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.back} style={{left:25}}>
    返回认证
    </Button> 
  </Form.Item>
  </Form>
</div> 
</div>
</div>
      );
    }
  }

  export default Change;