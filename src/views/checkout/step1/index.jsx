// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const CheckoutForm = ({ basket, subtotal }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//       billing_details: {
//         email,
//         phone,
//         address: {
//           line1: address,
//         },
//       },
//     });

//     if (!error) {
//       console.log(paymentMethod); // Use this to send to server
//       // Add more logic here to submit other data to server (e.g. email, phone, address, basket items, subtotal)
//     } else {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//         required
//       />

//       <label htmlFor="phone">Phone</label>
//       <input
//         type="tel"
//         id="phone"
//         value={phone}
//         onChange={(event) => setPhone(event.target.value)}
//         required
//       />

//       <label htmlFor="address">Address</label>
//       <textarea
//         id="address"
//         value={address}
//         onChange={(event) => setAddress(event.target.value)}
//         required
//       />

//       <label htmlFor="card-element">Credit or debit card</label>
//       <CardElement id="card-element" />

//       {errorMessage && (
//         <div className="error-message">{errorMessage}</div>
//       )}

//       <button type="submit" disabled={!stripe}>
//         Pay {subtotal}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;




// *********************************************************************
import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
import { BasketItem } from '@/components/basket';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { displayMoney } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
// import { BasketItem } from '@/components';
// import { CHECKOUT_STEP_2 } from '@/constants/routes';
// import { displayMoney } from '@/helpers/utils';
// import { useDocumentTitle, useScrollTop } from '@/hooks';
// import PropType from 'prop-types';
// import { StepTracker } from '../components';
// import withCheckout from '../hoc/withCheckout';




const OrderSummary = ({ basket, subtotal }) => {
  useDocumentTitle('Check Out Step 1 | Foxview Candles');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickPrevious = () => history.push('/');
  const onClickNext = () => history.push(CHECKOUT_STEP_2);

  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br />
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem
              basket={basket}
              dispatch={dispatch}
              key={product.id}
              product={product}
            />
          ))}
        </div>     
         {/* add form to collect email, phone, address, and card details */}
        {/* <CheckoutForm basket={basket} subtotal={subtotal} /> */}
        
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={onClickPrevious}
            type="button"
          >
            <ShopOutlined />
            &nbsp;
            Continue Shopping
          </button>
          <button
            className="button"
            onClick={onClickNext}
            type="submit"
          >
            Next Step
            &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div> 



    </div>
   

    
  );
};

OrderSummary.propTypes = {
  basket: PropType.arrayOf(PropType.object).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(OrderSummary);
