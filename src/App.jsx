import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import routes from './config/routes'
import NotMatch from './components/notMatch'
import BasicLayout from "./components/basic-layout";
import Login from "./container/login";

export default class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <BasicLayout>
                        <Switch>
                            {
                                routes.map((route, index) => {
                                    return <Route key={index} {...route} />
                                })
                            }
                            <Route component={NotMatch}/>
                        </Switch>
                    </BasicLayout>
                </Switch>
            </BrowserRouter>
        )
    }
}