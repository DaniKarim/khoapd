/*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
const STAR_COLOR = '#f7f7f7';
const STAR_SIZE = 2;
const STAR_MIN_SCALE = 0.01;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;

const canvas = document.querySelector( 'canvas' ),
      context = canvas.getContext( '2d' );

let scale = 1, // device pixel ratio
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
/*Không tương tác qua chuột
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave; */

function generate() {

   for( let i = 0; i < STAR_COUNT; i++ ) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
    });
   }

}

function placeStar( star ) {

  star.x = Math.random() * width;
  star.y = Math.random() * height;

}

function recycleStar( star ) {

  let direction = 'z';

  let vx = Math.abs( velocity.x ),
	    vy = Math.abs( velocity.y );

  if( vx > 1 || vy > 1 ) {
    let axis;

    if( vx > vy ) {
      axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
    }
    else {
      axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
    }

    if( axis === 'h' ) {
      direction = velocity.x > 0 ? 'l' : 'r';
    }
    else {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }
  
  star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

  if( direction === 'z' ) {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }
  else if( direction === 'l' ) {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  }
  else if( direction === 'r' ) {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  }
  else if( direction === 't' ) {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  }
  else if( direction === 'b' ) {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }

}

function resize() {

  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach( placeStar );

}

function step() {

  context.clearRect( 0, 0, width, height );

  update();
  render();

  requestAnimationFrame( step );

}

function update() {

  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += ( velocity.tx - velocity.x ) * 0.8;
  velocity.y += ( velocity.ty - velocity.y ) * 0.8;

  stars.forEach( ( star ) => {

    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += ( star.x - width/2 ) * velocity.z * star.z;
    star.y += ( star.y - height/2 ) * velocity.z * star.z;
    star.z += velocity.z;
  
    // recycle when out of bounds
    if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
      recycleStar( star );
    }

  } );

}

function render() {

  stars.forEach( ( star ) => {

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5*Math.random();
    context.strokeStyle = STAR_COLOR;

    context.beginPath();
    context.moveTo( star.x, star.y );

    var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

    // stroke() wont work on an invisible line
    if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
    if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

    context.lineTo( star.x + tailX, star.y + tailY );

    context.stroke();

  } );

}

function movePointer( x, y ) {

  if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {

    let ox = x - pointerX,
        oy = y - pointerY;

    velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
    velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );

  }

  pointerX = x;
  pointerY = y;

}

function onMouseMove( event ) {

  touchInput = false;

  movePointer( event.clientX, event.clientY );

}

function onTouchMove( event ) {

  touchInput = true;

  movePointer( event.touches[0].clientX, event.touches[0].clientY, true );

  event.preventDefault();

}

function onMouseLeave() {

  pointerX = null;
  pointerY = null;

}


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







