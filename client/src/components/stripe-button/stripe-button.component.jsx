import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IxdW9LWHidxz1vyFoz8t8Ofs7VaBxwbnwtoxWg26RykhxNdRqkfgpe3q6WQ3I95gfQoAXT23H6xAFpaafzA8gny00XX2Qh5PP'

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      }
    }).then(response => {
      alert('Payment successful');
    }).catch(error => {
      console.log('Payment error: ', error);
      alert('There was an issue with your payment. Please make sure you use the provided credit card.');
    });
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;