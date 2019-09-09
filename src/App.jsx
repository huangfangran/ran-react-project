import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'

import routes from './config/routes'

export default class App extends React.Component{

    render(){
      return (
           <BrowserRouter>
               {
                   routes.map((route,index)=>{
                       return <Route key={index} {...route} />
                   })
               }
           </BrowserRouter>
       )
    }
}