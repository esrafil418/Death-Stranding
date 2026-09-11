(function () {
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".main-menu");
  const yearEl = document.getElementById("year");
  const toast = document.getElementById("toast");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  window.addEventListener("scroll", function () {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  document.querySelectorAll("[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const success = form.getAttribute("data-success") || "Message sent. Keep on keeping on.";
      form.reset();
      showToast(success);
    });
  });

  const faqGroups = document.querySelectorAll(".faq-group");
  faqGroups.forEach(function (group) {
    const header = group.querySelector(".faq-group-header");
    if (!header) return;
    header.addEventListener("click", function () {
      const isOpen = group.classList.contains("is-open");
      faqGroups.forEach(function (other) {
        other.classList.remove("is-open");
        const icon = other.querySelector(".faq-group-header i");
        const body = other.querySelector(".faq-group-body");
        if (icon) icon.className = "fas fa-plus";
        if (body) body.classList.remove("open");
      });
      if (!isOpen) {
        group.classList.add("is-open");
        const icon = group.querySelector(".faq-group-header i");
        const body = group.querySelector(".faq-group-body");
        if (icon) icon.className = "fas fa-minus";
        if (body) body.classList.add("open");
      }
    });
  });

  const filters = document.querySelectorAll("[data-faq-filter]");
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.getAttribute("data-faq-filter");
      filters.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      faqGroups.forEach(function (group) {
        const match = category === "all" || group.getAttribute("data-category") === category;
        group.hidden = !match;
      });
    });
  });

})();
