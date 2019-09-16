import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd'
import {connect} from 'react-redux'

import WithCheckoutLogin from '../with-checkout-login'
import {requestLogin} from '../../api'
import {saveUser} from '../../redux/action-creators'
import logo from '../../access/imgs/logo.png'
import './index.less'

@WithCheckoutLogin
@connect(null, {saveUser})
@Form.create()
class Login extends React.Component {

    //校验输入框的值
    validator = (rule, value, callback) => {
        const name = rule.field === 'username' ? '用户名' : '密码';
        const reg = /^[\w]{3,13}$/;
        //不能为空
        if (!value) {
            return callback(`${name}不能为空`)
        }
        //长度在3-13位之间
        if (value.length < 3 || value.length > 13) {
            return callback(`${name}长度必须大于3位且小于13位`)
        }
        //正则校验输入合法程度
        if (!reg.test(value)) {
            return callback('只允许输入字母数字和下划线')
        }
        callback()
    };

    //点击登录时触发的事件
    handleSubmit = (e) => {
        e.preventDefault();
        //表单校验通过才能发送请求
        this.props.form.validateFields((errors, values) => {
            // console.log(errors,values)
            const {username, password} = values;
            //如果表单校验成功
            requestLogin(username,password)
                .then((res) => {
                    // console.log(res);
                    message.success('登录成功');
                    //把获取到的成功的数据放到状态中
                    this.props.saveUser(res);
                    this.props.history.replace('/')
                })
                //清空密码
                .catch(() => {
                    this.props.form.resetFields(['password'])
                })
        })
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
                                    'username', {rules: [{validator: this.validator}]}
                                )(
                                    <Input prefix={<Icon type="user"/>} placeholder='请输入用户名'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password', {rules: [{validator: this.validator}]}
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
