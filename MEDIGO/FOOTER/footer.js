document.addEventListener("DOMContentLoaded", () => {
  // Load footer
  fetch("../FOOTER/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;

      // Sau khi footer đã được chèn vào DOM, mới bắt sự kiện click
      const socialLinks = document.querySelectorAll(".social-link");

      socialLinks.forEach(link => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const url = link.getAttribute("href");
          window.open(url, "_blank");
        });
      });
    });
});
