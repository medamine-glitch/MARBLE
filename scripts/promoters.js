// Promoters page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Download brochure functionality
  window.downloadBrochure = () => {
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = "#" // In a real implementation, this would be the actual PDF URL
    link.download = "Marbre-Artisan-Developer-Brochure.pdf"

    // Simulate download (in real implementation, this would download the actual file)
    alert("Brochure download would start here. In a real implementation, this would download the actual PDF file.")

    // For demonstration, we'll show a success message
    const button = document.querySelector(".download-btn")
    const originalText = button.innerHTML
    button.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/></svg> Downloaded!'
    button.style.background = "#27ae60"

    setTimeout(() => {
      button.innerHTML = originalText
      button.style.background = ""
    }, 2000)
  }

  // Animate statistics on scroll
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number")
          statNumbers.forEach((stat) => {
            const finalValue = stat.textContent
            const isPercentage = finalValue.includes("%")
            const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))

            let currentValue = 0
            const increment = numericValue / 50 // Animate over 50 steps

            const timer = setInterval(() => {
              currentValue += increment
              if (currentValue >= numericValue) {
                stat.textContent = finalValue
                clearInterval(timer)
              } else {
                stat.textContent = Math.floor(currentValue) + (isPercentage ? "%" : "+")
              }
            }, 30)
          })
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsOverlay = document.querySelector(".stats-overlay")
  if (statsOverlay) {
    statsObserver.observe(statsOverlay)
  }

  // Smooth reveal animation for service items
  const serviceItems = document.querySelectorAll(".service-item")
  serviceItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 200)
  })
})
