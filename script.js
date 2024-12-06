const slides = document.querySelectorAll('.slide');
const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const addTextBtn = document.getElementById('addTextBtn');

let currentSlide = 0;

// Function to update the slide
function updateSlide() {
  const offset = -currentSlide * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

// Handle prev button click
prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) currentSlide--;
  updateSlide();
});

// Handle next button click
nextBtn.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) currentSlide++;
  updateSlide();
});

// Add default text when Add Text button is clicked
addTextBtn.addEventListener('click', () => {
  const activeSlide = slides[currentSlide];
  const textContainer = activeSlide.querySelector('.text-container');
  
  const textBox = document.createElement('div');
  textBox.classList.add('text-box');
  textBox.contentEditable = true; // Make text editable
  textBox.textContent = "I'm inviting you for my marriage"; // Default text
  textBox.style.fontSize = '16px'; // Default font size
  textBox.style.fontFamily = 'Arial'; // Default font family
  textBox.style.color = '#000'; // Default font color
  textBox.style.left = '10px'; // Initial position
  textBox.style.top = '10px'; // Initial position
  
  textContainer.appendChild(textBox); // Append text box to the active slide
  makeDraggable(textBox); // Make it draggable
});

// Function to make text box draggable
function makeDraggable(element) {
  let offsetX, offsetY;
  element.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    function onMouseMove(e) {
      const rect = element.parentElement.getBoundingClientRect();
      const x = Math.min(Math.max(0, e.clientX - rect.left - offsetX), rect.width - element.offsetWidth);
      const y = Math.min(Math.max(0, e.clientY - rect.top - offsetY), rect.height - element.offsetHeight);

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  });
}

// Font property change
document.getElementById('fontSize').addEventListener('input', function() {
  const activeSlide = slides[currentSlide];
  const textBox = activeSlide.querySelector('.text-box');
  if (textBox) {
    textBox.style.fontSize = `${this.value}px`;
  }
});

document.getElementById('fontColor').addEventListener('input', function() {
  const activeSlide = slides[currentSlide];
  const textBox = activeSlide.querySelector('.text-box');
  if (textBox) {
    textBox.style.color = this.value;
  }
});

document.getElementById('fontFamily').addEventListener('change', function() {
  const activeSlide = slides[currentSlide];
  const textBox = activeSlide.querySelector('.text-box');
  if (textBox) {
    textBox.style.fontFamily = this.value;
  }
});
