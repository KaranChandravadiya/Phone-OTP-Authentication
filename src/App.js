// import { Box, Button, TextField } from '@mui/material';
// import './App.css';
// import { auth } from "./firebase";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import { useState } from 'react';
// // import { RecaptchaVerifier } from 'firebase/auth/web-extension';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// function App() {
//   const [phone, setPhone] = useState("");
//   const [user, setUser] = useState(null);
//   const [otp, setOtp] = useState("");

//   const sendOtp = async () => {
//     try {
//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
//       const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
//       setUser(confirmation);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const verifyOtp = async() => {
//     try {
//       const data = await user.confirm(otp)
//       console.log(data);

//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <Box className='phoneInput'>
//       <Box className='Button'>
//         <PhoneInput
//           country={'us'}
//           value={phone}
//           onChange={(phone) => setPhone("+" + phone)}
//         />
//         <Button  onClick={sendOtp} variant='contained' sx={{ display: '' }}>Send Otp</Button>
//         <Box id="recaptcha"></Box>
//         <br />
//         <TextField onClick={(e) => setOtp(e.target.value)} sx={{}} />
//         <Button onClick={verifyOtp} >Verify Otp</Button>
//       </Box>
//     </Box>
//   );
// }

// export default App;

import React, { useRef, useState } from "react";
import firebase from "./firebase";
import { Alert, Box } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const recaptchaRef = useRef(null);

  const handleSendOtp = () => {

    if (recaptchaRef.current) {
      recaptchaRef.current.innerHTML = '<div id="recaotcha-container"></div>'
    }
    const verfier = new firebase.auth.RecaptchaVerifier("recaotcha-container", {
      size: 'invisible'
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, verfier)
      .then(confirmationResult => {
        setVerificationId(confirmationResult.verificationId);
        // alert('Phone OTP has been sent to your Phone.');
        showAlert('Phone OTP has been sent to your Phone.','warning');
      })
      .catch(error => {
        console.log("Error sending OTP:", error);
        showAlert('Failed to send OTP. Please try again.', 'error');
      })
  }

  const handleVerifyOTP = () => {
    const credentials = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    firebase.auth().signInWithCredential(credentials)
      .then(userCredentails => {
        console.log('User Logged In:', userCredentails.user);
        showAlert('OTP Verified Successfully! User logged in.', 'success');
      })
      .catch(error => {
        console.error("Error verifying OTP");
        showAlert('Failed to verify OTP. Please try again.', 'error');
      });
  }

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setTimeout(() => {
      setAlertMessage('');
    }, 5000);
  };

  return (
    <Box  sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Full viewport height
      backgroundColor: "#f5f5f5", // Light gray background for better contrast
      textAlign: "center",
      padding: "20px"
    }}>
      <h1>Phone OTP Authentication</h1>
      <Box 
      sx={{
        height: "60px", // Reserve space for the alert
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px", // Add space between the alert and inputs
      }}
    >
      {alertMessage && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={alertSeverity}
          sx={{
            marginBottom: 2,
            width: "350px",
            backgroundColor:
              alertSeverity === 'success' ? '#d4edda' : 
              alertSeverity === 'warning' ? '#fff3cd' : 
              '#f8d7da', // Green for success, yellow for warning, red for error
            color:
              alertSeverity === 'success' ? '#155724' : 
              alertSeverity === 'warning' ? '#856404' : 
              '#721c24', // Text color based on severity
            border: `1px solid ${
              alertSeverity === 'success' ? '#c3e6cb' : 
              alertSeverity === 'warning' ? '#ffeeba' : 
              '#f5c6cb'
            }`,
          }}
        >
          {alertMessage}
        </Alert>
      )}
       </Box>

      <div ref={recaptchaRef} ></div>
      <input
        style={{
          width: "250px",
          padding: "10px",
          borderRadius: "5px",
          border: "2px solid #ddd",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          marginBottom: 2,
        }}
        placeholder="+91 1234567890"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <button  style={{
      width: "120px",
      padding: "8px",
      display: "block",
      marginLeft: "150px",
      borderRadius: "25px",
      border: "none",
      backgroundColor: "#4CAF50",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
    }}onClick={handleSendOtp}>Send Otp</button>
      <br />
      {verificationId && (
        <>
      <input type="text"
        style={{
          width: "250px",
          padding: "10px",
          borderRadius: "5px",
          border: "2px solid #ddd",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          marginBottom: 2
        }}
        placeholder="Enter OTP"
        value={verificationCode}
        onChange={e => setVerificationCode(e.target.value)}
      />
      <button 
      style={{
        width: "120px",
      padding: "8px",
      display: "block",
      marginLeft: "150px",
        borderRadius: "25px",
        border: "none",
        backgroundColor: "#FF5722",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
      }}onClick={handleVerifyOTP} >Verify OTP</button>
          </>
      )}
    </Box>
  )
}

export default App;