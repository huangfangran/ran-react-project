import React from 'react';
import {Card, Select, Input, Icon, Button, InputNumber, Form} from 'antd'
import {connect} from 'react-redux'
import draftToHtml from 'draftjs-to-html';
import {convertToRaw} from 'draft-js';

import {reqAddProduct, reqUpdateProduct} from '../../../api'
import {getCategories} from '../../../redux/action-creators'
import ProductDetail from "../product-detail";

const {Option} = Select;
const {Item} = Form;

@connect((state) => ({categories: state.categories}), {getCategories})
@Form.create()
class AddUpdate extends React.Component {

    //创建ref
    productCreateRef = React.createRef();

    //初始化商品分类
    componentDidMount() {
        if (this.props.categories.length) return;
        this.props.getCategories();
    }

    //点击箭头
    goBack = () => {
        this.props.history.goBack();
    };

    //点击提交
    submit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields(async(err,values)=>{
            if (!err){
                const {state} = this.props.location;
                const {editorState} = this.productCreateRef.current.state;
                const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                const {categoryId,name,price,desc} = values;
                let product;
                const productId = state._id;
                if (state){
                    product = {name,price,desc,detail,productId,categoryId};
                    await reqUpdateProduct(product)
                } else {
                    product = {categoryId,name,price,desc,detail};
                    await reqAddProduct(product);
                }

                this.props.history.push('/product')
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {categories,location:{state}} = this.props;
        // console.log(state);
        return (
            <Card title={<div><Icon type="arrow-left" onClick={this.goBack}/> 添加商品</div>}>
                <Form labelCol={{span: 2}} wrapperCol={{span: 10}} onSubmit={this.submit}>
                    {/*名称*/}
                    <Item label='商品名称'>
                        {
                            getFieldDecorator(
                                'name', {rules: [{required: true, message: '请输入商品名称'}],initialValue:state?state.name:''}
                            )(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    {/*描述*/}
                    <Item label='商品描述'>
                        {
                            getFieldDecorator(
                                'desc', {rules: [{required: true, message: '请输入商品名称'}],initialValue:state?state.desc:''}
                            )(<Input placeholder='请输入商品描述'/>)
                        }
                    </Item>
                    {/*分类*/}
                    <Item label='商品分类'>
                        {
                            getFieldDecorator(
                                'categoryId', {rules: [{required: true, message: '请输入商品名称'}],initialValue:state?state.categoryId:''}
                            )(
                                <Select placeholder='请选择商品分类'>
                                    {
                                        categories.map((category) => {
                                            return <Option key={category._id} value={category._id}>{category.name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    {/*价格*/}
                    <Item label='商品价格'>
                        {
                            getFieldDecorator(
                                'price', {rules: [{required: true, message: '请输入商品价格'}],initialValue:state?state.price:''}
                            )(<InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                style={{width: 150}}
                            />)
                        }
                    </Item>
                    {/*详情*/}
                    <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 16}}>
                        <ProductDetail ref={this.productCreateRef} detail={state?state.detail:''}/>
                    </Item>
                    {/*提交*/}
                    <Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default AddUpdate