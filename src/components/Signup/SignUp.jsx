import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { baseurl } from "../utils/constant";

const SignUp = () => {


  const [open, setOpen] = React.useState(false);
  const [meassage,setMessage] = useState("")


  const [isSubmitting, setIsSubmitting] = useState(true);

  const [name, setName] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [conformpasswordValid, setConformPasswordValid] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numbervalidate,setNumberValidate] = useState("")
  const navigate = useNavigate();




  useEffect(() => {
    const errors = {};

    // Check if email is valid
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Check if password is valid
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    // Check if confirm password matches
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Check if phone number is valid (contains only numbers)
    if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number should contain only numbers.";
    }

  }, [email, password, confirmPassword, phoneNumber]);

  const handleFormSubmit = () => {
    const errors = {};

    // Check if email is valid
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Check if password is valid
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    // Check if confirm password matches
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Check if phone number is valid (contains only numbers)
    if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number should contain only numbers.";
    }

    // Update the formErrors state
 
    // If there are no errors, proceed to OTP section

    const payload ={
      name:name,
      email:email,
      password:password,
      phone_number:phoneNumber
  }
  setIsSubmitting(false)
  onSubmit(payload)

  };

  const onSubmit = (values) =>{
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(values);

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(`${baseurl.url}/auth/register`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        console.log(res)
        if(res?.status===200){
          navigate('/')
          setOpen(true)

          setMessage(res.message)
        }else{
          console.log("aaaaaaaa")
          setOpen(true)
          setMessage(res.message)
          setIsSubmitting(true)
        }
      })
  
    } catch (error) {
      console.log("Error:", error);
      setIsSubmitting(true)
    }

  }



  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="SignUp__container">
      {/* <img className="logo-img-top" src={Logo} alt="logo" /> */}

      <div className="SignUp__second__section">
        <h1>Sign up!</h1>
        <h5>See your growth and get consulting support!</h5>

        <hr />
        { (
          <>
            <input
              type="text"
              placeholder="Name"
              className="signup-input-cred signup-text-cred"
              value={name}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                if(!value) {
                  setNameValid("Name is required")
                 }
      
                 else {
                  setNameValid('')
                 };
              }}
              
            />
            { nameValid && (
              <p className={"error-message"} style={{marginBottom:"-36px"}}>{nameValid}</p>
              )}
            <input
              type="email"
              placeholder="Email"
              className="signup-input-cred signup-text-cred"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                if(!value) {
                  setEmailValid("email is required")
                 }
                 else  if(!new RegExp(/^[^\s@]+@[^\s@]+(\.[^ !."`'#%&,:;<>=@{}~\$\(\)\*\+_\/\\\?\[\]\^\|]{2,4})$/).test(value)) {
                  setEmailValid("enter a valid email")
                 }
                 else {
                  setEmailValid(true)
                 };
              }}
              
            />
             { emailValid && (
              <p className={"error-message"} style={{marginBottom:"-36px"}}>{emailValid}</p>
              )}

            <input
              type="password"
              placeholder="Password"
              className="signup-input-cred"
              value={password}
                onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                if(!value) {
                  setPasswordValid("pasword is required")
                 }
               
                 else {
                  setPasswordValid(true)
                 };
              }}
            />
             { passwordValid && (
              <p className={"error-message"} style={{marginBottom:"-36px"}}>{passwordValid}</p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              className="signup-input-cred"
              value={confirmPassword}
              disabled={passwordValid ===true ? false : true}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              // onBlur={() => handleInputBlur("confirmPassword")}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);
                if(value !== password) {
                  setConformPasswordValid("Passwords do not match.")
                 }
                 else {
                  setConformPasswordValid(true)
                 };
              }}
            />
             { conformpasswordValid && (
              <p className={"error-message"} style={{marginBottom:"-36px"}}>{conformpasswordValid}</p>
            )}

            <input
              type="tel"
              placeholder="Phone Number"
              className="signup-input-cred signup-pass-cred"
              value={phoneNumber}
              // onChange={(e) => setPhoneNumber(e.target.value)}
              // onBlur={() => handleInputBlur("phoneNumber")}
              onChange={(e) => {
                const value = e.target.value;
                setPhoneNumber(value);
                if(!new RegExp(/^[+]?\d{10,15}$/).test(value)) {
                  setNumberValidate("invalid number")
                 }
                 else {
                  setNumberValidate(true)
                 };
              }}
            />
            { numbervalidate && (
              <p className={"error-message"} style={{marginBottom:"-36px"}}>{numbervalidate}</p>
            )}
<button
            className="font-bold py-3 px-6 rounded-xl border-2 text-[#ffce00] border-[#ffce00] cursor-pointer hover:bg-[#ffce00] hover:text-black"
            disabled={email!== "" && password!=="" && emailValid===true && passwordValid===true  && conformpasswordValid===true && numbervalidate===true && isSubmitting? false : true}
            onClick={handleFormSubmit}
           >
           
            <h3>Sign Up</h3>
          </button>
           
          </>
        )}
        

        <a className="create__an_account" href="/">
          Back to Login
        </a>
    
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={meassage}
        action={action}
      />
    </div>
  );
};

export default SignUp;
