import React from 'react';
import {Icon, Menu} from "antd";
import {withRouter, Link} from 'react-router-dom'
import {menuItems} from "../../../config/menu-item";

const {SubMenu} = Menu;

@withRouter
class SideNav extends React.Component {

    //创建menu的item
    createItem = (menu) => {
        return (
            <Menu.Item key={menu.key}>
                <Link to={menu.key}>
                    <Icon type={menu.icon}/>
                    <span>{menu.title}</span>
                </Link>
            </Menu.Item>
        )
    };
    // 创建menu
    createMenus = () => {
        return menuItems.map((menu) => {
            if (menu.children) {
                return (
                    <SubMenu key={menu.key} title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}>
                        {
                            menu.children.map((cMenu) => {
                                return this.createItem(cMenu)
                            })
                        }
                    </SubMenu>
                );
            } else {
                return this.createItem(menu)
            }
        })
    };
    //    创建默认展开
    openKeys = (pathname) => {
        for (let i = 0; i < menuItems.length; i++) {
            const menu = menuItems[i];
            if (menu.children) {
                for (let j = 0; j < menu.children.length; j++) {
                    const menuChildren = menu.children[j];
                    if (menuChildren.key === pathname) {
                        return menu.key
                    }
                }
            }
        }
    };

    render() {
        const {pathname} = this.props.location;
        const openKeys = this.openKeys(pathname);
        return (
            <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKeys]} mode="inline">
                {
                    this.createMenus()
                }
            </Menu>
        )
    }
}

export default SideNav