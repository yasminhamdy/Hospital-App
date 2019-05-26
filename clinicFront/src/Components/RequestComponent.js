
import React, {Component} from 'react';
import {Form, FormGroup, Input, Label , Button} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import Header from './HeaderComponent';

class Request extends Component{
    constructor(props)
    {
        super(props);
        this.handleRequest = this.handleRequest.bind(this);  
    }

    handleRequest(event)
    {
        event.preventDefault();
        console.log(this.props.match.params);
        fetch('http://localhost:5000/patientrequests/',{
            method: 'POST',
            headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
            body: JSON.stringify({
                doctorID: this.props.match.params.doctorID,
                doctorName: localStorage.getItem('doctorName'),
                patientID: localStorage.getItem('ID'),
                patientName: localStorage.getItem('Name'),
                city: this.city.text,
                day: this.day.text ,
                hour:this.appoHour.text            
            })          
          })
          .then((response) => { console.log(response.json())})
          .catch(error => console.log(error));
          this.props.history.push("/home");
    }

    isAuthenticated()
    {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }

    render(){
        const Hours = [];
        for (var i = 1; i < 13; i++) {
            Hours.push(i);            
        }
        const isAlreadyAuthenticated = this.isAuthenticated()
        return(
            <div className="container">
                <Header/>
                <div style={{margin:"20px auto", width:"500px"}}>
            {isAlreadyAuthenticated ? (<Form onSubmit={this.handleRequest}>
                <h2>Please Fill Your Data</h2>
                <FormGroup>
                        <div className="input-container">
                        <i className="fa fa-building icon"></i>
                        <div className="input-field">
                            <span>City:</span>
                            <select style={{marginLeft:"20px"}} name="city" id="city"
                            onChange = {(event) => this.city = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]} 
                            required className="form-control">
                                <option>Select City</option>
                                <option value="Mansoura">Mansoura</option>
                                <option value="Alex">Alex</option>
                                <option value="Cairo">Cairo</option>
                                <option value="Tanta">Tanta</option>
                                <option value="Esmailia">Esmailia</option>                            
                            </select>
                        </div>
                        </div>                  
                    </FormGroup>
                <FormGroup>
                        <div className="input-container">
                        <i className="fa fa-calendar icon"></i>
                        <div className="input-field">
                            <h6>Appointment Data: </h6>
                            <br/>
                            <span>Day:</span>
                            <select style={{marginLeft:"20px"}} name="day" id="day"
                            onChange = {(event) => this.day = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]} 
                            required className="form-control">
                                <option>Select Day</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>                            
                                <option value="Friday">Friday</option>                                                                                        
                            </select>
                            <br/>
                            <span>Hour:</span>
                            <select style={{marginLeft:"20px"}} name="appoHour" id="appoHour"
                            onChange = {(event) => this.appoHour = event.nativeEvent.target[event.nativeEvent.target.selectedIndex]} 
                            required>
                                <option>Select Hour</option>
                                {Hours.map((hour,i) => {
                                    return <option key={i} value={hour} >{hour}</option>
                                })}
                            </select>
                            PM          
                        </div>
                        </div>                  
                    </FormGroup>

            <Button type="submit" value="submit" className="button" style={{backgroundColor:"dodgerblue"}}>Reserve</Button>
            </Form>) : <Redirect to={{pathname:'/login'}}/>
            }
            
        </div>
            </div>

       
        );
    }
}

export default Request;
