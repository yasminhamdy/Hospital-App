
import React, {Component} from 'react';
import {Form, FormGroup, Input, Label , Button} from 'reactstrap';
import {withRouter} from "react-router-dom";
import '../App.css';
import Header from './HeaderComponent';


class PatientRegisteration extends Component{

    constructor(props)
    {
        super(props);
        this.state ={
            error:''
        }
        this.handleRegister = this.handleRegister.bind(this);

    }

    handleRegister(event)
    {
        event.preventDefault(); 
        fetch('http://localhost:5000/patients/',{
            method: 'POST',
            headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
            body: JSON.stringify({
              firstname: this.firstname.value,
              lastname: this.lastname.value,
              email: this.email.value,
              username: this.username.value,
              password: this.password.value,
              telNumber: this.telNumber.value,
              age: this.age.text             
            })          
          })
          .then((response) => { return (response.json())})
          .then((res) => {
            console.log(res);
            if(res.err != null)
            {
                this.setState({error: res.err.message})
            }
            else
            {
                this.props.history.push("/home");  
            }
            
        })
    }

    render()
    {
        const selectedAges = [];
        for (var i = 20; i <= 60; i++) {
            selectedAges.push(i);
        }

        return(
            <div className="container">
                <Header/>
            <div style={{margin:"20px auto", width:"500px"}}>          
            <Form onSubmit={this.handleRegister}>
                <h2>Please Register Your Data</h2>
                <FormGroup className="input-container">
                    <i className="fa fa-user icon"></i>
                    <Input type="text" id="firstname" name="firstname" className="input-field"
                        placeholder=" First Name" style={{borderRadius:"0px"}}
                        innerRef={(input) => this.firstname = input} required minLength='3' maxLength='10'/>
                        
                    <i className="fa fa-user icon"></i>
                    <Input type="text" id="lastname" name="lastname" className="input-field"
                        placeholder=" Last Name" style={{borderRadius:"0px"}}
                        innerRef={(input) => this.lastname = input} required minLength='3' maxLength='10'/>
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                    <i className="fa fa-calendar icon"></i>
                    <select className="input-field" style={{borderRadius:"0px"}} id="age" name="age" defaultValue=""
                     ref="age" onChange = {(event) => this.age = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]}>
                        <option value="">Age</option>
                        {selectedAges.map((selectedAge,i) => {
                            return <option key={i} value={selectedAge} >{selectedAge}</option>
                        })}
                    </select>
                    </div>                  
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <Input type="email" id="email" name="email" className="input-field"
                            placeholder=" Email" style={{borderRadius:"0px"}}
                            innerRef={(input) => this.email = input} />
                    </div>                  
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                    <i className="fa fa-phone icon"></i>
                            <Input type="number" id="telNumber" name="telNumber" className="input-field"
                            placeholder=" tel.number" style={{borderRadius:"0px"}}
                            innerRef={(input) => this.telNumber = input} required/>
                    </div>                  
                </FormGroup>
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
                            placeholder=" Password" style={{borderRadius:"0px"}}
                            innerRef={(input) => this.password = input} />
                    </div> 
                </FormGroup>

            <Button type="submit" value="submit" className="button" style={{backgroundColor:"dodgerblue"}}>Register</Button>
            </Form>
            <div style={{color:'red'}}>
                {this.state.error}
            </div>
            </div>
            </div>

          
        );
    }
}

export default PatientRegisteration ;