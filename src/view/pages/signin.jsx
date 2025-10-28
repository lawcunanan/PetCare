"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowLeft, FiShield, FiHeart, FiZap } from "react-icons/fi"
import "../../styles/Auth.css"
import { LoadingSpinner } from "../component/loading"
import { signEmailPass } from "../../firebase/function/insert/signinEmailPass"
import { signinGoogle } from "../../firebase/function/insert/signinGoogle"

const Signin = () => {
  const [loading, setBtnloading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setBtnloading(true)
    try {
      await signEmailPass(email, password, setBtnloading)
    } catch (error) {
      alert(error.message)
      setBtnloading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setBtnloading(true)
    try {
      await signinGoogle(setBtnloading)
    } catch (error) {
      alert(error.message)
      setBtnloading(false)
    }
  }

  return (
    <div className="auth-page">
      {/* Left Side - Branding */}
      <div className="auth-branding">
        <div className="floating-pets">
          <div className="floating-pet pet-1">🐕</div>
          <div className="floating-pet pet-2">🐱</div>
          <div className="floating-pet pet-3">🐾</div>
          <div className="floating-pet pet-4">❤️</div>
        </div>

        <div className="branding-content">
          <div className="branding-logo">
            <div className="branding-logo-icon">🐾</div>
            <span className="branding-logo-text">PetCare AI</span>
          </div>

          <h1 className="branding-title">Welcome Back to PetCare AI</h1>
          <p className="branding-subtitle">
            Continue your journey of providing the best care for your furry friends with AI-powered insights.
          </p>

          <div className="branding-features">
            <div className="branding-feature">
              <div className="branding-feature-icon">
                <FiHeart />
              </div>
              <div className="branding-feature-text">
                <h4>AI Health Diagnosis</h4>
                <p>Instant health assessments for your pets</p>
              </div>
            </div>

            <div className="branding-feature">
              <div className="branding-feature-icon">
                <FiShield />
              </div>
              <div className="branding-feature-text">
                <h4>24/7 Pet Support</h4>
                <p>Always here when you need us most</p>
              </div>
            </div>

            <div className="branding-feature">
              <div className="branding-feature-icon">
                <FiZap />
              </div>
              <div className="branding-feature-text">
                <h4>Instant Care Tips</h4>
                <p>Personalized recommendations in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-side">
        <Link to="/" className="back-button">
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Enter your credentials to access your PetCare AI dashboard</p>
          </div>

          <button className="google-signin-btn" onClick={handleGoogleSignIn} disabled={loading}>
            <div className="google-icon">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
            </div>
            <span>{loading ? <LoadingSpinner loading={loading} /> : "Continue with Google"}</span>
          </button>

          <div className="divider">
            <span>or sign in with email</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: "" })
                  }}
                  className={errors.email ? "error" : ""}
                  disabled={loading}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: "" })
                  }}
                  className={errors.password ? "error" : ""}
                  disabled={loading}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <LoadingSpinner loading={loading} /> : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              New to PetCare AI?{" "}
              <Link to="/signup" className="auth-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
