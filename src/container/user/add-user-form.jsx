import React, {Component} from 'react';
import {Form, Input, Select} from 'antd';

const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class AddUserForm extends Component {

    //校验表单
    validator = (rule, value, callback) => {
        let name = '';
        if (rule.field === 'username') name = '用户名';
        if (rule.field === 'password') name = '密码';
        if (rule.field === 'phone') name = '手机号';
        if (rule.field === 'email') name = '邮箱';
        const reg = /^[\w]{3,13}$/;
        const em = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        const pho = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        //不能为空
        if (!value) {
            return callback(`${name}不能为空`)
        }
        if (name === '邮箱') {
            if (!em.test(value)) return callback(`请输入合法${name}`)
        }else if (name === '手机号') {
            if (!pho.test(value)) return callback(`请输入正确${name}`)
        }else {
            //长度在3-13位之间
            if (value.length < 3 || value.length > 13) {
                return callback(`${name}长度必须大于3位且小于13位`)
            }
            //正则校验输入合法程度
            if (!reg.test(value)) {
                return callback('只允许输入字母数字和下划线')
            }
        }

        callback()
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form>
                {/*用户名*/}
                <Item label='用户名' labelCol={{span: 6}} wrapperCol={{span: 15}}>
                    {
                        getFieldDecorator(
                            'username', {rules: [{validator: this.validator}]}
                        )(
                            <Input placeholder='请输入用户名'/>
                        )
                    }
                </Item>
                {/*密码*/}
                <Item label='密码' labelCol={{span: 6}} wrapperCol={{span: 15}}>
                    {
                        getFieldDecorator(
                            'password', {rules: [{validator: this.validator}]}
                        )(
                            <Input placeholder='请输入密码' type='password'/>
                        )
                    }
                </Item>
                {/*手机号*/}
                <Item label='手机号' labelCol={{span: 6}} wrapperCol={{span: 15}}>
                    {
                        getFieldDecorator(
                            'phone', {rules: [{validator: this.validator}]}
                        )(
                            <Input placeholder='请输入手机号'/>
                        )
                    }
                </Item>
                {/*邮箱*/}
                <Item label='邮箱' labelCol={{span: 6}} wrapperCol={{span: 15}}>
                    {
                        getFieldDecorator(
                            'email', {rules: [{validator: this.validator}]}
                        )(
                            <Input placeholder='请输入邮箱'/>
                        )
                    }
                </Item>
                {/*角色*/}
                /<Item label='角色' labelCol={{span: 6}} wrapperCol={{span: 15}} >
                    {
                        getFieldDecorator(
                            'roleId'
                        )(
                            <Select placeholder='请选择分类'>
                                {
                                    this.props.roles.map((role)=>{
                                        return <Option value={role._id} key={role._id}>{role.name}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default AddUserForm;