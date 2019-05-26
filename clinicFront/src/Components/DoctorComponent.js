
import React, {Component} from 'react';
import {Form, FormGroup, Input, Label , Button} from 'reactstrap';
import {withRouter ,Switch, Redirect} from "react-router-dom";
import Header from './HeaderComponent';
import '../App.css';

class DoctorRegisteration extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            satchx:false,
            sunchx:false,
            monchx:false,
            tueschx:false,
            wedchx:false,
            thurchx:false,
            frichx:false, 
            error:''           
        };
        this.handleRegister = this.handleRegister.bind(this);

    }
    satchxToggle = () => {this.setState({satchx:!this.state.satchx})}
    sunchxToggle = () => {this.setState({sunchx:!this.state.sunchx})}
    monchxToggle = () => {this.setState({monchx:!this.state.monchx})}
    tueschxToggle = () => {this.setState({tueschx:!this.state.tueschx})}
    wedchxToggle = () => {this.setState({wedchx:!this.state.wedchx})}
    thurchxToggle = () => {this.setState({thurchx:!this.state.thurchx})}
    frichxToggle = () => {this.setState({frichx:!this.state.frichx})}    

    async handleRegister(event)
    {
        event.preventDefault();
        let days = [];
        for (var key in this.state) {
            if(this.state[key].checked === true)
            {
                days.push(this.state[key].name);
            }            
        }
        await fetch('http://localhost:5000/doctors/',{
            method: 'POST',
            headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
            body: JSON.stringify({
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                email: this.email.value,
                username: this.username.value,
                password: this.password.value,
                startHour: this.startHour.text,
                endHour: this.endHour.text,
                speciality: this.speciality.text,
                availableDays:days
            }) 

          })
          .then(function(response){
            return response.json();
        })
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
        const Hours = [];
        for (var i = 1; i < 13; i++) {
            Hours.push(i);            
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
                        innerRef={(input) => this.firstname = input} required minLength='3' maxLength='10'
                        />
                        
                    <i className="fa fa-user icon"></i>
                    <Input type="text" id="lastname" name="lastname" className="input-field"
                        placeholder=" Last Name" style={{borderRadius:"0px"}}
                        innerRef={(input) => this.lastname = input} required minLength='3' maxLength='10'/>
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <Input type="email" id="email" name="email" className="input-field"
                            placeholder=" Email" style={{borderRadius:"0px"}}
                            innerRef={(input) => this.email = input} required />
                    </div>                  
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                    <i className="fa fa-user-md icon"></i>
                    <select className="input-field" style={{borderRadius:"0px"}}
                         name="speciality" id="speciality" defaultValue="" onChange = {(event) => this.speciality = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]} required>
                        <option value="">Select Speciality</option>
                        <option value="Allergology">Allergology</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="General surgery">General surgery</option>
                        <option value="Immunological diseases">Immunological diseases</option>
                        <option value="Nephrology diseases">Nephrology diseases</option>                       
                    </select>
                    </div>                  
                </FormGroup>
                <FormGroup check>
                    <div className="input-container">
                    <i className="fa fa-calendar icon"></i>
                    <div className="input-field">
                        <h6>Available Days: </h6>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="saturday"
                            innerRef={(input) => this.state.satchx = input} onChange={this.satchxToggle} />
                            Saturday
                        </Label>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="sunday"
                            innerRef={(input) => this.state.sunchx = input} onChange={this.sunchxToggle}  />
                            Sunday
                        </Label>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="monday"
                            innerRef={(input) => this.state.monchx = input} onChange={this.monchxToggle}  />
                            Monday
                        </Label>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="tuesday"
                            innerRef={(input) => this.state.tueschx = input} onChange={this.tueschxToggle}  />
                            Tuesday
                        </Label>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="wednesday"
                            innerRef={(input) => this.state.wedchx = input} onChange={this.wedchxToggle}  />
                            Wednesday
                        </Label>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="thursday"
                            innerRef={(input) => this.state.thurchx = input} onChange={this.thurchxToggle}  />
                            Thursday
                        </Label>
                        <br/>
                        <Label check style={{marginLeft:"50px"}}>
                            <Input type="checkbox" name="friday"
                            innerRef={(input) => this.state.frichx = input} onChange={this.frichxToggle}  />
                            Friday
                        </Label>
                    </div>
                    </div>                  
                </FormGroup>
                <FormGroup>
                    <div className="input-container">
                    <i className="fa fa-calendar icon"></i>
                    <div className="input-field">
                        <h6>Available Hours: </h6>
                        <br/>
                        <span>Start:</span>
                        <select style={{marginLeft:"20px"}} defaultValue="" name="startHour" id="startHour"
                        onChange = {(event) => this.startHour = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]} 
                        required>
                            {Hours.map((hour,i) => {
                                return <option key={i} value={hour} >{hour}</option>
                            })}
                        </select>
                        PM
                        <span style={{marginLeft:"20px"}}>End:</span>
                        <select style={{marginLeft:"20px"}}defaultValue="" name="endHour" id="endHour"
                        onChange = {(event) => this.endHour = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]} required>
                            {Hours.map((hour,i) => {
                                return <option key={i} value={hour} >{hour}</option>
                            })}
                        </select> 
                        PM                       
                    </div>
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
                            innerRef={(input) => this.password = input} required minLength='6'/>
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

export default DoctorRegisteration;