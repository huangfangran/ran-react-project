import React from 'react';
import {Card, Icon, Button, Table, Modal} from 'antd';
import {connect} from 'react-redux'

import {getCategories, addCategory, updateCategory, deleteCategory} from '../../redux/action-creators'
import AddCategories from "./addCategories";
import UpdateCategories from "./updateCategories";


@connect(
    state => ({categories: state.categories}),
    {getCategories, addCategory, updateCategory, deleteCategory}
)
class Category extends React.Component {

    state = {
        visible: false,
        isShowUpdateCategory: false,
        isShowDeleteCategory: false,
        category: {}
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
        myForm.validateFields((err, values) => {
            // console.log(values)
            if (!err) {
                //表单验证通过
                this.props.addCategory(values.categoryName);
                //隐藏对话框
                this.setState({
                    visible: false
                });
                //清空input的value
                myForm.resetFields();
            }
        })
    };
    //创建添加的点击取消的事件
    addHidden = () => {
        this.setState({
            visible: false
        })
    };

    //创建点击修改分类事件
    showUpdateCategory = (category) => {
        // console.log(category);
        return () => {
            this.setState({
                isShowUpdateCategory: true,
                category
            })
        }
    };
    //点击修改的确定的事件
    updateCategory = () => {
        //表单校验成功才能修改
        const form = this.updateCreateRef.current;
        form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                //表单校验通过
                this.props.updateCategory(this.state.category._id, values.categoryName);
                //隐藏对话框
                this.setState({
                    isShowUpdateCategory: false
                });
                //清空input的value
                this.updateCreateRef.current.resetFields()
            }
        })
    };
    //点击修改的取消的事件
    hiddenUpdateCategoryModal = () => {
        this.setState({
            isShowUpdateCategory: false
        });
        //清空表单数据
        this.updateCreateRef.current.resetFields()
    };

    //创建点击删除分类事件
    showDeleteCategory = (category) => {
        // console.log(category);
        return ()=>{
            this.setState({
                isShowDeleteCategory: true,
                category
            })
        }
    };
    //点击删除的确定的事件
    deleteCategory = () => {
        const {category} = this.state;
        // console.log(category._id);
        this.props.deleteCategory(category._id);
        this.setState({
            isShowDeleteCategory:false
        })
    };
    //点击删除的取消的事件
    deleteHidden = ()=>{
        this.setState({
            isShowDeleteCategory:false
        })
    };

    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            render: (category) => {
                return (
                    <div>
                        <Button type='link' onClick={this.showUpdateCategory(category)}>修改分类</Button>
                        <Button type='link' onClick={this.showDeleteCategory(category)}>删除分类</Button>
                    </div>
                )
            }
        }
    ];

    //初始化分类列表数据
    componentDidMount() {
        if (this.props.categories.length) return;
        this.props.getCategories()
    }

    render() {

        const {categories} = this.props;
        const {visible, category, isShowUpdateCategory, isShowDeleteCategory} = this.state;
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
                        rowKey='_id'
                    />
                    {/*添加模块*/}
                    <Modal
                        title="添加"
                        visible={visible}
                        onOk={this.addCategory}
                        onCancel={this.addHidden}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <AddCategories ref={this.createRef}/>
                    </Modal>
                    {/*修改模块*/}
                    <Modal
                        title="修改"
                        visible={isShowUpdateCategory}
                        onOk={this.updateCategory}
                        onCancel={this.hiddenUpdateCategoryModal}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <UpdateCategories categoryName={category.name} ref={this.updateCreateRef}/>
                    </Modal>
                    {/*删除模块*/}
                    <Modal
                        title="删除"
                        visible={isShowDeleteCategory}
                        onOk={this.deleteCategory}
                        onCancel={this.deleteHidden}
                        okText="确认"
                        cancelText="取消"
                        width={300}
                    >
                        <h3>确定要删除当前分类列表嘛</h3>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default Category