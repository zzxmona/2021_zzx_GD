
pragma solidity >=0.4.22 <0.9.0;

contract System {
    
    
     struct StudentStruct{

        string sid  ;//学号

        string name  ;//姓名

        string password ; //密码

        string major  ;//专业

        string eduType  ;//教育层次

        string overtime ;//毕业时间

        bool isUsed  ;//该地址是否被使用

        string time  ;//时间
        
        bool quanxian  ;//修改修改权限
        
        string hash;


    }
    

    
        struct AdminStruct{

         string id  ;//ID

         string password ;//密码

    }
    
        mapping (address=>StudentStruct) stu; 
        
        mapping (address=>AdminStruct) adm;

        mapping (string=>StudentStruct) sss;

        address public owner;
            
        uint stuAccount=0;

        uint applyAccount=0;
    
        constructor() public {

        owner=msg.sender;

        adm[msg.sender].id="admin";

        adm[msg.sender].password="123456";

    }        
    
        modifier admin(){

        require(owner == msg.sender);

        _; }  
        
        event  eventResponseLog(

            address addr,

            string message
        );        


function getStuAccount() public view returns (uint){

        return stuAccount;
    }
function getApplyAccount() public view returns (uint){

        return applyAccount;
    }
function gethash() public view returns (string memory) {

        return stu[msg.sender].hash;
    }
function quxnainaddress() public view returns ( bool) {

        return stu[msg.sender].quanxian;
    }


//xue'sheng'zhu'ce学生注册
function registStudent(string memory _sid, string memory _name, string memory _password,

      string memory _major,string memory _eduType,string memory _overtime,string memory _hash) public {
        
        require(!stu[msg.sender].isUsed);
        
        StudentStruct memory student =StudentStruct(_sid,_name,_password,_major,_eduType,_overtime,true,"未认证",false,_hash);

        stu[msg.sender]=student;
        
        sss[_name] = student;
        

        stuAccount++;

        emit eventResponseLog(msg.sender,"ok");

    }
    //学生登录账户
function studentLogin(string memory _name, string memory _password) view public returns(bool){
    
        
        if(!stu[msg.sender].isUsed){

            return false; //地址不存在，则返回 false

        } else if(( keccak256(bytes(stu[msg.sender].name)) == keccak256(bytes(_name))) &&

         keccak256(bytes(stu[msg.sender].password)) == keccak256(bytes(_password))){

             return true; //地址、ID及密码匹配正确 登录系统

        } else {

        return false; //其他情况返回 false
        }
    }
    
function applyDiploma()public{
    
   /* require(stu[msg.sender].isUsed);
    require(keccak256(bytes(stu[msg.sender].time)) != keccak256(bytes("通过")));
    require(!stu[msg.sender].quanxian);
     string memory n="未认证";
     string memory m="正在申请";

    if(stu[msg.sender].isUsed){
         if(keccak256(bytes(stu[msg.sender].time)) == keccak256(bytes(n))||keccak256(bytes(stu[msg.sender].time)) == keccak256(bytes(m))){
             if(!appl[msg.sender].isUsed){ 
             ApplyStruct memory a=ApplyStruct(m,true);
             appl[msg.sender]=a; 
             stu[msg.sender].time= m; 
             sss[stu[msg.sender].name].time= m; 
             applyAccount++;
                  emit eventResponseLog(msg.sender,"申请成功");
             }else{
                 emit eventResponseLog(msg.sender,"已有待确认学历");
             }
           }else{
            emit eventResponseLog(msg.sender,"已存有学历");
             }
     }
     */
     require(keccak256(bytes(stu[msg.sender].time)) == keccak256(bytes("未认证")));
             stu[msg.sender].time= "正在申请"; 
             sss[stu[msg.sender].name].time= "正在申请"; 
             applyAccount++;
 }
 
 
 function getchange() view public returns(string memory _time,string memory _quanxian){

     if(stu[msg.sender].isUsed){
         if(stu[msg.sender].quanxian){
             return(stu[msg.sender].time,"拥有修改权限");
         }else{
             return(stu[msg.sender].time,"无");
         }
        
     }else
     return("","不存在地址 ");
    }
function change(string memory _sid, string memory _name, string memory _major,string memory _eduType,string memory _overtime,string memory _hash) public{
    
    
        require(stu[msg.sender].quanxian);
    
        StudentStruct memory student =StudentStruct(_sid,_name,stu[msg.sender].password,_major,_eduType,_overtime,true,"未认证",false,_hash);

        stu[msg.sender]=student;
        
        sss[_name] = student;

        emit eventResponseLog(msg.sender,"ok");

    }
    
//管理员登陆
function adminLogin(string memory _id, string memory _password) view public admin returns(bool){

        if( keccak256(bytes(adm[msg.sender].id)) == keccak256(bytes(_id)) &&

         keccak256(bytes(adm[msg.sender].password)) == keccak256(bytes(_password))){

             return true; //ID及密码匹配正确 登录系统

        } else {

        return false; //其他情况返回 false
        }
    }
    
function manager(address addr,string memory _time)public admin{
    
    require(keccak256(bytes(stu[addr].time)) == keccak256(bytes("正在申请")));
        
      string memory  a = "通过";
            
             if(keccak256(bytes(_time)) == keccak256(bytes(a))){
                 
              stu[addr].time= _time;
                  
              sss[stu[addr].name].time= _time;
             
              applyAccount--;
              
              emit eventResponseLog(addr,"ok");
            
             }else{
              stu[addr].time= _time;
                  
              sss[stu[addr].name].time= _time;
             
              applyAccount--;
              
              stu[addr].quanxian= true;
                  
              sss[stu[addr].name].quanxian= true;
                          
              emit eventResponseLog(addr,"ok");
             }
         }
     
     


function findbyaddress (address addr) view public admin returns(string memory _sid, string memory _name,string memory _major,string memory _eduType,string memory _overtime,string memory _time,string memory _hash){
        
        if(stu[addr].isUsed){
            
        return(stu[addr].sid, stu[addr].name ,stu[addr].major,stu[addr].eduType,stu[addr].overtime,stu[addr].time,stu[addr].hash);

        }else{
            
        return("-","该地址不存在数据","请检查是否输入有误","-","-","-","");//查询失败
        }
    }

function outfindbyaddress (address addr) view public returns(string memory _sid, string memory _name,string memory _major,string memory _eduType,string memory _overtime,string memory _hash){
        
        if(stu[addr].isUsed){
            if(keccak256(bytes(stu[addr].time)) == keccak256(bytes("通过"))){
                        return(stu[addr].sid, stu[addr].name ,stu[addr].major,stu[addr].eduType,stu[addr].overtime,stu[addr].hash);
            }else{
                 return("-","该用户目前未通过认证 ","-","-","-","");//查询失败
            }
        }else{
            
        return("-","该地址不存在数据","请检查是否输入有误","-","-","");//查询失败
        }
    }
function outfindbyname (string  memory name) view public returns(string memory _sid, string memory _name,string memory _major, string memory _eduType,string memory _overtime,string memory _hash){
        
        if(sss[name].isUsed){
            if(keccak256(bytes(sss[name].time)) == keccak256(bytes("通过"))){
        return(sss[name].sid, sss[name].name,sss[name].major,sss[name].eduType,sss[name].overtime,sss[name].hash);
        }else{
                 return("-","该用户目前未通过认证 ","-","-","-","-");//查询失败
            }
        }else{
            return("-","该姓名不存在数据","请检查是否输入有误","-","-","");
        }
    }  
}