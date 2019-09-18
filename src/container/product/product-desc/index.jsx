import React from 'react';
import { List, Typography } from 'antd';

export default class ProductDesc extends React.Component{

    data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    render(){
      return (
           <div>
               <List
                   size="large"
                   header={<div>商品详情</div>}

                   bordered
                   dataSource={this.data}
                   renderItem={item => (
                       <List.Item>
                           <Typography.Text mark>[ITEM]</Typography.Text> {item}
                       </List.Item>
                   )}
               />
           </div>
       )
    }
}