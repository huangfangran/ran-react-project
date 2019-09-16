import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

function WithCheckoutLogin(WithComponent) {
    /*
    * 1.如果是在/login，检测是否有token，如果有，要跳转到/；如果没有，不变
    * 2.如果是在/，检测是否有token，如果有，不变；如果没有，要跳转到/login
    * */
    return connect((state)=>({token:state.user.token}),null)(class extends React.Component {

        static displayName = `CheckoutLogin${WithComponent.displayName || WithComponent.name || 'Component'}`;

        render() {
            //获取当前所在的地址位置
            const {token, ...rest} = this.props;
            const {location:{pathname}} = rest;
            if (pathname === '/login' && token) return <Redirect to='/'/>;
            if (pathname !== '/login' && !token) return <Redirect to='/login'/>;
            return <WithComponent {...rest}/>
        }
    })
}

export default WithCheckoutLogin