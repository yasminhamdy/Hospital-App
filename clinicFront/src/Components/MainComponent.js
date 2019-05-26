
import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Request from './RequestComponent';
import DoctorRegisteration from './DoctorComponent';
import PatientRegisteration from './PatientComponent';
import Login from './LoginComponet';
import Profile from './ProfileComponent';


class Main extends Component{

    render()
    {
        return(
            <Router>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/doctorRegister' component={DoctorRegisteration}/>
                    <Route path='/patientRegister' component={PatientRegisteration}/>
                    <Route path='/request/:doctorID' component={Request}/> 
                    <Route path='/login' component={Login}/>
                    <Route path='/profile' component={Profile}/>
                    <Redirect to='/home'/>                  
                </Switch>
            </Router>
        );
    }
}

export default Main;