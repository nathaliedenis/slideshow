let interval = 5500;
const transition = 1500;

const slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');
let index = 0;

const firstClone = slides[0].cloneNode(true);
firstClone.id = 'first-clone';
firstClone.classList.remove('active');
slider.append(firstClone);

let slideWidth = slides[index].clientWidth;
slider.style.transform = `translateX(${-slideWidth * index}px)`;

window.addEventListener('resize', () => {
  slideWidth = slides[index].clientWidth;
  slider.style.transition = 'none';
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
})

const getSlides = () => document.querySelectorAll('.slide');

slider.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    function loop() {
      slides[index].classList.remove('active');
      slider.style.transition = 'none';
      index = 0;
      slider.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    setTimeout(loop, (interval - transition - 100));
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return
  index++;
  slider.style.transition = transition / 1000 + 's ease-in-out';
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
  slides[index].classList.add('active');
  slides[index - 1].classList.remove('active');
  handwritingAnimation();
};

const showSlider = setInterval(() => moveToNextSlide(), interval)

const handwritingAnimation = () => {
  let path = document.querySelector('.active .move-path');
  let length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.animationDuration = interval + 'ms';
}

const startSlide = () => {
  slides[0].classList.add('active');
  handwritingAnimation();
  showSlider()
};

startSlide();
//window.addEventListener('load', startSlide());