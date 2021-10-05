import React from 'react';
import { Redirect } from 'react-router-dom';
class LoginForm extends React.Component {

  state = {
    username: '',
    password: '',
    logged_in: false,
  };

  async componentDidMount() {  
    if (localStorage.getItem("token")) {
      await fetch('http://localhost:8000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username, logged_in: true }, 
            () => { console.log(this.state.username) });
        });
    }
  }

  handle_login = async(data) => {
    fetch('http://localhost:8000/token-auth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
              },
          body: JSON.stringify(data)
          }).then(res => res.json())
            .then(json => localStorage.setItem("token",json.token))
              this.setState({ logged_in: true })
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
    return (
      <>
        {this.state.logged_in ?
          <Redirect to="/files" />
          :
          <form className="login-box" onSubmit={() => this.handle_login(this.state)}>
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

            <input type="submit" value="submit" className="submit-btn" />
          </form>

        }

      </>
    );

  }
}

export default LoginForm;
