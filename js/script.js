"use strict";

// слайдер slider-main

const slides = document.querySelectorAll(".slider-main__slide"),
  dots = document.querySelectorAll(".slider-main__dot");

let index = 0;

const activeSlide = (n) => {
  for (let slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const activeDot = (n) => {
  for (let dot of dots) {
    dot.classList.remove("active");
  }
  dots[n].classList.add("active");
};

const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
};

dots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    index = indexDot;
    prepareCurrentSlide(index);
  });
});

setInterval(nextSlide, 3000);

// section-4 slider-houses

//const slider = document.querySelector(".slider-houses");
const sliderItems = document.querySelector(".slider-houses__items");
const sliderItem = document.querySelector(".slider-houses__item");
const sliderLineBottom = document.querySelector(".slider-houses__line-bottom");
const sliderLine = document.querySelector(".slider-houses__line");
const sliderChange = document.querySelector(".slider-houses__change");

const body = document.body;

let isActive = false;

document.addEventListener("DOMContentLoaded", () => {
  sliderItem.style.left = "0px";
  sliderChange.style.left = "0px";
});

sliderChange.addEventListener("mousedown", () => {
  isActive = true;
  if (body.style.cursor == "pointer") body.style.cursor = "default";
});

body.addEventListener("mouseup", () => {
  isActive = false;
  if (body.style.cursor == "pointer") body.style.cursor = "default";
});

body.addEventListener("mouseleave", () => {
  isActive = false;
});

const beforeAfterSliderChange = (x) => {
  let shiftChange = Math.max(0, Math.min(x, sliderLine.offsetWidth));
  //sliderItem.style.left = `-${(1516 / 335) * shiftChange}px`;
  sliderItem.style.left = `-${
    ((sliderItem.offsetWidth - sliderItems.offsetWidth) /
      sliderLine.offsetWidth) *
    shiftChange
  }px`;
  sliderChange.style.left = `${shiftChange}px`;
};

const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

body.addEventListener("mousemove", (e) => {
  if (!isActive) {
    return;
  }

  body.style.cursor = "pointer";

  let x = e.pageX;
  x -= sliderChange.getBoundingClientRect().left;
  beforeAfterSliderChange(x);
  pauseEvents(e);
});
