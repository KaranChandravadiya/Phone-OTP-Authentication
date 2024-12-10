import React, { useRef, useState } from "react";
import firebase from "./firebase";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
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
        showAlert('Phone OTP has been sent to your Phone.', 'warning');
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", 
        alignItems: "center",
        paddingTop: "50px",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "700" }}>
        Phone OTP Authentication
      </Typography>

      <Box
        sx={{
          height: "60px",
          width: "340px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "2px",
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
                alertSeverity === "success"
                  ? "#d4edda"
                  : alertSeverity === "warning"
                    ? "#fff3cd"
                    : "#f8d7da",
              color:
                alertSeverity === "success"
                  ? "#155724"
                  : alertSeverity === "warning"
                    ? "#856404"
                    : "#721c24",
              border: `1px solid ${alertSeverity === "success"
                  ? "#c3e6cb"
                  : alertSeverity === "warning"
                    ? "#ffeeba"
                    : "#f5c6cb"
                }`,
            }}
          >
            {alertMessage}
          </Alert>
        )}
      </Box>

      <Box ref={recaptchaRef}></Box>

      {/* Enhanced TextField */}
      <TextField
        style={{
          width: "250px",
          marginBottom: 10,
          borderRadius: "8px",
        }}
        placeholder="+91 1234567890"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "#fff",
            borderRadius: "8px",
            "&:hover": {
              borderColor: "#4CAF50",
            },
            "& input": {
              paddingLeft: "12px",
              fontWeight: "500",
            },
          },
        }}
      />

      {/* Send OTP Button with unique hover effect */}
      <Button
        style={{
          width: "110px",
          padding: "5px",
          display: "block",
          marginLeft: "148px",
          borderRadius: "25px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
        }}
        onClick={handleSendOtp}
        sx={{
          "&:hover": {
            backgroundColor: "#45a049",
            transform: "scale(1.1)",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          },
        }}
      >
        Send Otp
      </Button>
      <br />

      {verificationId && (
        <>
          <TextField
            type="text"
            style={{
              width: "250px",
              borderRadius: "8px",
              marginBottom: 10,
            }}
            placeholder="Enter OTP"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#fff",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#FF5722",
                },
                "& input": {
                  paddingLeft: "12px",
                  fontWeight: "500",
                },
              },
            }}
          />

          <Button
            style={{
              width: "110px",
              padding: "5px",
              display: "block",
              marginLeft: "148px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: "#FF5722",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
            }}
            onClick={handleVerifyOTP}
            sx={{
              "&:hover": {
                backgroundColor: "#e64a19",
                transform: "scale(1.1)",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Verify OTP
          </Button>
        </>
      )}
    </Box>
  )
}

export default App;