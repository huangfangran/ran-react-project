import React from 'react';
import {Card, Icon, Button, Table, Modal} from 'antd';
import {connect} from 'react-redux'

import {getCategories,addCategory,updateCategory} from '../../redux/action-creators'
import AddCategories from "./addCategories";
import UpdateCategories from "./updateCategories";


@connect(
    state => ({categories: state.categories}),
    {getCategories,addCategory,updateCategory}
)
class Category extends React.Component {

    state = {
        visible: false,
        category:{}
    };

    //创建ref
    createRef = React.createRef();
    updateCreateRef = React.createRef();

    //创建点击添加分类事件
    showAddCategory = () => {
        this.setState({
            visible: true,
        })
    };
    //创建添加的点击确定的事件
    addCategory = () => {
        //表单验证成功再添加
        const myForm = this.createRef.current;
        myForm.validateFields((err,values)=>{
            // console.log(values)
            if (!err){
                //表单验证通过
                this.props.addCategory(values.categoryName);
                //隐藏对话框
                this.setState({
                    visible:false
                });
                //清空input的value
                myForm.resetFields();
            }
        })
    };
    //创建添加的点击取消的事件
    hidden = ()=>{
        this.setState({
            visible:false
        })
    };

    //创建点击修改分类事件
    showUpdateCategory = (category)=>{
        console.log(category);
        return ()=>{
            this.setState({
                visible:true,
                category
            })
        }
    };
    //点击修改的确定的事件
    updateCategory = ()=>{
        //表单校验成功才能修改
        const form = this.updateCreateRef.current;
        form.validateFields((err,values)=>{
            if (!err){
                //表单校验通过
                this.props.updateCategory(this.state.category._id,values.categoryName);
                //隐藏对话框
                this.setState({
                    visible:false
                })
                //清空input的value
                this.updateCreateRef.current.resetFields()
            }
        })
    };
    //点击修改的取消的事件
    hiddenUpdateCategoryModal = ()=>{
        this.setState({
            visible:false
        });
        //清空表单数据
        this.updateCreateRef.current.resetFields()
    };

    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            render: (category) => {
                // console.log(x);
                return (
                    <div>
                        <Button type='link' onClick={this.showUpdateCategory(category)}>修改分类</Button>
                        <Button type='link'>删除分类</Button>
                    </div>
                )
            }
        }
    ];

    //初始化分类列表数据
    componentDidMount() {
        this.props.getCategories()
    }

    render() {

        const {categories} = this.props;
        const {visible,category} = this.state;
        return (
            <div>
                <Card title="分类列表"
                      extra={<Button type='primary' onClick={this.showAddCategory}><Icon type="plus"/>分类列表</Button>}>
                    <Table
                        columns={this.columns}
                        dataSource={categories}
                        bordered
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            pageSizeOptions: ['3', '6', '9', '12'],
                            defaultPageSize: 3
                        }}
                    />
                    {/*添加模块*/}
                    <Modal
                        title="Modal"
                        visible={visible}
                        onOk={this.addCategory}
                        onCancel={this.hidden}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <AddCategories ref={this.createRef}/>
                    </Modal>
                    {/*修改模块*/}
                    <Modal
                        title="Modal"
                        visible={visible}
                        onOk={this.updateCategory}
                        onCancel={this.hiddenUpdateCategoryModal}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <UpdateCategories categoryName={category.name} ref={this.updateCreateRef}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default Category