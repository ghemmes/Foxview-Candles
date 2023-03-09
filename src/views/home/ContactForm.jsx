import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, message } = formData;

    fetch(
      `https://us-central1-foxview-candle.cloudfunctions.net/sendEmail?email=${email}&name=${name}&message=${message}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
<div className="contact-container">
      <div className="contact-form">
        
        <form onSubmit={handleSubmit}>
          <div className="contact-form-header">
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="contact-form-header">
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="contact-form-header">
            <label htmlFor="message">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </label>
            <div className="contact-form-button">
            <button type="submit">Submit</button>
          </div>
          </div>
          
        </form>
      </div>
      
      <div className="contact-info">
        <div className="contact-info-header1">
        <h3>We are always happy to hear from you. If you have any questions or concerns, please
              contact us using the form below.</h3>
        </div>
        <p>Contact Email: contact@foxviewcandle.com</p>
        <p>Contact Address: 123 Main Street, Anytown USA 12345</p>
      </div>
    </div>
  );
};


export default ContactForm;







// -M;].N:W*&je9sE




// import React, { useState } from 'react';
// import { MIMEMultipart, MIMEText } from 'emailjs-mime-types';
// import smtplib from 'emailjs-smtp-client';
// import ssl from 'ssl-root-cas';

// function EmailLog() {
//   const [userEmail, setUserEmail] = useState('');

//   const senderEmail = "ghemmes@itgcorporation.com";
//   const password = "Chuck0162!";
//   const message = new MIMEMultipart("alternative");
//   message.setHeader("Subject", "RMM Powershell Automation Results");
//   message.setHeader("From", senderEmail);
//   message.setHeader("To", userEmail);

//   const html = `
//     <html>
//     <body>
//         This is a automatted message from the RMM Powershell Script.<br>
//         <br>
//         Script started at ${startTime}<br>
//         Script ran for ${totalTime}<br>
//         <br>
//         Number of devices script tested: ${deviceTotal}<br>
//         Number of devices that were online: ${isOnline}<br>
//         <br>
//         Number of devices that were offline: ${isOffline}<br>
//         `;
//   const isOfflineFile = fs.readFileSync("isOffline.txt", "utf-8");
//   html += isOfflineFile.split('\n').join('<br>') + `
//         <br>
//         number of devices that do not exist in the RMM: ${doesNotExist}<br>
//         `;
//   const doesNotExistFile = fs.readFileSync("doesNotExist.txt", "utf-8");
//   html += doesNotExistFile.split('\n').join('<br>') + `
//         <br>
//     </body>
//     </html>
//   `;
  
//   const part1 = new MIMEText(html, "html");

//   message.attach(part1);

//   const sendEmail = () => {
//     const context = ssl.create_default_context();
//     smtplib.connect({
//       host: "smtp.office365.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: senderEmail,
//         pass: password,
//       },
//       tls: {
//         ciphers: 'SSLv3',
//         rejectUnauthorized: false
//       }
//     })
//     .then(function (connection) {
//       connection.send({
//         from: senderEmail,
//         to: userEmail,
//         subject: "RMM Powershell Automation Results",
//         text: html,
//         attachment: [
//           {data: html, alternative: true},
//         ]
//       }, function(err, message) { 
//         console.log(err || message); 
//         connection.close();
//       });
//     })
//     .catch(console.error);
//   };

//   return (
//     <div>
//       <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
//       <button onClick={sendEmail}>Send Email</button>
//     </div>
//   );
// }



// ***********************************************************
// import React from 'react';

// const ContactForm = () => {

//   return (

//         <div className="contact-form-container">
//           {/* <div className="col-lg-8 col-xl-6 text-center">
//             <h2 className="display-4 lh-1 mb-4">Contact us</h2>
//             <p className="lead fw-normal text-muted mb-5">
//               Have questions? We have answers.
//               <br />
//               Send us a message and we will respond as soon as possible!
//             </p>
//           </div> */}
//           <div className="contact-form-context">
//             <form id="contactForm" action="https://gmail.us11.list-manage.com/subscribe/post?u=2ed66be8d0a560599234917d7&amp;id=40829336a9&amp;f_id=00e29de0f0" method="POST">
//               <div className="form-floating mb-3">
//                 <label htmlFor="name">Name</label>
//                 <input type="name" className="form-control" id="name" name="FNAME" placeholder="Your email" required />
                
//               </div>
//               <div className="contact-form-context">
//                 <input type="email" className="form-control" id="email" name="EMAIL" placeholder="Your email" required />
//                 <label htmlFor="email">Email address</label>
//               </div>
//               <div className="contact-form-context">
//                 <textarea className="form-control" id="message" name="DESCRIPT" placeholder="Your message"></textarea>
//                 <label htmlFor="message">Message</label>
//               </div>
//               {/* <div className="form-check mb-3">
//                 <input type="checkbox" className="form-check-input" id="subscribeCheck" name="subscribe" value="subscribe" />
//                 <label className="form-check-label" htmlFor="subscribeCheck">Subscribe to our newsletter</label>
//               </div> */}
//               <div className="d-grid">
//                 <button className="btn btn-primary btn-xl" type="submit">Send</button>
//               </div>
//               <a href="mailto:`{email}`?subject={subject}&body={body}">Click to Send an Email</a>
//               <p className="text-center text-muted d-block mt-3">
//                 Or email us at 
//                 <a className="nav-link me-lg-3" href="mailto:foxviewcandle@gmail.com"> foxviewcandle@gmail.com</a>
//               </p>
//             </form>
//           </div>
//         </div>



//   );
// }

// export default ContactForm;









// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
// const functions = require('firebase-functions');
// const admin = require("firebase-admin");
// const nodemailer = require('nodemailer');

// admin.initializeApp({
// serviceAccountId: 'foxview-candle@appspot.gserviceaccount.com',
// });


// // send email from foxviewcandles@gmail.com

// const gmailEmail = 'foxviewcandles@gmail.com';
// const gmailPassword = 'qmoghcbeqcuwvchv';
// const mailTransport = nodemailer.createTransport({
//     // service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: gmailEmail,
//         pass: gmailPassword,
//     },
// });

// //send email function
// exports.sendEmail = functions.https.onCall((data, context) => {
//     const mailOptions = {
//         from: gmailEmail,
//         to: data.to,
//         subject: data.subject,
//         html: data.body,
//         };

//     return mailTransport.sendMail(mailOptions).then(() => {
//         console.log('Email sent to:', data.to);
//         return {
//             message: 'Email sent',
//         };
//     });
// });



// import React, { useState } from 'react';
// import { Component } from 'react'
// import {
//   Field, FieldArray, Form, Formik
// } from 'formik';
// import axios from 'axios';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios.post('https://gmail.us11.list-manage.com/subscribe/post', formData)
//       .then(response => {
//         console.log(response);
//         alert('Form submitted successfully!');
//         setFormData({ name: '', email: '', message: '' });
//       })
//       .catch(error => {
//         console.error(error);
//         alert('Form submission failed.');
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-floating mb-3">
//         <input 
//           type="name" 
//           className="form-control" 
//           id="name" 
//           name="name" 
//           placeholder="Your name" 
//           value={formData.name} 
//           onChange={handleChange} 
//           required 
//         />
//         <label htmlFor="name">Name</label>
//       </div>
//       <div className="form-floating mb-3">
//         <input 
//           type="email" 
//           className="form-control" 
//           id="email" 
//           name="email" 
//           placeholder="Your email" 
//           value={formData.email} 
//           onChange={handleChange} 
//           required 
//         />
//         <label htmlFor="email">Email address</label>
//       </div>
//       <div className="form-floating mb-3">
//         <textarea 
//           className="form-control" 
//           id="message" 
//           name="message" 
//           placeholder="Your message" 
//           value={formData.message} 
//           onChange={handleChange} 
//         ></textarea>
//         <label htmlFor="message">Message</label>
//       </div>
//       <div className="d-grid">
//         <button className="btn btn-primary btn-lg" type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };


// import React from "react"
// import jsonp from "jsonp"
// import PropTypes from 'prop-types';

// class ContactForm extends React.Component {
//   state = {};

//   handleSubmit(evt) {
//     evt.preventDefault();
//     const { fields, action } = this.props;
//     const values = fields.map(field => {
//       return `${field.name}=${encodeURIComponent(this.state[field.name])}`;
//     }).join("&");
//     const path = `${action}&${values}`;
//     const url = path.replace('/post?', '/post-json?');
//     const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
//     const email = this.state['EMAIL'];
//     (!regex.test(email)) ? this.setState({ status: "empty" }) : this.sendData(url);
//   };

//   sendData(url) {
//     this.setState({ status: "sending" });
//     jsonp(url, { param: "c" }, (err, data) => {
//       if (data.msg.includes("already subscribed")) {
//         this.setState({ status: 'duplicate' });
//       } else if (err) {
//         this.setState({ status: 'error' });
//       } else if (data.result !== 'success') {
//         this.setState({ status: 'error' });
//       } else {
//         this.setState({ status: 'success' });
//       };
//     });
//   }

//   render() {
//     const { fields, styles, className, buttonClassName } = this.props;
//     const messages = {
//       ...Mailchimp.defaultProps.messages,
//       ...this.props.messages
//     }
//     const { status } = this.state;
//     return (
//       <form onSubmit={this.handleSubmit.bind(this)} className={className}>
//         {fields.map(input =>
//           <input
//             {...input}
//             key={input.name}
//             onChange={({ target }) => this.setState({ [input.name]: target.value })}
//             defaultValue={this.state[input.name]}
//           />
//         )}
//         <button
//           disabled={status === "sending" || status === "success"}
//           type="submit"
//           className={buttonClassName}
//         >
//           {messages.button}
//         </button>
//         <div className='msg-alert'>
//           {status === "sending" && <p style={styles.sendingMsg}>{messages.sending}</p>}
//           {status === "success" && <p style={styles.successMsg}>{messages.success}</p>}
//           {status === "duplicate" && <p style={styles.duplicateMsg}>{messages.duplicate}</p>}
//           {status === "empty" && <p style={styles.errorMsg}>{messages.empty}</p>}
//           {status === "error" && <p style={styles.errorMsg}>{messages.error}</p>}
//         </div>
//       </form>
//     );
//   }
// }

// Mailchimp.defaultProps = {
//   messages: {
//     sending: "Sending...",
//     success: "Thank you for subscribing!",
//     error: "An unexpected internal error has occurred.",
//     empty: "You must write an e-mail.",
//     duplicate: "Too many subscribe attempts for this email address",
//     button: "Subscribe!"
//   },
//   buttonClassName: "",
//   styles: {
//     sendingMsg: {
//       color: "#0652DD"
//     },
//     successMsg: {
//       color: "#009432"
//     },
//     duplicateMsg: {
//       color: "#EE5A24"
//     },
//     errorMsg: {
//       color: "#ED4C67"
//     }
//   }
// };

// Mailchimp.propTypes = {
//   action: PropTypes.string,
//   messages: PropTypes.object,
//   fields: PropTypes.array,
//   styles: PropTypes.object,
//   className: PropTypes.string,
//   buttonClassName: PropTypes.string
// };

// export default ContactForm;


// import React, { useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// // import axios from 'axios';


// import React, { useState } from "react";

// const ContactForm = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       EMAIL: email,
//       FNAME: name,
//       MESSAGE: message,
//     };

//     // Submit the formData to Mailchimp
//     fetch("https://gmail.us11.list-manage.com/subscribe/post", {
//       method: "post",
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Contact Us</h2>
//       <div className="indicates-required">
//         <span className="asterisk">*</span> indicates required
//       </div>
//       <div className="mc-field-group">
//         <label htmlFor="mce-EMAIL">
//           Email Address <span className="asterisk">*</span>
//         </label>
//         <input
//           type="email"
//           name="EMAIL"
//           id="mce-EMAIL"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <span id="mce-EMAIL-HELPERTEXT" className="helper_text" />
//       </div>
//       <div className="mc-field-group">
//         <label htmlFor="mce-FNAME">Name</label>
//         <input
//           type="text"
//           name="FNAME"
//           id="mce-FNAME"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <span id="mce-FNAME-HELPERTEXT" className="helper_text" />
//       </div>
//       <div className="mc-field-group">
//         <label htmlFor="mce-MESSAGE">Message</label>
//         <input
//           type="text"
//           name="MESSAGE"
//           id="mce-MESSAGE"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <span id="mce-MESSAGE-HELPERTEXT" className="helper_text" />
//       </div>
//       <div id="mce-responses" className="clear foot">
//         <div className="response" id="mce-error-response" style={{ display: "none" }} />
//         <div className="response" id="mce-success-response" style={{ display: "none" }} />
//       </div>
//       <div style={{ position: "absolute", left: "-5000px" }}
//         aria-hidden="true">
//         <input type="text" name="b_1a9b9e4e4d4d1e3d4c4e4f4f9_6e8d8e9c9a" tabIndex="-1" value="" />
//       </div>
//       <div className="clear foot">
//         <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
//       </div>
//     </form>
//   );
// };





// import React, { useState } from 'react';
// import { Component } from 'react'
// import {
//   Field, FieldArray, Form, Formik
// } from 'formik';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//     //send data to server here
//     fetch("https://gmail.us11.list-manage.com/subscribe/post?u=2ed66be8d0a560599234917d7&amp;id=40829336a9&amp;f_id=00e29de0f0", {
//       method: "post",
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));

    
    
      
//   };


