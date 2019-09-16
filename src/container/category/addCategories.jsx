import React from 'react';
import {Form, Input} from "antd";
@Form.create()
class AddCategories extends React.Component{

    render(){
        const {getFieldDecorator} = this.props.form;
      return (
          <Form>
              <Form.Item label='品类名称'>
                  {
                      getFieldDecorator('categoryName', {
                          rules: [
                              {
                                  required:true,
                                  message:'请输入要添加的品类名称！'
                              }
                          ]
                      })(<Input placeholder='请输入要添加的品类名称'/>)
                  }
              </Form.Item>
          </Form>
       )
    }
}

export default AddCategories