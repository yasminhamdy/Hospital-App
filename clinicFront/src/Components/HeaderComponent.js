
import React , {Component} from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron , Button} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';


class Header extends Component{

    constructor(props)
    {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.logoutFunction = this.logoutFunction.bind(this);
    
        this.state = {
          isNavOpen: false,
        };
      }
    
      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
    
      isAuthenticated()
      {
          const token = localStorage.getItem('token');
          return token && token.length > 10;
      }

     logoutFunction(event)
      {
        fetch('http://localhost:5000/users/logout')
        .then( (json) => {console.log(json)})
        .catch((err) => console.log(err))
        localStorage.setItem('token', " ");
        localStorage.setItem('ID'," ");
        localStorage.setItem('Name'," ");
        console.log(this.props)
        document.location.reload();
      }

    render()
    {
        const isAlreadyAuthenticated = this.isAuthenticated()        
        return(
            <div className='container'>
                <Navbar dark  expand="md" color='primary'>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" style={{color:'black'}} href="/"><h2>Hospital</h2></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem className="m-2"> 
                                <NavLink className="nav-link" style={{color:'black'}} to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem className="m-2">
                                <NavLink className="nav-link" style={{color:'black'}} to='/profile'><span className="fa fa-user fa-lg"></span> Profile</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem className="m-2">
                                    <div className="dropdown">
                                        <Button outline className="dropdown-toggle" type="button" id="dropdownbtn" data-toggle="dropdown">
                                            <span className="fa fa-user fa-lg"></span> Sign in
                                        </Button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownbtn">
                                            <Link className="dropdown-item fa fa-user-md" to="/doctorRegister"> Doctor</Link>
                                            <Link className="dropdown-item fa fa-user" to="/patientRegister"> Patient</Link>
                                        </div>
                                    </div>
                                </NavItem>
                                {isAlreadyAuthenticated ? (
                                    <NavItem className="m-2">
                                    <Button outline onClick={this.logoutFunction}><span className="fa fa-sign-in fa-lg login"></span> LogOut</Button>
                                    </NavItem>
                                ): (
                                    <NavItem className="m-2">
                                    <Button outline><span className="fa fa-sign-in fa-lg login"></span> <Link className='link' to="/login"> Login</Link>
                                    </Button>
                                    </NavItem>
                                )}

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }

}

export default Header;