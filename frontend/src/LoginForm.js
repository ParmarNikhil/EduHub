import React from 'react';
import {useHistory, Redirect, Link } from 'react-router-dom';
class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    logged_in: localStorage.getItem('token') ? true : false,
    redirect: "false",
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

  handle_login = (data) => {
    // e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(json => localStorage.setItem('token', json.token)   
      );
      
          this.setState({
            logged_in: true,
            redirect: "true",
          },()=>{
            console.log(this.state.redirect)            
          })
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
    if(this.state.logged_in===true || this.state.redirect==="true"){
      return (<Redirect to="/files" />);
    }
    else{
      return (
       
        <form className="login-box" onSubmit = {() => this.handle_login(this.state)}>
        <h1>login</h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.username}
          onChange={this.handle_change}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handle_change}
          required
        />

        {/* <button className="submit-btn" id="submit-btn"> submit </button>     */}
       
        <input type="submit" value="submit" className="submit-btn"/>
        
        </form>
    );
    }
    
    
  }
}

export default LoginForm;
