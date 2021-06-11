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
// eslint-disable-next-line no-unused-vars
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'
import { selectCollectionsForPreview } from './redux/shop/shop.selector'

class App extends React.Component {
  unsubcribeFromAuth = null;

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubcribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      } else {
        setCurrentUser(null);
      }
      //addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    })
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
