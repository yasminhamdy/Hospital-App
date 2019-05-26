
import React, {Component} from 'react';
import {Form, FormGroup, Input, Label , Button} from 'reactstrap';
import '../App.css';
import Header from './HeaderComponent';

class Login extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            error: ''
        }
        this.handleLogin = this.handleLogin.bind(this);

    }

    async handleLogin(event)
    {
        event.preventDefault();
        await fetch('http://localhost:5000/users/login/',{
            method: 'POST',
            headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
            body: JSON.stringify({
                username: this.username.value,
                password: this.password.value,
            }) 
          })
          .then(function(response){
              return response.json();
          })
          .then((res) => {
              console.log(res);
              localStorage.setItem('token', res.token);
              localStorage.setItem('ID',res.user.id);
              localStorage.setItem('Name',res.user.name);
              this.props.history.push("/home");  
              
          })
          .catch(err => { this.setState({error: "Please Check Your Username Or Password"});});


    }

    render()
    {

        return(
            <div className="container">
                 <Header/>
                 <div style={{margin:"20px auto", width:"500px"}}>
            <Form onSubmit={this.handleLogin}>
                <h2>Please Login First</h2>
   
                <FormGroup>
                    <div className="input-container">
                        <i className="fa fa-user-circle icon"></i>
                        <Input type="text" id="username" name="username" className="input-field"
                            placeholder=" Username" style={{borderRadius:"0px"}}
                            innerRef={(input) => this.username = input} required minLength='3' maxLength='10'/>
                    </div>                  
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                        <i className="fa fa-key icon"></i>
                        <Input type="password" id="password" name="password" className="input-field"
                            placeholder=" Password" style={{borderRadius:"0px"}} required
                            innerRef={(input) => this.password = input} />
                    </div> 
                </FormGroup>

                <FormGroup check>
                    <Label check className="checkbox">
                        <Input type="checkbox" name="remember" 
                        innerRef={(input) => this.remember = input}  />
                        Remember me
                    </Label>
                </FormGroup>

            <Button type="submit" value="submit" className="button" style={{backgroundColor:"dodgerblue"}}>Login</Button>
            </Form>
            <div style={{color:'red'}}>
                {this.state.error}
            </div>
            </div>
            </div>

          
        );
    }
}

export default Login ;