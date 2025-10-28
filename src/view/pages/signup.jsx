"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiImage,
  FiArrowLeft,
  FiCheck,
  FiShield,
  FiHeart,
  FiZap,
} from "react-icons/fi"
import "../../styles/Auth.css"
import { signupUser } from "../../firebase/function/insert/signupUser"
import { LoadingSpinner } from "../../view/component/loading"

const Signup = () => {
  const [loading, setBtnloading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImageUrl: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const steps = [
    { id: 1, title: "Personal Info", description: "Tell us about yourself" },
    { id: 2, title: "Account Setup", description: "Create your secure account" },
  ]

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (formData.profileImageUrl && !isValidUrl(formData.profileImageUrl)) {
      newErrors.profileImageUrl = "Please enter a valid image URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Please agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep2()) return

    await signupUser(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profileImageUrl: formData.profileImageUrl,
      },
      setBtnloading,
    )

    // Reset form
    setFormData({
      name: "",
      email: "",
      profileImageUrl: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    })
    setCurrentStep(1)
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

          <h1 className="branding-title">Join the PetCare AI Family</h1>
          <p className="branding-subtitle">
            Start your journey of providing exceptional care for your pets with the power of artificial intelligence.
          </p>

          <div className="branding-features">
            <div className="branding-feature">
              <div className="branding-feature-icon">
                <FiHeart />
              </div>
              <div className="branding-feature-text">
                <h4>Free to Start</h4>
                <p>No credit card required to begin</p>
              </div>
            </div>

            <div className="branding-feature">
              <div className="branding-feature-icon">
                <FiShield />
              </div>
              <div className="branding-feature-text">
                <h4>Secure & Private</h4>
                <p>Your data is protected and encrypted</p>
              </div>
            </div>

            <div className="branding-feature">
              <div className="branding-feature-icon">
                <FiZap />
              </div>
              <div className="branding-feature-text">
                <h4>Instant Setup</h4>
                <p>Get started in just a few minutes</p>
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join thousands of pet parents who trust PetCare AI</p>
          </div>

          {/* Progress Steps */}
          <div className="signup-progress">
            <div className="progress-steps">
              {steps.map((step) => (
                <div key={step.id} className={`progress-step ${currentStep >= step.id ? "active" : ""}`}>
                  <div className="step-number">{currentStep > step.id ? <FiCheck /> : step.id}</div>
                  <div className="step-info">
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="form-step">
                <div className="step-header">
                  <h3>Personal Information</h3>
                  <p>Let's get to know you better</p>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "error" : ""}
                    />
                  </div>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="profileImageUrl">Profile Picture URL (Optional)</label>
                  <div className="input-wrapper">
                    <input
                      type="url"
                      id="profileImageUrl"
                      name="profileImageUrl"
                      placeholder="https://example.com/your-photo.jpg"
                      value={formData.profileImageUrl}
                      onChange={handleInputChange}
                      className={errors.profileImageUrl ? "error" : ""}
                    />
                  </div>
                  {errors.profileImageUrl && <span className="error-message">{errors.profileImageUrl}</span>}
                </div>

                {formData.profileImageUrl && (
                  <div className="profile-preview-container">
                    <img
                      src={formData.profileImageUrl || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="profile-preview"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/150?text=Invalid+URL"
                      }}
                    />
                  </div>
                )}
				<br />
                <button type="button" className="next-btn" onClick={handleNextStep}>
                  Continue
                  <FiArrowLeft style={{ transform: "rotate(180deg)" }} />
                </button>
              </div>
            )}

            {/* Step 2: Account Setup */}
            {currentStep === 2 && (
              <div className="form-step">
                <div className="step-header">
                  <h3>Account Security</h3>
                  <p>Create a secure password for your account</p>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "error" : ""}
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? "error" : ""}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-group">
                  <label className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">
                      I agree to the{" "}
                      <Link to="/terms" className="terms-link">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="terms-link">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                </div>

                <div className="form-buttons">
                  <button type="button" className="prev-btn" onClick={handlePrevStep}>
                    <FiArrowLeft />
                    Back
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? <LoadingSpinner loading={loading} /> : "Create Account"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
