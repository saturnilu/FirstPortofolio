document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);
        const allLinks = document.querySelectorAll("nav ul li a");

        const defaultIcon = navLink.getAttribute("data-default");
        const activeIcon = navLink.getAttribute("data-active");

        if (entry.isIntersecting) {
          allLinks.forEach(link => {
            link.classList.remove("active");
            const img = link.querySelector("img");
            img.src = link.getAttribute("data-default");
          });

          navLink.classList.add("active");
          navLink.querySelector("img").src = activeIcon;
        }
      });
    },
    {
      threshold: 0.5 // 50% masuk viewport baru aktif
    }
  );

  sections.forEach(section => observer.observe(section));
});


const textList = [
  "Front-end Developer",
  "UI/UX Enthusiast",
  "React Explorer"
];

const typedText = document.getElementById("typed-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = textList[textIndex];

  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textList.length;
      setTimeout(typeEffect, 300); // jeda sebelum mulai ketik teks baru
    } else {
      setTimeout(typeEffect, 50); // kecepatan menghapus
    }
  } else {
    typedText.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200); // jeda setelah selesai ngetik
    } else {
      setTimeout(typeEffect, 100); // kecepatan ngetik
    }
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const skillItems = document.querySelectorAll(".skill-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // reset semua tombol
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
        const img = btn.querySelector("img");
        img.src = btn.getAttribute("data-img");
      });

      // aktifkan tombol yang diklik
      button.classList.add("active");
      const img = button.querySelector("img");
      img.src = button.getAttribute("data-img-active");

      const filter = button.getAttribute("data-filter");

      skillItems.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || filter === category) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});

// ScrollSpy & icon switching
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").substring(1); // remove "#"
      const icon = link.querySelector("img");
      const defaultImg = link.getAttribute("data-default");
      const activeImg = link.getAttribute("data-active");

      if (href === current) {
        link.classList.add("active");
        icon.src = activeImg;
      } else {
        link.classList.remove("active");
        icon.src = defaultImg;
      }
    });
  });
});

// === Project Filter ===
document.addEventListener("DOMContentLoaded", function () {
  const projectButtons = document.querySelectorAll(".project-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      projectButtons.forEach((btn) => {
        btn.classList.remove("active");
        const img = btn.querySelector("img");
        img.src = btn.getAttribute("data-img");
      });

      button.classList.add("active");
      const activeImg = button.querySelector("img");
      activeImg.src = button.getAttribute("data-img-active");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("#open-testimonial");
  const modal = document.querySelector(".testimonial-modal");
  const closeBtn = document.querySelector("#close-modal");
  const form = document.querySelector("#testimonial-form");
  const testimonialList = document.querySelector(".testimonial-list");

  // Show modal
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Hide modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
  });

  // Validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const position = form.position.value.trim();
    const message = form.testimonial.value.trim();

    const nameValid = /^[A-Za-z\s]{2,}$/.test(name);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nameValid) {
      alert("Name must be at least 2 letters and contain no numbers.");
      return;
    }

    if (!emailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!position || !message) {
      alert("All fields are required.");
      return;
    }

    // Buat objek testimonial
    const newTestimonial = {
      name,
      position,
      message,
      avatar: name[0].toUpperCase()
    };

    // Ambil testimonial yang sudah ada di localStorage
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    testimonials.unshift(newTestimonial); // tambahkan di depan
    localStorage.setItem("testimonials", JSON.stringify(testimonials));

    // Tampilkan ke layar
    displayTestimonial(newTestimonial);

    form.reset();
    modal.style.display = "none";
  });

  function displayTestimonial(testimonial) {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <img src="kutip.png" alt="Quote Icon" class="quote-icon" />
      <p class="quote">“${testimonial.message}”</p>
      <div class="stars">★★★★★</div>
      <div class="author-info">
        <div class="avatar">${testimonial.avatar}</div>
        <div>
          <strong>${testimonial.name}</strong>
          <div class="position">${testimonial.position}</div>
        </div>
      </div>
    `;
    testimonialList.prepend(card);
  }
  const savedTestimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
  savedTestimonials.forEach(displayTestimonial);



  // Optional: Close modal on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      form.reset();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hiddenEls = document.querySelectorAll(".scroll-hidden");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  hiddenEls.forEach(el => observer.observe(el));
});

// Handle Not Ready Popup
document.querySelectorAll('.project-demo, .project-code, .icon-wrapper, .cv-box').forEach(button => {
  button.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href.includes("yourportfolio") || href.includes("yourproject") || href.includes("portfolio-demo")) {
      e.preventDefault();
      document.getElementById("notReadyModal").style.display = "flex";
    }
  });
});

document.getElementById("closeNotReady").addEventListener("click", () => {
  document.getElementById("notReadyModal").style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target.id === "notReadyModal") {
    document.getElementById("notReadyModal").style.display = "none";
  }
});
