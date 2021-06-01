import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51IxdW9LWHidxz1vyFoz8t8Ofs7VaBxwbnwtoxWg26RykhxNdRqkfgpe3q6WQ3I95gfQoAXT23H6xAFpaafzA8gny00XX2Qh5PP'

  const onToken = token => {
    console.log(token);
    alert('Payment Successfull');
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