// Contact page functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Validate form
      if (validateContactForm(data)) {
        // Show loading state
        const submitBtn = this.querySelector(".submit-btn")
        const originalText = submitBtn.textContent
        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        // Simulate form submission (in real implementation, this would send to server)
        setTimeout(() => {
          showFormMessage("success", "Thank you! Your message has been sent successfully. We will contact you soon.")
          this.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 2000)
      }
    })
  }

  function validateContactForm(data) {
    const errors = []

    // Validate required fields
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Please enter a valid name (at least 2 characters)")
    }

    if (!data.phone || data.phone.trim().length < 10) {
      errors.push("Please enter a valid phone number")
    }

    if (!data.service) {
      errors.push("Please select a service")
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.push("Please provide project details (at least 10 characters)")
    }

    // Validate email if provided
    if (data.email && data.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        errors.push("Please enter a valid email address")
      }
    }

    // Validate phone format (basic validation for Moroccan numbers)
    const phoneRegex = /^(\+212|0)[5-7][0-9]{8}$/
    if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
      // Show warning but don't prevent submission
      console.warn("Phone number format may not be standard Moroccan format")
    }

    if (errors.length > 0) {
      showFormMessage("error", errors.join("<br>"))
      return false
    }

    return true
  }

  function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Create new message
    const messageDiv = document.createElement("div")
    messageDiv.className = `form-message ${type}`
    messageDiv.innerHTML = message

    // Insert message at the top of the form
    const form = document.getElementById("contactForm")
    form.insertBefore(messageDiv, form.firstChild)

    // Auto-remove success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        messageDiv.remove()
      }, 5000)
    }

    // Scroll to message
    messageDiv.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  // Real-time phone number formatting
  const phoneInput = document.getElementById("phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")

      // Format Moroccan phone numbers
      if (value.startsWith("212")) {
        value = "+" + value
      } else if (value.startsWith("0")) {
        // Keep as is for local format
      } else if (value.length > 0) {
        value = "0" + value
      }

      e.target.value = value
    })
  }

  // Auto-resize textarea
  const messageTextarea = document.getElementById("message")
  if (messageTextarea) {
    messageTextarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = this.scrollHeight + "px"
    })
  }

  // Service selection helper
  const serviceSelect = document.getElementById("service")
  if (serviceSelect) {
    serviceSelect.addEventListener("change", function () {
      const messageTextarea = document.getElementById("message")
      const selectedService = this.options[this.selectedIndex].text

      if (this.value && messageTextarea.value.trim() === "") {
        let placeholder = ""
        switch (this.value) {
          case "marble":
            placeholder = "Please describe your marble project: area size, preferred marble type, location, timeline..."
            break
          case "zellige":
            placeholder =
              "Please describe your Zellige project: area to be covered, preferred patterns/colors, location, timeline..."
            break
          case "mosaic":
            placeholder = "Please describe your mosaic project: design preferences, area size, location, timeline..."
            break
          case "consultation":
            placeholder =
              "Please describe what kind of design consultation you need: project type, budget range, timeline..."
            break
          case "bulk":
            placeholder =
              "Please describe your development project: number of units, materials needed, timeline, location..."
            break
        }
        messageTextarea.placeholder = placeholder
      }
    })
  }
})
