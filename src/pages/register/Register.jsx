// Register.js
import { useState, useContext , useEffect } from "react";
import Footer1 from "../../components/footer/Footer";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import { Link , useNavigate} from 'react-router-dom'
import Homeheader from "../../components/navbar/Homeheader";
import TransparentNavbar from "../../components/navbar/Navbar";


const Register = () => {
  const backgroundImg = '/assets/img//bg/inrbnr.webp'; 
  const pageTitle = 'Register'; 
  const pageSubheading = 'Discover the exciting adventures that await you.'; 
  const axiosinstance = axios.create({ baseURL: process.env.API_URL });

  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    email: "",
  });

  // localStorage.setItem("user", JSON.stringify(user));
  const [errorMessage, setErrorMessage] = useState(null); // Add state for error message
  const [successMessage, setSuccessMessage] = useState(null); // Add state for success message

  const { loading, error, dispatch } = useContext(AuthContext);

  function validateEmail(email)
 {
    let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    return (typeof (email)
 != "string" || regex.test(email)) ? true : false
  }

  function validPassword(password) {
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return (typeof (password) != "string" || regex.test(password)) ? true : false
  }

  function isValidMobile(phone) {
    let regex = /^[6-9][0-9]{9}$/
    return (typeof (phone) != "string" || regex.test(phone)) ? true : false
  }

  const handleChange = (e) => {
    if(e.target.id === "username") {
      setUser((prev) => ({ ...prev, [e.target.id]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) }));
    } else {
      setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault();

    if (String(user.phone).length !== 10 || !isValidMobile(user.phone)) { return alert("Please provide a valid 10-digit phone number starting with a digit between 6 and 9.") }
    if (!validateEmail(user.email)) { return alert("Please enter valid Email !") }
    if (!validPassword(user.password)) { return alert("Please enter valid Password that must contain 8 to 20 char with uppercase, lowercase, special character and number!") }

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axiosinstance.post("https://www.api.somanymornings.com/api/auth/register", user);
      setSuccessMessage("Thank you for registering with us"); // Set success message
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.details.data });
    } catch (err) {
      console.log(err); // Log the error object to the console for debugging

      if (err.response && err.response.status === 409) {
        // Show error message from backend
        setErrorMessage(err.response.data.message);
      } else {
        // Handle other errors
        const errorMessage = err.response ? err.response.data : "An error occurred";
        dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      }
    }
  };
  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        window.location.reload();
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(e);
    }
  };
    // Render the error message if it exists
    const renderErrorMessage = () => {
      if (errorMessage) {
        return (
          <div className="error-message">{errorMessage}</div>
        );
      }
      return null;
    };
  return (
    <>
    <TransparentNavbar />
{/* <Homeheader /> */}
      <Breadcrumb backgroundImg={backgroundImg}
       title={pageTitle} 
       subheading={pageSubheading}
        />
        <section className="register-page">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12 col-lg-12 col-md-12 col-12">
                <div className="register-form">
                <form onSubmit={handleClick}>
                   <h3 className="Welcome">Welcome to So Many Mornings</h3>
                   <div className="row">
                    <div className="col-xxl-6 col-lg-6 col-md-6 col-12" id="left-form">
                   <input type="text" placeholder="Username" id="username" onChange={handleChange} className="uInput"/>
                   <input type="email" placeholder="Email" id="email" onChange={handleChange}className="rInput1"/>
                   <input type="text" placeholder="city" id="city" onChange={handleChange}className="rInput"/>
                   </div>
                   <div className="col-xxl-6 col-lg-6 col-md-6 col-12" id="left-form">
                   <input type="password" placeholder="password" id="password" onChange={handleChange}className="rInput"/>
                   <input type="tel" placeholder="Phone" id="phone" onChange={handleChange} />
                   <input type="text" placeholder="country" id="country" onChange={handleChange}className="rInput"/>
                   </div>
                   <div className="col-xxl-12 col-lg-12 col-md-12 col-12" id="left-form">
                   <p className="agree">I agree to all the <span><a href="/Terms-conditions">Terms</a></span> and <span><a href="/privacy-policy">Privacy Policy</a></span></p>
                   <button disabled={loading} onKeyDown={handleKeyDown} className="register-btn">Register</button>
                   {/* {error && <span>{error.message}</span>} */}
                   <span>{renderErrorMessage()}</span>
                   {successMessage && <div className="success-message">{successMessage}</div>}
                   </div>
                   <div className="already">
                   <p>Already have an account?<Link to={`/login`} className="login-link"> login</Link></p>
                   </div>
                   </div>
                   </form>
                 </div>
                 
              </div>
            </div>
          </div>
        </section>
        <Footer1 />
    </>
  );
};

export default Register;