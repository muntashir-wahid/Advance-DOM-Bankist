'use strict';

///////////////////////////////////////

// Elements

const modal = document.querySelector('.modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');
const btnScroleTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.getElementById('section--1');
const navLinks = document.querySelectorAll('.nav__link');
const navLinksContainer = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTarget = document.querySelectorAll('img[data-src]');
// const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const [sliderBtnLeft, sliderBtnRight] = document.querySelectorAll('.slider__btn');
const [btnLeft,btnRight] = document.querySelectorAll('.slider__btn');
const dotContainer = document.querySelector('.dots');

// Model Window

const openModel = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModel));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.classList.toggle('hidden', true);
    overlay.classList.toggle('hidden', true);
  }
});

// Button scrolling

btnScroleTo.addEventListener('click', function (e) {
  // Old School way

  /*
  const s1cords = sectionOne.getBoundingClientRect();
  window.scrollTo({
    left: s1cords.left + window.pageXOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth'
  });
  */

  // Modern way
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation using event delegation

navLinksContainer.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {

    // Guard clause
    if (e.target.getAttribute('href') === '#') return;

    const sectionScrollTo = document.querySelector(
      e.target.getAttribute('href')
    );
    sectionScrollTo.scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed conponent

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active class
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Add active class
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Nav menu faded animaton

// Function
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(siblingEl => {
      if (siblingEl !== link) {
        siblingEl.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// Handlers
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation bar

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Ravealing animation 

const revealingAnimation = function(entries,observer) {
  const [entry] = entries;  
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionOvserver = new IntersectionObserver(revealingAnimation, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionOvserver.observe(section);
  section.classList.add('section--hidden'); 
})

// Lazy loading image

const lazyImg = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTarget.forEach(img => imgObserver.observe(img));

// Slider component  

const slider = function() {
  let currentSlide = 0;
  const maxSlide = slides.length - 1;
  
  // Functions
  
  const goToSlide = function(slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
  };
  
  const creatDot = function () {
    slides.forEach((_, index) => {
      const  html = `<button class="dots__dot" data-slide="${index}"></button>`;
      dotContainer.insertAdjacentHTML('beforeend', html);
    })
  };
  
  const activateDot = function (slide) {
    const dot = document.querySelectorAll('.dots__dot');
    dot.forEach((d) => d.classList.remove('dots__dot--active'));
    // My solution 
    dot[slide].classList.add('dots__dot--active');
    // Jonas solution 
    // document
    //   .querySelector(`.dots__dot[data-slide="${slide}"]`)
    //   .classList
    //   .add('dots__dot--active');
  };
  
  const init = function () {
    goToSlide(0);
    creatDot();
    activateDot(0);
    };
  
  // Next slide
  const goNextSlide = function() {
    currentSlide++;
    currentSlide = currentSlide > maxSlide ? 0 : currentSlide;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  
  // Previous slide
  const goPrevSlide = function() {
    currentSlide--;
    currentSlide = currentSlide < 0 ? maxSlide : currentSlide;
    goToSlide(currentSlide);
    activateDot(currentSlide)
  };
  
  init();
  
  // Event listeners
  btnRight.addEventListener('click', goNextSlide);
  btnLeft.addEventListener('click', goPrevSlide);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      goNextSlide()
      activateDot(currentSlide);
    } else if (e.key === 'ArrowLeft') {
      goPrevSlide()
      activateDot(currentSlide);
    };
  });
  
  dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    };
  });
  };
  
  slider();