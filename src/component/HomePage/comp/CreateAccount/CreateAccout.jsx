import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backend from '../../../const/backend/backend';
import Loader from '../../../externalwork/loader';
import { useGoogleLogin } from '@react-oauth/google'; // Ensure this package is installed
import { GoogleLogin } from "@react-oauth/google";
import { FaTimes } from 'react-icons/fa'; // Import close icon



export default function CreateAccount({ closeModal }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isOtpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, resendTimer]);

  const handleSendOtp = async () => {
    if (!email) {
      setMessage('Email is required to send OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backend}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        setResendTimer(10); // Reset timer
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      setMessage('An error occurred while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpSent) {
      setMessage('Please request OTP first.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backend}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, city, studentClass, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        setLoading(false);
        closeModal();
        navigate('/');
        window.location.reload();
      } else {
        setMessage(data.message || 'Signup failed.');
      }
    } catch (error) {
      setMessage('An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const response = await fetch(`${backend}/api/google-auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: authResult.code }),
        });
  
        const text = await response.text(); // Read raw response
        console.log("Raw Response:", text);
  
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${text}`);
        }
  
        let result;
        try {
          result = JSON.parse(text); // Attempt to parse JSON
          console.log("Parsed Response:", result);
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
          return;
        }
  
        if (result?.user && result?.token) {
          const { email, fullName, profilePic } = result.user;
          const token = result.token;
  
          localStorage.setItem(
            "user-info",
            JSON.stringify({ email, name: fullName, token, image: profilePic })
          );
          localStorage.setItem("token", result.token);

          window.location.reload(); // Reload to apply changes
        } else {
          console.error("Invalid response format:", result);
        }
      } else {
        console.error("Invalid authResult:", authResult);
      }
    } catch (e) {
      console.error("Error while Google Login:", e);
    }
  };
  
  // Google Login Hook
  const googleLogin1 = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.error("Google Login Error:", error),
    flow: "auth-code",
  });
  

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal container with 100px margin */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" style={{ margin: '100px auto' }}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
            {/* Close button at top right */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            
            {loading ? (
              <Loader />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Student Account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-2">
                    {/* Form fields remain the same */}
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {!isOtpSent && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Send OTP
                        </button>
                      )}
                      {isOtpSent && resendTimer === 0 && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Resend OTP
                        </button>
                      )}
                      {isOtpSent && resendTimer > 0 && (
                        <p className="text-sm orange-text mt-2">Resend available in {resendTimer}s</p>
                      )}
                    </div>
                    
                    {/* OTP */}
                    {isOtpSent && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    
                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Class */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter your class"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                  
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                    >
                      Create Account
                    </button>
                    <br />
                    <hr />
                    <br />
                    <p>OR</p>
                    <br />
                    {/* Google Login Button */}
                    <div className="text-center mb-4">
                      <button
                        onClick={googleLogin1}
                        className="w-full bg-red-500 text-white p-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                      >
                        Continue with Google
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
