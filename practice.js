// Modal window

/*
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Selecting Elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll('.section');
const allBtns = document.getElementsByTagName('button');
console.log(allSections);
console.log(allBtns); 

// Creating and inserting elements



// Add cookie message in the header
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit.<button class="btn btn--close-cookie">Got it</button>';
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Style the cookie message
message.style.backgroundColor = '#37383d';
message.style.width = '100%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 25 + 'px';

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.';
message.innerHTML = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.<button class="btn btn--close-cookie">Got it</button>'
header.prepend(message);

// Working with style 

document.documentElement.style.setProperty('--color-primary', 'black');
document.body.style.setProperty('background-color', 'red');

// Working with attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.src);

console.log(logo.alt);
logo.alt = 'Beautiful minimalist logo';

// It will not work
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('src'));

const link = document.querySelector('.btn--show-modal');
console.log(link.href);
console.log(link.getAttribute('href'));

const section3 = document.getElementById('section--3');
const btn = document.querySelector('.nav__link__3');

btn.addEventListener('click', function(e) {
  e.preventDefault();
  // Old schoole way
  const s3coords = section3.getBoundingClientRect();
  window.scrollTo({
    top: s3coords.top + pageYOffset,
    left: s3coords.left,
    behavior: 'smooth'
  });
  
  section3.scrollIntoView({
    behavior: 'smooth',
  })
})

// Events

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  console.log(e);
  alert('Mouse entered');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// Event propagation

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function(e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('navLink: ', e.target, e.currentTarget);
  console.log(this === e.currentTarget);
  // stop propagation 
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('navLinksContainer: ', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('navBar : ', e.target, e.currentTarget);
  console.log(e.currentTarget === this)
});

// DOM Traversing 

const h1 = document.querySelector('h1');
const header = document.querySelector('.header__title');
const mainHeader = document.querySelector('.header');
const navLinks = document.querySelector('.nav__links');
console.log(navLinks);

// Going downwards:child elements

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = 'red';

console.log(header.childNodes);
console.log(header.children);

console.log(mainHeader.firstElementChild);
console.log(mainHeader.lastElementChild);

// Going upwords: parents elements

console.log(h1.parentElement);
console.log(navLinks.parentNode);

navLinks.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways : siblings

console.log(navLinks.previousElementSibling);
console.log(navLinks.nextElementSibling);

console.log(h1.parentElement.children);

const obsCallBack = function(entries, ovserver) {
  entries.forEach(el => {
    console.log(el)
  });
};

const obsOptions = {
  root: null, 
  threshold: 0.1,
}

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(sectionOne);

const sectionOne = document.getElementById('section--1');
const header = document.querySelector('.header');
console.log(sectionOne.clientHeight, header.clientHeight, document.documentElement.clientHeight);

console.log(window.pageYOffset)
const obsCallback = function(entries,observer) {
  entries.forEach(e => {
    console.log(e);
  })
}

const obsObject = {
  root: null,
  threshold: [0, 0.2],
}


const observer = new IntersectionObserver(obsCallback, obsObject);
observer.observe(sectionOne);

*/