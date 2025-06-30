// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements with animation attributes
  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el)
  })

  // Service cards animation on home page
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 200)
  })

  // Service sections animation on services page
  const serviceSections = document.querySelectorAll(".service-section")
  serviceSections.forEach((section, index) => {
    setTimeout(() => {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }, index * 300)
  })

  // Lazy loading for images
  const images = document.querySelectorAll('img[src*="placeholder.svg"]')
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s ease"

        setTimeout(() => {
          img.style.opacity = "1"
        }, 100)

        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Form validation helper
  function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#e74c3c"
        isValid = false
      } else {
        field.style.borderColor = "#D4AF37"
      }
    })

    return isValid
  }

  // Add form validation to all forms
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault()
        alert("Please fill in all required fields.")
      }
    })

    // Real-time validation
    const inputs = form.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && !this.value.trim()) {
          this.style.borderColor = "#e74c3c"
        } else {
          this.style.borderColor = "#D4AF37"
        }
      })
    })
  })

  // Parallax effect for hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      const heroImage = hero.querySelector(".hero-image")
      if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`
      }
    })
  }

  // Loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Smooth reveal animation for elements
function revealElements() {
  const elements = document.querySelectorAll(".service-card, .service-section, .gallery-item")
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Call reveal function when DOM is loaded
document.addEventListener("DOMContentLoaded", revealElements)
