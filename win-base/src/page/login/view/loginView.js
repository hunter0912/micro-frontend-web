import React from 'react';
import LoginController from "../controller/loginController";
import Logo from "../../../assets/logo.png";
import "../css/login.css";

export default class LoginView extends LoginController {
    render() {
        return (
            <div className="login-container">
                <div className="login-content clearfix">
                    <div className="logo-content">
                        <div className="welcome">Welcome</div>
                        <div className="underline"></div>
                        <div className="logo">
                            <img width="33" height="35" src={Logo} alt=""></img>
                            <span>赢时胜信息技术</span>
                        </div>
                        <div className="company">赢时胜信息技术股份有限公司</div>
                    </div>

                    <div className="login-form">
                        <div className="title">
                            <span>账户密码登录</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};