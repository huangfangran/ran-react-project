import React, {Component} from 'react';
import {Card, Button, Table, Modal} from 'antd';
import dayjs from "dayjs";
import {connect} from 'react-redux'

import {reqGetUsers,reqAddUser} from '../../api'
import {getRoles} from '../../redux/action-creators'
import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';

@connect((state) => ({roles: state.roles}), {getRoles})
class User extends Component {
    /*{ _id: "5c7dafe855fb843490b93a49",
        createTime: 1551740904866,
        email: "aaa@aaa.com",
        phone: "123456789",
        roleId: "5c7d222c12d5e51908cc0380",
        username: "aaa"}*/
    state = {
        users: [], //用户数组
        isShowAddUserModal: false, //是否展示创建用户的标识
        isShowUpdateUserModal: false, //是否展示更新用户的标识
    };

    //初始化用户列表
    componentDidMount() {
        //发送请求获取初始数据
        reqGetUsers().then((res) => {
            console.log('user中初始化用户列表',res);
            this.setState({
                users:res
            })
        });
        //获取角色信息
        if (this.props.roles.length) return;
        this.props.getRoles()
    }

    addUserFormRef = React.createRef();
    updateUserFormRef = React.createRef();

    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '所属角色',
            dataIndex: 'roleId',
            render:(roleId)=>{
                const role = this.props.roles.find(role=>roleId === role._id);
                return role && role.name
            }
        },
        {
            title: '操作',
            render: user => {
                return <div>
                    <Button type="link" onClick={() => {
                    }}>修改</Button>
                    <Button type="link" onClick={() => {
                    }}>删除</Button>
                </div>
            }
        }
    ];

    // 点击创建的确定
    addUser = () => {
        //获取表单数据
        const form = this.addUserFormRef.current.props.form;
        //表单校验成功后发送请求
        form.validateFields(async (err,values)=>{
            if (!err) {
                //发送请求添加用户
                const result = await reqAddUser(values);
                //修改状态
                this.setState({
                    users:[...this.state.users,result]
                });
                //清空表单
                form.resetFields();
                //隐藏对话框
                this.setState({
                    isShowAddUserModal:false
                })
            }
        });

    };

    // 更新用户的回调函数
    updateUser = () => {

    };

    //点击显示隐藏对话框
    switchModal = (key, value) => {
        return () => {
            this.setState({
                [key]: value
            })
        }
    };

    render() {
        const {users, isShowAddUserModal, isShowUpdateUserModal} = this.state;
        const {roles} = this.props;

        return (
            <Card
                title={
                    <Button type='primary' onClick={this.switchModal('isShowAddUserModal', true)}>创建用户</Button>
                }
            >
                <Table
                    columns={this.columns}
                    dataSource={users}
                    bordered
                    rowKey='_id'
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        showQuickJumper: true,
                    }}
                />

                {/*创建用户*/}
                <Modal
                    title="创建用户"
                    visible={isShowAddUserModal}
                    onOk={this.addUser}
                    onCancel={this.switchModal('isShowAddUserModal', false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <AddUserForm wrappedComponentRef={this.addUserFormRef} roles={roles}/>
                </Modal>

                {/*更新用户*/}
                <Modal
                    title="更新用户"
                    visible={isShowUpdateUserModal}
                    onOk={this.updateUser}
                    onCancel={this.switchModal('isShowUpdateUserModal', false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <UpdateUserForm ref={this.updateUserFormRef}/>
                </Modal>

            </Card>
        )
    }
}

export default User;
