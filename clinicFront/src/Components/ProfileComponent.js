import React , {Component} from 'react';
import { Button } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import Header from './HeaderComponent';

class Profile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            Requests : [],
            isAccepted:false
        }

    }

    componentDidMount()
    {
        const ID = localStorage.getItem('ID');
        fetch('http://localhost:5000/patientrequests/'+ ID)
        .then( (doctors) => doctors.json())   
        .then( (json) => {this.setState({Requests : json}); console.log(json);})
        .catch((err) => console.log(err))   
    }

    isAuthenticated()
    {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }
    acceptRequest(ID)
    {
        fetch('http://localhost:5000/patientrequests/acceptRequest/'+ ID,{
        method: 'PUT',
            headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
            body: JSON.stringify({
                isAccepted:true
            }) 
          })
          .then(function(response){
                return response.json();
          })
          .catch(error => console.log(error));
          document.location.reload(true);
    }

    rejectRequest(ID)
    {
        fetch('http://localhost:5000/patientrequests/acceptRequest/'+ ID,{
            method: 'DELETE',
                headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
                body: JSON.stringify({
                    isAccepted:true
                }) 
              })
              .then(function(response){
                    return response.json()
              })
              .catch(error => console.log(error));
        var btn =  document.getElementById('reject');
        btn.parentElement.parentElement.remove();        
    }
   
    render()
    {
        const ID = localStorage.getItem('ID'); 
        const isAlreadyAuthenticated = this.isAuthenticated()        
        return(
            <div className="container">
                <Header/>
                <h2>Requests</h2>
                {isAlreadyAuthenticated ? (
                <table className="table table-bordered mt-5">
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>City</th>                    
                    <th>Day</th>
                    <th>Hour</th>
                </tr>
                </thead>
                {this.state.Requests.map((request,index) => {
                    return(
                        <tbody>

                            {
                                (ID === request.patientID)?
                                (
                                    <tr key={index}>
                                        <td>{request.doctorName}</td>
                                        <td>{request.city}</td>
                                        <td>{request.day}</td>
                                        <td>{request.hour}</td>
                                        <td><Button type="submit" value="submit" id="reject" onClick={() => this.rejectRequest(request._id)} className="btn btn-danger">Reject</Button></td>                                        
                                    </tr>
                                )
                                :(
                                    (request.isAccepted==false)?
                                    (<tr key={index}>
                                        <td>{request.patientName}</td>
                                        <td>{request.city}</td>
                                        <td>{request.day}</td>
                                        <td>{request.hour}</td>                                       
                                        <td><Button type="submit" value="submit" id="accept" onClick={() => this.acceptRequest(request._id)} className="btn btn-success">Accept</Button></td>                                            
                                        <td><Button type="submit" value="submit" id="reject" onClick={() => this.rejectRequest(request._id)} className="btn btn-danger">Reject</Button></td>                                                                               
                                    </tr>)
                                    :(
                                    <tr key={index}>
                                        <td>{request.patientName}</td>
                                        <td>{request.city}</td>
                                        <td>{request.day}</td>
                                        <td>{request.hour}</td>                                       
                                    </tr>
                                    )
                                )
                            }                                                       
                        </tbody>
                    );
                })}

            </table>
                ):( <Redirect to={{pathname:'/login'}}/>)}

            </div>
        );
    }
}

export default Profile;