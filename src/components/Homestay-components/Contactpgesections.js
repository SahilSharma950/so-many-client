import React from 'react';
import instagramblack from "../../img/instagramblack.png"
import fbblack from "../../img/fbblack.png"
import contactpick from "../../img/contactpick.webp"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

const Contactpgesections = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const axiosinstance = axios.create({ baseURL: process.env.API_URL });
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    phone: '',
    hearing: '',
    message: '',
  });
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const [alertMessage, setAlertMessage] = useState('');
// handleSubmit function in your Login component
const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosinstance.post("https://www.api.somanymornings.com/api/auth/contact", credentials);
    // Store some data in localStorage
    alert("The email was sent successfully. \n Thank you for reaching us and being part of the So Many Mornings.")
    // setAlertMessage("Form submitted successfully!");
    setTimeout(() => {
      navigate('/');
    }, 1500);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.details.data });
    // Clear localStorage after successful form submission

  } catch (err) {

    dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    setAlertMessage("Form submission failed. Please try again later.");
  }
  
};

    return <div>
   
    <section className='contapge'>
        <div className='container'>
            <div className='row'>
            <div className='col-xxl-12 col-xl-12 col-md-12 col-12'>
            <div className='exciting'>
            <h2>Connect with us</h2>
            <h3>Don’t hesitate to reach out and we’ll get back to you.</h3>
            </div>
            </div>
            </div>

            <div className='row' id='cont-row'>
            <div className='col-xxl-4 col-xl-4 col-md-3 col-12'>
              <div className='Make0'>
              <i class="fa fa-location-arrow" aria-hidden="true"></i>
              <h3 className='litre'>Follow us</h3>
              <ul class="contactsocial-icons">
          <li><a href="https://www.facebook.com/people/So-Many-Mornings/61555369394552/" class="contactsocial"><img src={fbblack} className='fbblack1' alt='' /></a></li>
            <li><a href="https://www.instagram.com/somanymornings_/" class="contactsocial"><img src={instagramblack} className='fbblack2' alt='' /></a></li>
            </ul>
            </div>
             </div>
             <div className='col-xxl-4 col-xl-4 col-md-5 col-12'>
              <div className='Make1'>
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
             <h3 className='litre'>Email us</h3>
            <p><a href='mailto:somanymornings@gmail.com'>somanymornings@gmail.com</a></p>
            </div>
                   </div>
             <div className='col-xxl-4 col-xl-4 col-md-4 col-12'>
              <div className='Make2'>
              <i class="fa fa-phone-square" aria-hidden="true"></i>
           <h3 className='litre'>Call us</h3>
             
             <p><a href='tel:+91 98789 08399'>+91 98789 08399</a></p>
            </div>
             </div>
            </div>
           
        </div>
    </section>
    <section className='formsection'>
      <div className='container'>
        <div className='row'>
          <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12' id='leftpick-img'>
            <img src={contactpick} className="contactpick" alt='' />
          </div>
          <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12'>
          <div className='cont-box'>
          <h4 className='sub-heading-style'>Make an inquiry </h4>
          <h2 className='Uniqueness'>Feel free to drop us a line </h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-md-12 col-lg-12 col-12" >
                <input type="text" name="name" placeholder="Full Name" className="reg-input" id="username" onChange={handleChange} required />
              </div>
           </div>
           <div className="row">
              <div className="col-xxl-6 col-xl-6 col-md-12 col-lg-6 col-12">
                <input type="email" name="email" placeholder="Email Address" className="reg-input" id="email" onChange={handleChange} required />
              </div>  
              <div className="col-xxl-6 col-xl-6 col-md-12 col-lg-6 col-12" >
                <input type="tel" name="phone" placeholder="Phone Number" className="reg-input" id="phone" onChange={handleChange} required />
              </div>
            </div>
            <div className="row">
                  <div className="col-xxl-12 col-xl-12 col-md-12 col-lg-12 col-12" >
                  <input type="text" name="hearing" placeholder="Where did you hear about?" className="reg-input" id="hearing" onChange={handleChange}required   />
                  <textarea
                  title="Message"
                  cols="30"
                  name='message'
                  maxlength="500" 
                  placeholder="Enter Message"
                  id="message"
                  onChange={handleChange}
                  required />
                  </div>
           </div>
           <button disabled={loading} className="register-btn">
          Submit
        </button>
         </form>
         {alertMessage && (
          <div className="alert">{alertMessage}</div>
        )}
          </div>
          </div>
        </div>
      </div>
    </section>
    </div>
}

export default Contactpgesections

