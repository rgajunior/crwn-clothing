import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubcribeFromAuth = null;

  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/shop'>
            <ShopPage />
          </Route>
          <Route path='/signin'>
            <SingInAndSignUpPage />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App;
