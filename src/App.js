import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SingInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'

import { selectCurrentUser } from './redux/user/user.selectors'
import { selectCollectionsForPreview } from './redux/shop/shop.selector'
import { checkUserSession } from './redux/user/user.actions'


class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/shop'>
            <ShopPage />
          </Route>
          <Route exact path='/checkout'>
            <CheckoutPage />
          </Route>
          <Route exact path='/signin'>
            {this.props.currentUser ?
              <Redirect to='' /> :
              <SingInAndSignUpPage />}
          </Route>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
