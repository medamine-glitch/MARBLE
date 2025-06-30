// Projects page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxTitle = document.getElementById("lightbox-title")
  const lightboxDescription = document.getElementById("lightbox-description")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.getElementById("lightbox-prev")
  const lightboxNext = document.getElementById("lightbox-next")

  let currentImageIndex = 0
  let filteredItems = []

  // Initialize gallery
  function initGallery() {
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("show")
      }, index * 100)
    })
    filteredItems = Array.from(galleryItems)
  }

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category")
        if (filter === "all" || category === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.classList.add("show")
          }, 100)
        } else {
          item.classList.remove("show")
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })

      // Update filtered items for lightbox navigation
      setTimeout(() => {
        filteredItems = Array.from(galleryItems).filter((item) => item.style.display !== "none")
      }, 400)
    })
  })

  // Lightbox functionality
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img")
      const title = this.querySelector("h3").textContent
      const description = this.querySelector("p").textContent

      currentImageIndex = filteredItems.indexOf(this)
      openLightbox(img.src, title, description)
    })
  })

  function openLightbox(src, title, description) {
    lightboxImg.src = src
    lightboxTitle.textContent = title
    lightboxDescription.textContent = description
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  function showPrevImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1
    const item = filteredItems[currentImageIndex]
    const img = item.querySelector("img")
    const title = item.querySelector("h3").textContent
    const description = item.querySelector("p").textContent

    lightboxImg.src = img.src
    lightboxTitle.textContent = title
    lightboxDescription.textContent = description
  }

  function showNextImage() {
    currentImageIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0
    const item = filteredItems[currentImageIndex]
    const img = item.querySelector("img")
    const title = item.querySelector("h3").textContent
    const description = item.querySelector("p").textContent

    lightboxImg.src = img.src
    lightboxTitle.textContent = title
    lightboxDescription.textContent = description
  }

  // Event listeners
  lightboxClose.addEventListener("click", closeLightbox)
  lightboxPrev.addEventListener("click", showPrevImage)
  lightboxNext.addEventListener("click", showNextImage)

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      switch (e.key) {
        case "Escape":
          closeLightbox()
          break
        case "ArrowLeft":
          showPrevImage()
          break
        case "ArrowRight":
          showNextImage()
          break
      }
    }
  })

  // Initialize gallery on load
  initGallery()
})
