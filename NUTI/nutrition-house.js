//Scrolled topbar

// Lấy phần tử container
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
  
    window.addEventListener('scroll', () => {
        if (window.scrollY > 180) {
            container.classList.add('scrolled');
        } else {
            container.classList.remove('scrolled');
        }
    });
  });
  
  // Click arrow -> About me with adjustable scroll speed
  document.addEventListener('DOMContentLoaded', () => {
    const arrowLink = document.querySelector('.arrow-link');
  
    if (arrowLink) {
      arrowLink.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn hành động mặc định của liên kết
  
        // Gọi hàm cuộn với tốc độ tùy chỉnh (2000ms)
        smoothScroll('#about-me', 100);
      });
    } else {
      console.error('Element with class "arrow-link" not found.');
    }
  });
  
  // Hàm cuộn mượt với tốc độ tùy chỉnh
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    if (!targetElement) {
      console.error(`Element "${target}" not found.`);
      return;
    }
  
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animationScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animationScroll);
      } else {
        // Đảm bảo đến đúng vị trí cuối cùng
        window.scrollTo(0, targetPosition);
      }
    }
  
    // Hàm easing để tạo hiệu ứng mượt
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animationScroll);
  }
  
  //Cuộn khi click vào liên kết about me trên topbar
  
  document.addEventListener('DOMContentLoaded', () => {
    // Tìm tất cả các liên kết có href dẫn đến phần tử trong trang
    const links = document.querySelectorAll('a[href^="#"]');
  
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn hành động mặc định của liên kết
  
        // Lấy href và cuộn đến mục tiêu
        const targetId = this.getAttribute('href');
        smoothScroll(targetId, 100); // Tùy chỉnh thời gian cuộn (1000ms)
      });
    });
  });
  
  // Hàm cuộn mượt
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    if (!targetElement) {
      console.error(`Element "${target}" not found.`);
      return;
    }
  
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animationScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
  
      if (timeElapsed < duration) {
        requestAnimationFrame(animationScroll);
      } else {
        // Đảm bảo đến đúng vị trí cuối cùng
        window.scrollTo(0, targetPosition);
      }
    }
  
    // Hàm easing để tạo hiệu ứng mượt
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animationScroll);
  }
  
  // Nar
  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const fullscreenItems = document.querySelectorAll('.fullscreen-item');
  
    fullscreenItems.forEach(item => {
      item.addEventListener('click', () => {
          // Đóng menu toàn màn hình
          fullscreenMenu.classList.remove('active');
          // Xóa trạng thái active của hamburger menu
          hamburgerMenu.classList.remove('active');
      });
  });
  
    hamburgerMenu.addEventListener('click', () => {
        fullscreenMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
  });

  //Contact

document.addEventListener("DOMContentLoaded", function () {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
          event.preventDefault(); // Ngăn hành động mặc định
          const url = link.getAttribute("href"); // Lấy URL từ thuộc tính href
          window.open(url, "_blank"); // Mở liên kết trong tab mới
      });
  });
});


//Fade Title

document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("blurText");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add("in-view");
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(target);
});

//Open new tab

const socialLinks = document.querySelectorAll("a.content-link");

socialLinks.forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const url = link.getAttribute("href");
    if (url) window.open(url, "_blank");
  });
});

//Transition 

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".fade-effect.category");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(target => {
    observer.observe(target);
  });
});




  
  
  
  