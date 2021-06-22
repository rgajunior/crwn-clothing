import React, { useState } from 'react'
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
// import { auth } from '../../firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = userCredentials;

    emailSignInStart(email, password);
  }

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({...userCredentials, [name]: value });
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={userCredentials.email}
          required
          label='email'
          handleChange={handleChange}
        />
        <FormInput
          name='password'
          type='password'
          value={userCredentials.password}
          label='password'
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>

      </form>
    </div>
  )

}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);