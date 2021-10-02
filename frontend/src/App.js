import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import reactDom from 'react-dom';
import LoginForm from './LoginForm';
import FetchData from './FetchData';
class App extends Component {
  render(){
    return (
      <div style={{textAlign:'center', margin:50}}>
        <Router>
          <Switch>
            <Route path="/files">
              <FetchData/>
            </Route>

            <Route path="/">
              <LoginForm/>
            </Route>
          </Switch>
        </Router>

      </div>
    );
  }
  
}

export default App;
