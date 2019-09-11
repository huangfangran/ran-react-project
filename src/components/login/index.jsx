import React from 'react';
import {Form, Icon, Input, Button} from 'antd'

import logo from './logo.png'
import './index.less'

@Form.create()
class Login extends React.Component {

    //点击登录时触发的事件
    handleSubmit = (e)=>{
        e.preventDefault();

    };

    validator = (rule,value,callback)=>{

        console.log(rule);
        const name = rule.field === 'username' ? '用户名':'密码';
        const reg = /^[\w]{3,13}$/;
        //不能为空
        if (!value){
            return callback(`${name}不能为空`)
        }
        //长度在3-13位之间
        if (value.length<3 || value.length>13){
            return callback(`${name}长度必须大于3位且小于13位`)
        }
        //正则校验输入合法程度
        if (!reg.test(value)){
            return callback('只允许输入字母数字和下划线')
        }

        callback()
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo'/>
                    <h1>React项目：后台登录系统</h1>
                </header>
                <section className='login-section'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'username',{rules:[{validator:this.validator}]}
                                )(
                                    <Input prefix={<Icon type="user"/>} placeholder='请输入用户名'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',{rules:[{validator:this.validator}]}
                                )(
                                    <Input prefix={<Icon type="lock"/>} type='password' placeholder='请输入密码'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-btn'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Login