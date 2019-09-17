import React from 'react';
import {Card, Button, Icon, Input, Select, Table} from 'antd'

import {reqGetProducts} from '../../api'
import './index.less'

const {Option} = Select;

class Product extends React.Component {

    state = {
        products:[],
        total:0
    };

    columns = [
        {
            title:'商品名称',
            dataIndex:'name'
        },
        {
            title:'商品描述',
            dataIndex:'desc'
        },
        {
            title:'价格',
            dataIndex:'price'
        },
        {
            title:'状态',
            dataIndex:'status',
            render:()=>{
                return (
                    <div>
                        <Button type='primary'>上架</Button>
                        <span>已下架</span>
                    </div>
                )
            }
        },
        {
            title:'操作',
            render:()=>{
                return (
                    <div>
                        <Button type='link'>详情</Button>
                        <Button type='link'>修改</Button>
                    </div>
                )
            }
        }
    ];

    //定义方法用来发送请求获取商品数据
    getProducts = async (pageNum,pageSize)=>{
        const result = await reqGetProducts(pageNum,pageSize);
        console.log(result);
        this.setState({
            products:result.list,
            total:result.total
        })
    };

    //初始化商品数据
    componentDidMount() {
        // console.log(this.getProducts(1,3))
        this.getProducts(1,3)
    }

    render() {
        const {products, total} = this.state;
        return (
            <Card
                title={
                    (
                        <div>
                            <Select defaultValue='1'>
                                <Option key='1'>根据商品名称</Option>
                                <Option key='2'>根据商品描述</Option>
                            </Select>
                            <Input placeholder='请输入关键字' className='product-input'/>
                            <Button type='primary'>搜索</Button>
                        </div>
                    )
                }
                extra={<Button type='primary'><Icon type='plus'/>添加商品</Button>}
            >
                <Table
                    columns={this.columns}
                    dataSource={products}
                    bordered
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        defaultPageSize: 3,
                        total,
                        onChange:this.getProducts,
                        onShowSizeChange:this.getProducts
                    }}
                    rowKey='_id'
                >

                </Table>
            </Card>
        )
    }
}

export default Product