//   return (
//      <div className="contact-form-inputs">
//     <form onSubmit={handleSubmit}>
       

//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="FNAME"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="EMAIL"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//       </div>
//       {/* <div>
//         <label htmlFor="subject">Subject:</label>
//         <input
//           type="text"
//           id="subject"
//           name="subject"
//           value={formData.subject}
//           onChange={handleInputChange}
//         />
//       </div> */}
//       <div>
//         <label htmlFor="message">Message:</label>
//         <textarea
//           id="message"
//           name="MESSAGE"
//           value={formData.message}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button type="submit">Submit</button>

//     </form></div>
//   );
// };

// export default ContactForm;












// const ContactForm = () => {
//   const [status, setStatus] = useState(null);

//   const handleSubmit = async (values, actions) => {
//     try {
//       const response = await axios.post(`https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members/`, {
//         email_address: values.email,
//         status: 'subscribed',
//         merge_fields: {
//           NAME: values.name,
//         },
//       }, {
//         auth: {
//           username: 'anything',
//           password: process.env.MAILCHIMP_API_KEY,
//         },
//       });

//       setStatus('SUCCESS');
//       actions.resetForm();
//     } catch (error) {
//       setStatus('ERROR');
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: '',
//         email: '',
//       }}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <Field type="text" name="name" placeholder="Name" />
//           <Field type="email" name="email" placeholder="Email" />
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//           {status === 'SUCCESS' && <p>You have been subscribed!</p>}
//           {status === 'ERROR' && <p>There was an error. Please try again later.</p>}
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ContactForm;

