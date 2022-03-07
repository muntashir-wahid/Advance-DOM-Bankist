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
  console.log(entry)
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

