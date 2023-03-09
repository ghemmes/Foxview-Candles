/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-else-return */
import { CustomInput } from '@/components/formik';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';

const CreditPayment = () => {
  const { values, setValues } = useFormikContext();
  const collapseContainerRef = useRef(null);
  const cardInputRef = useRef(null);
  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);

  const toggleCollapse = () => {
    const cn = containerRef.current;
    const cb = checkboxContainerRef.current;
    const cl = collapseContainerRef.current;

    if (cb && cn && cl) {
      if (values.type === 'credit') {
        cardInputRef.current.focus();
        cn.style.height = `${cb.offsetHeight + cl.offsetHeight}px`;
      } else {
        cardInputRef.current.blur();
        cn.style.height = `${cb.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, [values.type]);

  const onCreditModeChange = (e) => {
    if (e.target.checked) {
      setValues({ ...values, type: 'credit' });
      toggleCollapse();
    }
  };

  const handleOnlyNumberInput = (e) => {
    const { key } = e.nativeEvent;
    if (/\D/.test(key) && key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <>
    <StripeProvider
      publishableKey="pk_test_51KTYLbDCAB4sAR7MxHMQ7c44hKrrIsbSX4yOsnrMgB7od0ghuWAQtXTpmxBU8B5AJUBHtHtVANIkQnU0V4BZUYeX00XYaL2M36">
      <h3 className="text-center">Payment</h3>
      <br />
      <span className="d-block padding-s">Payment Option</span>
      <div
        ref={containerRef}
        className={`checkout-fieldset-collapse ${values.type === 'credit' ? 'is-selected-payment' : ''}`}
      >
        {/* ---- CHECKBOX TOGGLER ------ */}
        <div className="checkout-field margin-0">
          <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
            <input
              checked={values.type === 'credit'}
              id="modeCredit"
              name="type" // the field name in formik I used is type
              onChange={onCreditModeChange}
              type="radio"
            />
            <label
              className="d-flex w-100"
              htmlFor="modeCredit"
            >
              <div className="d-flex-grow-1 margin-left-s">
                <h4 className="margin-0">Credit Card</h4>
                <span className="text-subtle d-block margin-top-s">
                  Pay with Visa, Master Card and other debit or credit card
                </span>
              </div>
              <div className="d-flex">
                <div className="payment-img payment-img-visa" />
                &nbsp;
                <div className="payment-img payment-img-mastercard" />
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub" ref={collapseContainerRef}>
          <span className="d-block padding-s text-center">Accepted Cards</span>
          <div className="checkout-cards-accepted d-flex-center">
            <div className="payment-img payment-img-visa" title="Visa" />
            <div className="payment-img payment-img-express" title="American Express" />
            <div className="payment-img payment-img-mastercard" title="Master Card" />
            <div className="payment-img payment-img-maestro" title="Maestro" />
            <div className="payment-img payment-img-discover" title="Discover" />
          </div>
          <br />
          <div className="checkout-field margin-0">
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <Field
                  name="name"
                  type="text"
                  label="* Name on Card"
                  placeholder="Jane Doe"
                  component={CustomInput}
                  style={{ textTransform: 'capitalize' }}
                  inputRef={cardInputRef}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="cardnumber"
                  type="text"
                  maxLength={19}
                  onKeyDown={handleOnlyNumberInput}
                  label="* Card Number"
                  placeholder="Enter your card number"
                  component={CustomInput}
                />
              </div>
            </div>
            <div className="checkout-fieldset">
              <div className="checkout-field">
                <Field
                  name="expiry"
                  type="date"
                  label="* Expiry Date"
                  placeholder="Enter your expiry date"
                  component={CustomInput}
                />
              </div>
              <div className="checkout-field">
                <Field
                  name="ccv"
                  type="text"
                  maxLength={4}
                  onKeyDown={handleOnlyNumberInput}
                  label="* CCV"
                  placeholder="****"
                  component={CustomInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div></StripeProvider>
    </>
  );
};

export default CreditPayment;

















































































































// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";

// export default function CreditPayment() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: "http://localhost:3000",
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs"
//   }

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// }

















/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-else-return */
// import { CustomInput } from '@/components/formik';
// import { Field, useFormikContext } from 'formik';
// // import React, { useEffect, useRef } from 'react';

// // import { loadStripe } from "@stripe/stripe-js";


// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";

// export default function CreditPayment() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: "http://localhost:3000",
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs"
//   }

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// }





// const CreditPayment = () => {
//   const [values, setValues] = useState({
//     nameOnCard: "",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });

//   const handleNameOnCard = (e) => {
//     setValues({ ...values, nameOnCard: e.target.value });
//   };

//   const handleCardNumber = (e) => {
//     setValues({ ...values, cardNumber: e.target.value });
//   };

//   const handleExpiry = (e) => {
//     setValues({ ...values, expiry: e.target.value });
//   };

//   const handleCvv = (e) => {
//     setValues({ ...values, cvv: e.target.value });
//   };

//   const stripe = new Stripe("sk_test_51KTYLbDCAB4sAR7M1X90GQPDvYKhzzYsRmrX3qAcc18igzs04FQV3gbgx2kSKIrGmZYwFhLTkY8sd4T5PqRD9u8S003LlNAUYr", {
//     apiVersion: "2020-08-27",
//   });
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const stripe = await loadStripe("pk_test_51KTYLbDCAB4sAR7MxHMQ7c44hKrrIsbSX4yOsnrMgB7od0ghuWAQtXTpmxBU8B5AJUBHtHtVANIkQnU0V4BZUYeX00XYaL2M36");

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: {
//         name: values.nameOnCard,
//         number: values.cardNumber,
//         exp_month: values.expiry.split("/")[0],
//         exp_year: values.expiry.split("/")[1],
//         cvc: values.cvv,
//       },
//     });

//     if (error) {
//       console.error("Error:", error);
//     } else {
//       console.log("Payment Method:", paymentMethod);
//       // Send the payment method to your server to charge the payment
//     }
//   };

//   return (
//     <div className="checkout-collapse-sub" ref={collapseContainerRef}>
//       <form onSubmit={handleSubmit}>
//         <div className="checkout-field margin-0">
//           <div className="checkout-fieldset">
//             <div className="checkout-field">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="nameOnCard"
//                 value={values.nameOnCard}
//                 onChange={handleNameOnCard}
//                 placeholder="Jane Doe"
//               />
//             </div>
//             <div className="checkout-field">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="cardNumber"
//                 value={values.cardNumber}
//                 onChange={handleCardNumber}
//                 placeholder="0000 0000 0000 0000"
//               />
//             </div>
//             <div className="checkout-field">
//               <input
//                 type="text"
//                 className="form-control"
//                 id="expiry"
//                 value={values.expiry}
//                 onChange={handleExpiry}
//                 placeholder="MM/YY"
//               />
//             </div>
//             <div className="checkout-field">
//               <input
//                 type="text"
//                 className="form-control" 
//                 id="cvv"
//                 value={values.cvv}
//                 onChange={handleCvv}
//                 placeholder="CVV"
//               />
//             </div>
//           </div>
//         </div>
//         <button type="submit">Pay</button>
//       </form>
//     </div>
//   );
// };

// export default CreditPayment;





// const CreditPayment = () => {
//   const { values, setValues } = useFormikContext();
//   const collapseContainerRef = useRef(null);
//   const cardInputRef = useRef(null);
//   const containerRef = useRef(null);
//   const checkboxContainerRef = useRef(null);

//   const toggleCollapse = () => {
//     const cn = containerRef.current;
//     const cb = checkboxContainerRef.current;
//     const cl = collapseContainerRef.current;

//     if (cb && cn && cl) {
//       if (values.type === 'credit') {
//         cardInputRef.current.focus();
//         cn.style.height = `${cb.offsetHeight + cl.offsetHeight}px`;
//       } else {
//         cardInputRef.current.blur();
//         cn.style.height = `${cb.offsetHeight}px`;
//       }
//     }
//   };

//   useEffect(() => {
//     toggleCollapse();
//   }, [values.type]);

//   const onCreditModeChange = (e) => {
//     if (e.target.checked) {
//       setValues({ ...values, type: 'credit' });
//       toggleCollapse();
//     }
//   };

//   const handleOnlyNumberInput = (e) => {
//     const { key } = e.nativeEvent;
//     if (/\D/.test(key) && key !== 'Backspace') {
//       e.preventDefault();
//     }
//   };

//   return (
//     <>
//       <h3 className="text-center">Payment</h3>
//       <br />
//       <span className="d-block padding-s">Payment Option</span>
//       <div
//         ref={containerRef}
//         className={`checkout-fieldset-collapse ${values.type === 'credit' ? 'is-selected-payment' : ''}`}
//       >
//         {/* ---- CHECKBOX TOGGLER ------ */}
//         <div className="checkout-field margin-0">
//           <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
//             <input
//               checked={values.type === 'credit'}
//               id="modeCredit"
//               name="type" // the field name in formik I used is type
//               onChange={onCreditModeChange}
//               type="radio"
//             />
//             <label
//               className="d-flex w-100"
//               htmlFor="modeCredit"
//             >
//               <div className="d-flex-grow-1 margin-left-s">
//                 <h4 className="margin-0">Credit Card</h4>
//                 <span className="text-subtle d-block margin-top-s">
//                   Pay with Visa, Master Card and other debit or credit card
//                 </span>
//               </div>
//               <div className="d-flex">
//                 <div className="payment-img payment-img-visa" />
//                 &nbsp;
//                 <div className="payment-img payment-img-mastercard" />
//               </div>
//             </label>
//           </div>
//         </div>
//         <div className="checkout-collapse-sub" ref={collapseContainerRef}>
//           <span className="d-block padding-s text-center">Accepted Cards</span>
//           <div className="checkout-cards-accepted d-flex-center">
//             <div className="payment-img payment-img-visa" title="Visa" />
//             <div className="payment-img payment-img-express" title="American Express" />
//             <div className="payment-img payment-img-mastercard" title="Master Card" />
//             <div className="payment-img payment-img-maestro" title="Maestro" />
//             <div className="payment-img payment-img-discover" title="Discover" />
//           </div>
//           <br />
//           <div className="checkout-field margin-0">
//             <div className="checkout-fieldset">
//               <div className="checkout-field">
//                 <Field
//                   name="name"
//                   type="text"
//                   label="* Name on Card"
//                   placeholder="Jane Doe"
//                   component={CustomInput}
//                   style={{ textTransform: 'capitalize' }}
//                   inputRef={cardInputRef}
//                 />
//               </div>
//               <div className="checkout-field">
//                 <Field
//                   name="cardnumber"
//                   type="text"
//                   maxLength={19}
//                   onKeyDown={handleOnlyNumberInput}
//                   label="* Card Number"
//                   placeholder="Enter your card number"
//                   component={CustomInput}
//                 />
//               </div>
//             </div>
//             <div className="checkout-fieldset">
//               <div className="checkout-field">
//                 <Field
//                   name="expiry"
//                   type="date"
//                   label="* Expiry Date"
//                   placeholder="Enter your expiry date"
//                   component={CustomInput}
//                 />
//               </div>
//               <div className="checkout-field">
//                 <Field
//                   name="ccv"
//                   type="text"
//                   maxLength={4}
//                   onKeyDown={handleOnlyNumberInput}
//                   label="* CCV"
//                   placeholder="****"
//                   component={CustomInput}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreditPayment;