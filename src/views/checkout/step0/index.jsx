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
//create a form to collect the user's payment details. then get basket details and send to stripe

const CheckoutForm = ({ basket, subtotal, onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
        phone,
        address: {
          line1: address,
        },
      },
    });

    if (!error) {
      console.log(paymentMethod); // Use this to send to server
      onComplete({
        email,
        phone,
        address,
        paymentMethod,
        basket,
        subtotal,
      });
    } else {
      setErrorMessage(error.message);
    }
  };


    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
  
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
  
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />
  
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" />
  
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
  
        <button type="submit" disabled={!stripe}>
          Pay {displayMoney(subtotal)}
        </button>
      </form>
    );
  };
  