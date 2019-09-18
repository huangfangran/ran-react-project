import React from 'react';
import {Card, Button, Icon, Input, Select, Table} from 'antd'

import {reqGetProducts, reqSearchProducts} from '../../api'
import './index.less'

const {Option} = Select;

class Product extends React.Component {

    state = {
        products: [],
        total: 0,
        searchKey: 'productName',
        searchValue: '',
        pageNum: 1,
        pageSize: 3,
        isSearch: false,
        prevSearchValue:''
    };

    columns = [
        {
            title: '商品名称',
            dataIndex: 'name'
        },
        {
            title: '商品描述',
            dataIndex: 'desc'
        },
        {
            title: '价格',
            dataIndex: 'price'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: () => {
                return (
                    <div>
                        <Button type='primary'>上架</Button>
                        <span>已下架</span>
                    </div>
                )
            }
        },
        {
            title: '操作',
            render: (product) => {
                return (
                    <div>
                        <Button type='link' onClick={this.showDesc(product)}>详情</Button>
                        <Button type='link' onClick={this.updateProduct(product)}>修改</Button>
                    </div>
                )
            }
        }
    ];

    //初始化商品数据
    componentDidMount() {
        // console.log(this.getProducts(1,3))
        this.getProducts(1, 3)
    }

    //定义方法用来发送请求获取商品数据
    getProducts = async (pageNum, pageSize) => {
        const {isSearch, prevSearchValue} = this.state;
        let result;
        if (isSearch) {
            //搜索过
            const {searchKey} = this.state;
            result = await reqSearchProducts({searchKey,searchValue:prevSearchValue,pageNum,pageSize})
        } else {
            //没有搜索过
            result = await reqGetProducts(pageNum, pageSize);
        }
        // console.log(result);
        this.setState({
            products: result.list,
            total: result.total,
            pageNum,
            pageSize,
            searchValue:prevSearchValue
        })
    };

    //点击添加商品
    addProduct = () => {
        this.props.history.push('/product/add')
    };

    //点击修改
    updateProduct = (product) => {
        return () => {
            this.props.history.push('/product/add', product)
        }
    };

    //类型改变的方法
    changeKey = (value) => {
        // console.log(value)
        this.setState({
            searchKey: value
        })
    };
    //输入框的值改变的方法
    changeValue = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    };

    //点击搜索
    search = async () => {
        const {searchKey, searchValue, pageNum, pageSize} = this.state;
        // console.log(searchValue,searchKey);
        const result = await reqSearchProducts({searchKey, searchValue, pageNum, pageSize});
        this.setState({
            products: result.list,
            total: result.total,
            isSearch: true,
            prevSearchValue:searchValue
        });
        // console.log(result)
    };

    //点击详情
    showDesc = (product)=>{
        return ()=>{
            console.log(product);
            this.props.history.push('/product/desc',product)
        }
    };

    render() {
        const {products, total, searchKey, searchValue} = this.state;
        return (
            <Card
                title={
                    (
                        <div>
                            <Select value={searchKey} onChange={this.changeKey}>
                                <Option key='1' value='productName'>根据商品名称</Option>
                                <Option key='2' value='productDesc'>根据商品描述</Option>
                            </Select>
                            <Input placeholder='请输入关键字' value={searchValue} className='product-input' onChange={this.changeValue}/>
                            <Button type='primary' onClick={this.search}>搜索</Button>
                        </div>
                    )
                }
                extra={<Button type='primary' onClick={this.addProduct}><Icon type='plus'/>添加商品</Button>}
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
                        onChange: this.getProducts,
                        onShowSizeChange: this.getProducts
                    }}
                    rowKey='_id'
                >

                </Table>
            </Card>
        )
    }
}

export default Product