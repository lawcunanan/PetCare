import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowRight, FiHeart, FiShield, FiZap, FiStar, FiPlay, FiCheck } from "react-icons/fi"
import "../../styles/Home.css"
import PetLottie from "../component/petLottie"

const Home = () => {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const features = [
    {
      icon: FiHeart,
      title: "AI Health Diagnosis",
      description: "Get instant health assessments for your pets using advanced AI technology",
    },
    {
      icon: FiShield,
      title: "24/7 Pet Care Support",
      description: "Round-the-clock assistance for all your pet care questions and concerns",
    },
    {
      icon: FiZap,
      title: "Instant Recommendations",
      description: "Receive personalized care tips and treatment suggestions in real-time",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Dog Owner",
      content: "PetCare AI helped me identify my dog's skin condition early. The recommendations were spot-on!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Mike Chen",
      role: "Cat Parent",
      content: "Amazing service! The AI diagnosed my cat's behavioral issues and provided excellent solutions.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      role: "Pet Enthusiast",
      content: "The best pet care app I've ever used. Saved me multiple vet visits with accurate assessments.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ]

  const stats = [
    { number: "10K+", label: "Happy Pet Parents" },
    { number: "50K+", label: "Health Assessments" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">🐾</div>
            <span className="brand-text">PetCare AI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#testimonials">Reviews</a>
            <button className="nav-btn secondary" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="nav-btn primary" onClick={() => navigate("/signup")}>
              Get Started
            </button>
          </div>
          <div className="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FiStar className="badge-icon" />
              <span>Trusted by 10,000+ Pet Parents</span>
            </div>
            <h1 className="hero-title">
              Your Pet's Health,
              <span className="gradient-text"> Powered by AI</span>
            </h1>
            <p className="hero-description">
              Get instant, accurate health assessments for your furry friends. Our advanced AI technology provides
              personalized care recommendations, helping you keep your pets happy and healthy.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary large" onClick={() => navigate("/signup")}>
                Start Free Assessment
                <FiArrowRight className="btn-icon" />
              </button>
              <button className="btn-secondary large">
                <FiPlay className="btn-icon" />
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="lottie-container">
              <PetLottie />
            </div>
            <div className="floating-cards">
              <div className="floating-card card-1">
                <FiHeart className="card-icon" />
                <span>Health Check</span>
              </div>
              <div className="floating-card card-2">
                <FiShield className="card-icon" />
                <span>AI Diagnosis</span>
              </div>
              <div className="floating-card card-3">
                <FiZap className="card-icon" />
                <span>Instant Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose PetCare AI?</h2>
            <p className="section-description">
              Advanced AI technology meets compassionate pet care to deliver the best experience for you and your pets.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-link">
                    Learn More <FiArrowRight />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">Get started with PetCare AI in just three simple steps</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Register Your Pet</h3>
                <p>Add your pet's basic information and health history to create a personalized profile.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Describe Symptoms</h3>
                <p>Tell our AI about your pet's symptoms or upload photos for visual assessment.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Get Recommendations</h3>
                <p>Receive instant, personalized care recommendations and know when to see a vet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Pet Parents Say</h2>
            <p className="section-description">Join thousands of satisfied pet parents who trust PetCare AI</p>
          </div>
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FiStar key={i} className="star filled" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonials[currentTestimonial].content}"</p>
                <div className="testimonial-author">
                  <img
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <div className="author-name">{testimonials[currentTestimonial].name}</div>
                    <div className="author-role">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? "active" : ""}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Give Your Pet the Best Care?</h2>
            <p className="cta-description">
              Join thousands of pet parents who trust PetCare AI for their furry friends' health and happiness.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary large" onClick={() => navigate("/signup")}>
                Get Started Free
                <FiArrowRight className="btn-icon" />
              </button>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <FiCheck className="check-icon" />
                <span>Free to start</span>
              </div>
              <div className="cta-feature">
                <FiCheck className="check-icon" />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <FiCheck className="check-icon" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-icon">🐾</div>
              <span className="brand-text">PetCare AI</span>
              <p className="footer-description">
                Empowering pet parents with AI-driven health insights and personalized care recommendations.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#demo">Demo</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 PetCare AI. Created by Lawrence Cunanan & Jolo Tadeo - PTECH Labs</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
