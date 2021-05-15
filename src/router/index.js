import Login from "../page/Login";
import Resign from "../page/Resign";
import Find from "../page/Find";
import Admin from "../page/Admin";
import AdminLogin from "../page/AdminLogin";
import PageNoFound from "../page/PageNoFound";

export const loginRouter=[{
    path:"/login",
    Component:Login
},{
    path:"/resign",
    Component:Resign
},{
    path:"/adminlogin",
    Component:AdminLogin
},{
    path:"/404",
    Component:PageNoFound
}]

export const findRouter=[{
    path:"/find",
    Component:Find
},{
    path:"/admin",
    Component:Admin
}]

