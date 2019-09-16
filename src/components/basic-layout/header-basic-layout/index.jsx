import React from 'react';
import {Button,Icon,Modal} from 'antd'
import {connect} from 'react-redux'
import Dayjs from 'dayjs'

import './index.less'
import {removeUser} from '../../../redux/action-creators'

@connect((state)=>({username:state.user.user.username,title:state.title}), {removeUser})
class HeaderBasicLayout extends React.Component{

    state = {
        timer:Dayjs().format('YYYY-MM-DD HH:mm:ss')
    };

    //设置选中的选项卡的标题
    logout = ()=>{
        Modal.confirm(
            {
                title:'确认要退出登录嘛？',
                onOk:()=>{
                    this.props.removeUser()
                },
                okText:'确认',
                cancelText:'取消'
            }
        );
    };

    //设置时间
    componentDidMount() {
        this.allTimer = setInterval(()=>{
            this.setState({
                timer:Dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.allTimer)
    }

    render(){
        const {username,title} = this.props;
        const {timer} = this.state;
      return (
           <header className='header-main'>
               <div className='header-top'>
                   <Button size='small' className='top-btn'><Icon type="fullscreen" /></Button>
                   <Button size='small' className='top-btn'>English</Button>
                   <span>欢迎，{username}</span>
                   <Button size='small' type='link' className='top-btn' onClick={this.logout}>退出</Button>
               </div>
               <div className='header-bottom'>
                   <span className='bottom-text'>{title}</span>
                   <span className='bottom-date'>{timer}</span>
               </div>
           </header>
       )
    }
}

export default HeaderBasicLayout