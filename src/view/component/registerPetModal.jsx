"use client"

import { useEffect, useState } from "react"
import "../../styles/RegisterPetModal.css"
import { LoadingSpinner } from "../component/loading"
import { addPet } from "../../firebase/function/insert/addPet"
import { useUser } from "../../context/userContext"
import { useChat } from "../../context/chatContext"
import updatePet from "../../firebase/function/update/updatePet"
import { FiX, FiPlus, FiTrash2, FiUser, FiHeart, FiCamera, FiInfo } from "react-icons/fi"

const RegisterPetModal = ({ show, handleClose, mode = "register" }) => {
  const { userDetails } = useUser()
  const { petDetails } = useChat()
  const [loading, setBtnloading] = useState(false)
  const [breeds, setBreeds] = useState([])
  const [loadingBreeds, setLoadingBreeds] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [petData, setPetData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    weight: "",
    age: "",
    profileImage: "",
    healthIssues: [],
  })

  const [healthIssue, setHealthIssue] = useState({
    type: "",
    description: "",
  })

  const steps = [
    { id: 1, title: "Basic Info", icon: FiUser },
    { id: 2, title: "Health Info", icon: FiHeart },
  ]

  const handlePetChange = (e) => {
    const { name, value } = e.target

    if (name === "species") {
      setPetData({ ...petData, [name]: value, breed: "" })
      fetchBreeds(value)
    } else {
      setPetData({ ...petData, [name]: value })
    }
  }

  const fetchBreeds = async (species) => {
    if (!species) return

    setLoadingBreeds(true)
    try {
      if (species === "Cat") {
        const response = await fetch("https://api.thecatapi.com/v1/breeds", {
          headers: {
            "x-api-key": "live_5clqZLSR6tLNjb8HeraGxd6mtRu71aE4d3OdPa56iNgc0F3Mnc5ArOG3UrLTd4sm",
          },
        })
        const data = await response.json()
        setBreeds(data.map((breed) => ({ id: breed.id, name: breed.name })))
      } else if (species === "Dog") {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        const dogBreeds = Object.keys(data.message).map((breed) => ({
          id: breed,
          name: breed.charAt(0).toUpperCase() + breed.slice(1),
        }))
        setBreeds(dogBreeds)
      }
    } catch (error) {
      console.error("Error fetching breeds:", error)
      setBreeds([])
    } finally {
      setLoadingBreeds(false)
    }
  }

  const handleIssueChange = (e) => {
    setHealthIssue({ ...healthIssue, [e.target.name]: e.target.value })
  }

  const addHealthIssue = () => {
    if (!healthIssue.type.trim()) return
    setPetData({
      ...petData,
      healthIssues: [...petData.healthIssues, { ...healthIssue }],
    })
    setHealthIssue({ type: "", description: "" })
  }

  const removeHealthIssue = (index) => {
    const newIssues = petData.healthIssues.filter((_, i) => i !== index)
    setPetData({ ...petData, healthIssues: newIssues })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (mode === "register") {
      await addPet(userDetails.uid, petData, setBtnloading)
    } else {
      await updatePet(petData.id, petData, petData.chatHistory, setBtnloading)
    }

    setPetData({
      name: "",
      species: "",
      breed: "",
      gender: "",
      weight: "",
      age: "",
      profileImage: "",
      healthIssues: [],
    })
    setCurrentStep(1)
    handleClose()
  }

  const nextStep = (e) => {
    e.preventDefault() // Prevent form submission
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = (e) => {
    e.preventDefault() // Prevent form submission
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStep1Valid = () => {
    return petData.name && petData.species && petData.gender
  }

  useEffect(() => {
    if (show) {
      // Reset form when modal opens for register mode
      if (mode === "register") {
        setPetData({
          name: "",
          species: "",
          breed: "",
          gender: "",
          weight: "",
          age: "",
          profileImage: "",
          healthIssues: [],
        })
        setCurrentStep(1)
        setBreeds([])
      } else if (petDetails && mode === "edit") {
        setPetData(petDetails)
        if (petDetails.species) {
          fetchBreeds(petDetails.species)
        }
      }
    }
  }, [show, mode, petDetails])

  if (!show) return null

  return (
    <div className="register-pet modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2>{mode === "edit" ? "Edit Pet Profile" : "Register New Pet"}</h2>
            <p className="header-subtitle">
              {mode === "edit"
                ? "Update your pet's information"
                : "Add your furry friend to get personalized care advice"}
            </p>
          </div>
          <button className="close-btn" onClick={handleClose}>
            <FiX />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="progress-container">
          <div className="progress-steps">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`step ${currentStep >= step.id ? "active" : ""} ${
                    currentStep === step.id ? "current" : ""
                  }`}
                >
                  <div className="step-icon">
                    <Icon />
                  </div>
                  <span className="step-title">{step.title}</span>
                </div>
              )
            })}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="step-header">
                <FiUser className="step-header-icon" />
                <div>
                  <h3>Basic Information</h3>
                  <p>Tell us about your pet's basic details</p>
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="image-upload-section">
                <div className="image-upload-container">
                  {petData.profileImage ? (
                    <div className="image-preview-large">
                      <img
                        src={petData.profileImage || "/placeholder.svg"}
                        alt="Pet preview"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "https://via.placeholder.com/150?text=Invalid+URL"
                        }}
                      />
                      <div className="image-overlay">
                        <FiCamera />
                      </div>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <FiCamera />
                      <span>Add Photo</span>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="profileImage">Profile Image URL</label>
                  <input
                    type="url"
                    id="profileImage"
                    name="profileImage"
                    placeholder="https://example.com/pet-photo.jpg"
                    value={petData.profileImage}
                    onChange={handlePetChange}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Pet Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="What's your pet's name?"
                    value={petData.name}
                    onChange={handlePetChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="species">Species *</label>
                  <div className="species-selector">
                    <div
                      className={`species-option ${petData.species === "Dog" ? "selected" : ""}`}
                      onClick={() => handlePetChange({ target: { name: "species", value: "Dog" } })}
                    >
                      <span className="species-emoji">🐕</span>
                      <span>Dog</span>
                    </div>
                    <div
                      className={`species-option ${petData.species === "Cat" ? "selected" : ""}`}
                      onClick={() => handlePetChange({ target: { name: "species", value: "Cat" } })}
                    >
                      <span className="species-emoji">🐱</span>
                      <span>Cat</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="breed">Breed</label>
                  <select
                    id="breed"
                    name="breed"
                    value={petData.breed}
                    onChange={handlePetChange}
                    disabled={!petData.species || loadingBreeds}
                  >
                    <option value="">
                      {loadingBreeds
                        ? "Loading breeds..."
                        : petData.species
                          ? `Select ${petData.species} Breed`
                          : "Select species first"}
                    </option>
                    {breeds.map((breed) => (
                      <option key={breed.id} value={breed.name}>
                        {breed.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <div className="gender-selector">
                    <div
                      className={`gender-option ${petData.gender === "Male" ? "selected" : ""}`}
                      onClick={() => handlePetChange({ target: { name: "gender", value: "Male" } })}
                    >
                      <span className="gender-icon">♂</span>
                      <span>Male</span>
                    </div>
                    <div
                      className={`gender-option ${petData.gender === "Female" ? "selected" : ""}`}
                      onClick={() => handlePetChange({ target: { name: "gender", value: "Female" } })}
                    >
                      <span className="gender-icon">♀</span>
                      <span>Female</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    placeholder="e.g., 2 years, 6 months"
                    value={petData.age}
                    onChange={handlePetChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Enter weight"
                    value={petData.weight}
                    onChange={handlePetChange}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Health Information */}
          {currentStep === 2 && (
            <div className="step-content">
              <div className="step-header">
                <FiHeart className="step-header-icon" />
                <div>
                  <h3>Health Information</h3>
                  <p>Help us understand your pet's health needs</p>
                </div>
              </div>

              <div className="health-form-container">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="issueType">Health Issue Type</label>
                    <input
                      type="text"
                      id="issueType"
                      name="type"
                      placeholder="e.g., Allergy, Chronic condition, Surgery"
                      value={healthIssue.type}
                      onChange={handleIssueChange}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="issueDescription">Description</label>
                    <textarea
                      id="issueDescription"
                      name="description"
                      placeholder="Provide details about the health issue, symptoms, treatments, etc."
                      value={healthIssue.description}
                      onChange={handleIssueChange}
                      rows={3}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="add-issue-btn"
                  onClick={addHealthIssue}
                  disabled={!healthIssue.type.trim()}
                >
                  <FiPlus /> Add Health Issue
                </button>

                {petData.healthIssues.length > 0 && (
                  <div className="health-issues-container">
                    <div className="health-issues-header">
                      <FiInfo />
                      <h4>Health Issues ({petData.healthIssues.length})</h4>
                    </div>
                    <div className="issue-cards">
                      {petData.healthIssues.map((issue, index) => (
                        <div key={index} className="issue-card">
                          <div className="issue-content">
                            <h5 className="issue-type">{issue.type}</h5>
                            <p className="issue-description">{issue.description}</p>
                          </div>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeHealthIssue(index)}
                            aria-label="Remove issue"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {petData.healthIssues.length === 0 && (
                  <div className="empty-state">
                    <FiHeart className="empty-icon" />
                    <p>No health issues added yet</p>
                    <span>Add any known health conditions to get better care recommendations</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="modal-footer">
            <div className="footer-buttons">
              {currentStep > 1 && (
                <button type="button" className="prev-btn" onClick={prevStep}>
                  Previous
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  type="button"  // This should prevent form submission
                  className="next-btn"
                  onClick={nextStep}
                  disabled={currentStep === 1 && !isStep1Valid()}
                >
                  Next Step
                </button>
              ) : (
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <LoadingSpinner loading={loading} />
                  ) : (
                    <>{mode === "edit" ? "Update Pet" : "Register Pet"}</>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPetModal
