
import React, {Component} from 'react';
import { Card, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from './HeaderComponent';
class Home extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            Doctors:[]            
        }
    }

    componentDidMount()
    {
      fetch('http://localhost:5000/doctors/')
      .then( (doctors) => doctors.json())   
      .then( (json) => {this.setState({Doctors: json}); console.log(json)})
      .catch((err) => console.log(err))

    }
    render()
    {       
        // this.getDoctors()        
        const doctors = this.state.Doctors.map((doctor, index) => {
            return(
                <div key={index} className='col-12 col-md-9 mt-5'>
                    <Card>
                        <CardBody>
                            <CardTitle>The Doctor Name is:  {doctor.firstname + " " + doctor.lastname}</CardTitle>
                            <CardSubtitle>Speciality is: {doctor.speciality}</CardSubtitle>
                            <CardText>Available Days: {doctor.availableDays.map((item) => {
                                return(
                                    <li>{item + " " + doctor.startHour + " PM" + " to " + doctor.endHour + " PM"}</li>
                                );
                            })
                            }</CardText>
                            <Link to={`/request/${doctor.data._id}`} onClick={()=> {localStorage.setItem('doctorName',doctor.firstname)}}  className="btn btn-success m-3">Make Appointment</Link>
                        </CardBody>
                    </Card>
                </div>
            )
        });
        return(
            <div className="container">
                <Header/>
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <h1>Available Doctors </h1>
                        {doctors}
                    </div>
                </div>
            </div>
        );
    }
   
}

export default Home;