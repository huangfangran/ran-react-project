import React from 'react';

import WithCheckoutLogin from '../../container/with-checkout-login'

@WithCheckoutLogin
class Home extends React.Component {

    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}

export default Home