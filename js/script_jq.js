"use strict";

// ----------------------------------------------------

const slides = $(".slider-main__slide"),
  dots = $(".slider-main__dot");

let index = 0;

const activeSlide = (n) => {
  $(slides).each(function (i, elem) {
    $(elem).removeClass('active');
    if (i == n) $(elem).addClass('active');
  });
};

const activeDot = (n) => {
  $(dots).each(function (i, elem) {
    $(elem).removeClass("active");
    if (i == n) $(elem).addClass("active");
  });
};

const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};
const nextSlide = () => {
  if (index == $(slides).length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = $(slides).length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
};

$(dots).each((i, item) => {
  $(item).on("click", () => {
    index = i;
    prepareCurrentSlide(index);
  });
});

setInterval(nextSlide, 3000);

// -----------------------------------------------------

// ---------------------------------------------------

const sliderItems = $(".slider-houses__items");
const sliderItem = $(".slider-houses__item");
const sliderLineBottom = $(".slider-houses__line-bottom");
const sliderLine = $(".slider-houses__line");
const sliderChange = $(".slider-houses__change");

const body = $("body");

let isActive = false;

$(document).ready(function () {
  $(sliderItem).css("left", "0px");
  $(sliderChange).css("left", "0px");
});

$(sliderChange).on("mousedown", function (e) {
  isActive = true;
  console.log(isActive);
  if ($(body).css("cursor") == "pointer") $(body).css("cursor", "default");
});
$(body).on("mouseup", function (e) {
  isActive = false;
  console.log(isActive);
  if ($(body).css("cursor") == "pointer") $(body).css("cursor", "default");
});
$(body).on("mouseleave", function (e) {
  isActive = false;
  console.log(isActive);
  if ($(body).css("cursor") == "pointer") $(body).css("cursor", "default");
});

const beforeAfterSliderChange = (x) => {
  let shiftChange = Math.max(
    0,
    Math.min(x, $(sliderLine).width())
  );
  $(sliderItem).css(
    "left",
    -(
      ($(sliderItem).width() - $(sliderItems).width()) / $(sliderLine).width() * shiftChange
     ) + "px"
  );
  $(sliderChange).css("left", shiftChange + "px");
};


const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

$(body).on("mousemove", function (e) {
  if (!isActive) {
    return;
  }

  $(body).css("cursor", "pointer");

  let x = $(e.pageX)[0];
  //x -= sliderChange.getBoundingClientRect().left;
  x -= $(sliderChange).offset().left;
  beforeAfterSliderChange(x);
  pauseEvents(e);
});
