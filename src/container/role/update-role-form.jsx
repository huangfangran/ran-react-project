import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';

import {menuItems} from '../../config/menu-item'

const Item = Form.Item;
const { TreeNode } = Tree;

@Form.create()
class UpdateRoleForm extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
  };

  //定义树节点列表展示的方法
  getTreeData = ()=>{
    const treeDate = menuItems.map((menu)=>{
      if (menu.children){
        return{
          title: menu.title,
          key: menu.key,
          children:menu.children.map((cMenu)=>{
            return {
              title: cMenu.title,
              key: cMenu.key,
            }
          })
        }
      } else {
        return {
          title: menu.title,
          key: menu.key,
        }
      }
    });
    return [{
      title:'平台权限',
      key:'plat',
      children: treeDate
    }]
  };

  //点击多选方框
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys },()=>{
      this.props.getCheckedKeys(checkedKeys);
      this.state.checkedKeys=[]
    });
  };
  
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
  
  render () {
    const { getFieldDecorator } = this.props.form;
    const {name,menus} = this.props.role;
    const {checkedKeys} = this.state;
    
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            defaultExpandAll

            // expandedKeys={this.state.expandedKeys}
            // autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={checkedKeys.length? checkedKeys:menus  }
          >
            {this.renderTreeNodes(this.getTreeData())}
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default UpdateRoleForm;