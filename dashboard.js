document.addEventListener("DOMContentLoaded", () => {
  // Mobile Nav Logic
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Modal Functionality
  const logBtn = document.getElementById("log-session-btn");
  const modal = document.getElementById("log-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  const sessionForm = document.getElementById("session-form");
  const logsList = document.querySelector(".logs-list");

  const openModal = () => modal.classList.add("active");
  const closeModal = () => modal.classList.remove("active");

  if (logBtn) {
    logBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove("active");
      if (menuToggle) menuToggle.classList.remove("active");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking dark overlay outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle Dynamic Workout Entry
  if (sessionForm) {
    sessionForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const type = document.getElementById("workout-type").value;
      const duration = document.getElementById("duration").value;
      const jumps = document.getElementById("jumps").value;
      const calories = document.getElementById("calories").value;

      // Extract icon from selected option
      const icon = type.split(" ")[0];
      const cleanTitle = type.replace(icon, "").trim();

      // Create new list item element
      const newLogItem = document.createElement("li");
      newLogItem.className = "log-item";
      newLogItem.innerHTML = `
        <div class="icon-circle">${icon}</div>
        <div class="log-details">
          <span class="time-ago">Just now</span>
          <strong>${cleanTitle}</strong>
          <p>${duration} min, ${calories} kcal, ${jumps} jumps</p>
        </div>
      `;

      // Prepend to top of logs list
      if (logsList) {
        logsList.prepend(newLogItem);
      }

      closeModal();
      sessionForm.reset();
    });
  }
});
