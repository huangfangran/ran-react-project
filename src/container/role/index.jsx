import React, {Component} from 'react';
import {Card, Button, Table, Radio, Modal} from 'antd';
import {connect} from 'react-redux'
import dayjs from 'dayjs'

import AddRoleForm from './add-role-form';
import UpdateRoleForm from './update-role-form';

import {getRoles, addRole, updateRole} from '../../redux/action-creators'

const RadioGroup = Radio.Group;

@connect((state) => ({roles: state.roles,username:state.user.user.username}), {getRoles, addRole, updateRole})
class Role extends Component {
    state = {
        value: '',  //单选的默认值，也就是选中的某个角色的id值
        isShowAddRoleModal: false, //是否展示创建角色的标识
        isShowUpdateRoleModal: false, //是否展示设置角色的标识
        isDisabled: true, //设置角色权限按钮是否可以使用
    };

    //初始化角色信息
    componentDidMount() {
        this.props.getRoles()
    }
    getCheckedKey=[];

    //创建的ref
    addRoleFormRef = React.createRef();
    //设置的ref
    updateRoleFormRef = React.createRef();

    columns = [
        {
            dataIndex: '_id',
            render: id => <Radio value={id}/>
        }, {
            title: '角色名称',
            dataIndex: 'name',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }, {
            title: '授权时间',
            dataIndex: 'authTime',
            render: (time) => time && dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        }, {
            title: '授权人',
            dataIndex: 'authName',
        }
    ];
    //获取更新组件中的checkedKeys值
    getCheckedKeys = (checkedKeys)=>{
        this.getCheckedKey = checkedKeys;
    };

    //点击单选按钮的事件
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
            isDisabled: false
        });
    };

    //点击显示隐藏对话框的事件
    switchModal = (key, value) => {
        return () => {
            this.setState({[key]: value})
        }
    };
    //创建角色中的确定
    addRole = () => {
        const form = this.addRoleFormRef.current;
        form.validateFields((err, values) => {
            if (!err) {
                const {name} = values;
                this.props.addRole(name);
                //清空输入框
                form.resetFields();
                //隐藏输入框
                this.setState({
                    isShowAddRoleModal: false
                })
            }
        })
    };

    //设置角色中的确定
    updateRole = () => {
        this.props.updateRole(this.state.value,this.props.username,this.getCheckedKey);
        this.setState({
            isShowUpdateRoleModal:false
        })
    };

    render() {
        const {value, isDisabled, isShowAddRoleModal, isShowUpdateRoleModal} = this.state;
        const {roles} = this.props;
        console.log('rolerender中的roles信息', roles);
        const role = roles.find((role) => role._id === value) || {};

        return (
            <Card
                title={
                    <div>
                        <Button type='primary'
                                onClick={this.switchModal('isShowAddRoleModal', true)}>创建角色</Button> &nbsp;&nbsp;
                        <Button type='primary' disabled={isDisabled}
                                onClick={this.switchModal('isShowUpdateRoleModal', true)}>设置角色权限</Button>
                    </div>
                }
            >
                {/*单选按钮*/}
                <RadioGroup onChange={this.onRadioChange} value={value} style={{width: '100%'}}>
                    <Table
                        columns={this.columns}
                        dataSource={roles}
                        bordered
                        rowKey='_id'
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ['5', '10', '15', '20'],
                            showQuickJumper: true,
                        }}
                    />
                </RadioGroup>

                {/*创建角色*/}
                <Modal
                    title="创建角色"
                    visible={isShowAddRoleModal}
                    onOk={this.addRole}
                    onCancel={this.switchModal('isShowAddRoleModal', false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <AddRoleForm ref={this.addRoleFormRef}/>
                </Modal>

                {/*设置权限*/}
                <Modal
                    title="设置角色权限"
                    visible={isShowUpdateRoleModal}
                    onOk={this.updateRole}
                    onCancel={this.switchModal('isShowUpdateRoleModal', false)}
                    okText='确认'
                    cancelText='取消'
                >
                    <UpdateRoleForm ref={this.updateRoleFormRef} role={role} getCheckedKeys={this.getCheckedKeys}/>
                </Modal>

            </Card>
        )
    }
}

export default Role;