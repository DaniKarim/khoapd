// Custom Cursor JS
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const cursorF = document.createElement('div');
cursorF.classList.add('cursor-f');
document.body.appendChild(cursorF);

let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
const followSpeed = 0.16;

// Cập nhật vị trí chuột
window.addEventListener('mousemove', (e) => {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Animation cho vòng ngoài
function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed);
    cursorY = lerp(cursorY, pageY, followSpeed);
    cursorF.style.left = `${cursorX}px`;
    cursorF.style.top = `${cursorY}px`;
    requestAnimationFrame(loop);
}

loop();

// Thêm hover nhận diện vào tất cả phần tử tương tác
const interactiveElements = document.querySelectorAll('a, button, input, textarea, div');

interactiveElements.forEach((element) => {
    element.addEventListener('mouseover', () => {
        cursor.classList.add('hover-effect');
        cursorF.classList.add('hover-effect-f');
    });

    element.addEventListener('mouseout', () => {
        cursor.classList.remove('hover-effect');
        cursorF.classList.remove('hover-effect-f');
    });
});

//click

  document.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    ripple.classList.add("cursor-click");
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 400);
  });