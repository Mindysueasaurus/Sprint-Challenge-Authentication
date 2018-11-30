import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Doggos from './components/Doggos';

import './App.css';

class App extends Component {
  signout = () => {
    localStorage.removeItem('jwt');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/">Sign Up</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/doggos">Doggos</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.signout}>Sign Out</button>
          </nav>
          <main>
            <Route path="/" component={SignUp} exact />
            <Route path="/signin" component={SignIn} />
            <Route path="/doggos" component={Doggos} />
          </main>
        </header>
      </div>
    );
  }
}

export default App;
