import React from 'react';
import {Form, Input} from "antd";
import PropTypes from 'prop-types'

@Form.create()
class UpdateCategories extends React.Component{
    //校验传入的数据
    static propTypes = {
        categoryName: PropTypes.string.isRequired
    };

    //定义校验规则
    validator = (rule,value,callback)=>{
        if (!value){
            callback('请输入要修改的分类名称')
        } else if (value === this.props.categoryName){
            callback('请输入要修改的有效的分类名称')
        } else {
            callback()
        }
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        const {categoryName} = this.props;
      return (
          <Form>
              <Form.Item label='品类名称'>
                  {
                      getFieldDecorator('categoryName', {
                          rules: [
                              {
                                  validator:this.validator
                              }
                          ],
                          initialValue:categoryName
                      })(<Input placeholder='请输入要添加的品类名称'/>)
                  }
              </Form.Item>
          </Form>
       )
    }
}

export default UpdateCategories