// <!-- Begin Mailchimp Signup Form -->
// <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
// <style type="text/css">
// 	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif;  width:600px;}
// 	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
// 	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
// </style>
// <div id="mc_embed_signup">
//     <form action="https://gmail.us11.list-manage.com/subscribe/post?u=2ed66be8d0a560599234917d7&amp;id=40829336a9&amp;f_id=00e29de0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
//         <div id="mc_embed_signup_scroll">
//         <h2>Contact US</h2>
//         <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
// <div class="mc-field-group">
// 	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
// </label>
// 	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
// 	<span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
// </div>
// <div class="mc-field-group">
// 	<label for="mce-FNAME">Name </label>
// 	<input type="text" value="" name="FNAME" class="" id="mce-FNAME">
// 	<span id="mce-FNAME-HELPERTEXT" class="helper_text"></span>
// </div>
// <div class="mc-field-group">
// 	<label for="mce-MESSAGE">Message </label>
// 	<input type="text" value="" name="MESSAGE" class="" id="mce-MESSAGE">
// 	<span id="mce-MESSAGE-HELPERTEXT" class="helper_text"></span>
// </div>
// 	<div id="mce-responses" class="clear foot">
// 		<div class="response" id="mce-error-response" style="display:none"></div>
// 		<div class="response" id="mce-success-response" style="display:none"></div>
// 	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
//     <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2ed66be8d0a560599234917d7_40829336a9" tabindex="-1" value=""></div>
//         <div class="optionalParent">
//             <div class="clear foot">
//                 <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
//                 <p class="brandingLogo"><a href="http://eepurl.com/ikpQtj" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p>
//             </div>
//         </div>
//     </div>
// </form>
// </div>
// <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[2]='FNAME';ftypes[2]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='MESSAGE';ftypes[1]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
// <!--End mc_embed_signup--></link>


// 5d94b760a75dbb552feaf08d9aef5fcc-us11
