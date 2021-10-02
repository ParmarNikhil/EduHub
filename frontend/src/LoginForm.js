import React from 'react';
import { Redirect } from 'react-router-dom';
class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    logged_in: localStorage.getItem('token') ? true : false,
  };
  
  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username},()=>{console.log(this.state.username)});
        });   
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token,()=>{
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: json.user.username,
          })
        })
      });
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    if(this.state.logged_in===true){
      return (<Redirect to="/files" />);
    }
    return (
        <div>
        <br></br>
        {"hellow " + this.state.username}
        
        <h4>Log In</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
          required
        />

        <input type="button" onClick={e => this.handle_login(e, this.state)} value="submit"/>    
       
        </div>

      
    );
  }
}

export default LoginForm;
