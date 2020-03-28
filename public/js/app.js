"use strict";

var prevScrollpos = window.pageYOffset;
var sliderIndex = 1;
var scrolled = window.scrollY >= 100;
var isScrolling = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function scrollToBlock() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  isScrolling = true;
  $('html,body').animate({
    scrollTop: $(obj.block || '.drimclub-benefit').offset().top - (obj.offsetY || 0)
  }, 1000, function () {
    isScrolling = false;
  });
}

$(document).bind('mousewheel DOMMouseScroll', function (event) {
  if (!scrolled || isScrolling) {
    event.preventDefault();
  }

  var delta = -event.originalEvent.wheelDelta || event.originalEvent.detail;

  if (!scrolled && delta > 0) {
    scrollToBlock();
    scrolled = true;
  }

  if (scrolled && window.scrollY <= $('.drimclub-benefit').offset().top && delta < 0) {
    isScrolling = true;
    $('html,body').animate({
      scrollTop: 0
    }, 1000, function () {
      isScrolling = false;

      if ($('.header').hasClass('header--hide')) {// $('.header').removeClass('header--hide');
      }
    });
    $('.header').removeClass('header--in-white');
    scrolled = false;
  }
});

document.onkeydown = function (_ref) {
  var keyCode = _ref.keyCode;

  if (keyCode === 40 && !scrolled) {
    scrollToBlock();
  }
};

$(window).on('scroll', function (a, b, c) {
  var headerOffset = $('.header').outerHeight();

  if ($(window).scrollTop() + headerOffset >= $('.drimclub-benefit').offset().top && $(window).scrollTop() + headerOffset < $('.drimclub-benefit').outerHeight() + $('.drimclub-benefit').offset().top) {
    $('.header').addClass('header--in-white');
  } else {
    $('.header').removeClass('header--in-white');
  }

  if ($(window).scrollTop() + headerOffset >= $('.big-slider').offset().top && $(window).scrollTop() + headerOffset < $('.big-slider').outerHeight() + $('.big-slider').offset().top) {
    $('.header').addClass('header--in-gray');
  } else {
    $('.header').removeClass('header--in-gray');
  }

  if ($(window).scrollTop() + headerOffset >= $('.discounts-block').offset().top && $(window).scrollTop() + headerOffset < $('.discounts-block').outerHeight() + $('.discounts-block').offset().top) {
    $('.header').addClass('header--in-white');
  }

  if ($(window).scrollTop() + headerOffset >= $('.recomended-drimclub').offset().top && $(window).scrollTop() + headerOffset < $('.recomended-drimclub').outerHeight() + $('.recomended-drimclub').offset().top) {
    $('.header').addClass('header--in-gray');
  }

  if ($(window).scrollTop() + 350 >= $('.discounts-block__audio-courses').offset().top && $(window).scrollTop() + 350 < $('.discounts-block__audio-courses').outerHeight() + $('.discounts-block__audio-courses').offset().top) {
    $('.discounts-block__audio-courses-waves').addClass('discounts-block__audio-courses-waves--show');
  }

  if ($(window).scrollTop() + headerOffset >= $('.connect-drimclub').offset().top && $(window).scrollTop() + headerOffset < $('.connect-drimclub').outerHeight() + $('.connect-drimclub').offset().top) {
    $('.header').addClass('header--in-white');
  }

  var currentScrollPos = window.pageYOffset;
  var notHideInMobileMain = window.scrollY < 300;

  if (prevScrollpos > currentScrollPos && !isScrolling) {
    if (isMobile && notHideInMobileMain) {
      return;
    } // $('.header').removeClass('header--hide');

  } else {// $('.header').addClass('header--hide');
    }

  prevScrollpos = currentScrollPos;
}); // $(window).mousemove(function(e) {
//   var xpos = e.clientX;
//   var ypos = e.clientY;
//   var xpos = xpos * 1.2;
//   ypos = ypos * 1.2;
//   $(".main-block .parallax").css(
//     "transform",
//     `translateY(${0 + ypos / 50}px) translateX(${0 + xpos / 80}px)`
//   );
// });

function setBigSlide(obj) {
  switch (obj.method) {
    case 'init':
      sliderIndex = obj.index;
      break;

    case 'next':
      sliderIndex++;

      if (sliderIndex > 3) {
        sliderIndex = 3;
        return;
      }

      break;

    case 'prev':
      sliderIndex--;

      if (sliderIndex < 1) {
        sliderIndex = 1;
        return;
      }

      break;

    default:
      break;
  }

  if (sliderIndex > 1) {
    $('.big-slider .button--prev').addClass('visible');
  } else {
    $('.big-slider .button--prev').removeClass('visible');
  }

  if (sliderIndex === 3) {
    $('.big-slider .button--next').animate({
      opacity: 0
    }, 150, function () {
      $(this).hide();
    });
  } else {
    $('.big-slider .button--next').show().animate({
      opacity: 1
    }, 150);
  } // let lastIndex = sliderIndex - 1;
  // $(".big-slider__images ul li")
  //   .removeClass("active")
  //   .animate({ opacity: 0 }, 200);
  // $('.big-slider__images ul li[data-index="' + sliderIndex + '"]')
  //   .addClass("active")
  //   .animate({ opacity: 1 }, 200);


  $('.big-slider__images ul li').removeClass('active').animate({
    opacity: 0
  }, 300);
  $('.big-slider__images ul li[data-index="' + sliderIndex + '"]').addClass('active').animate({
    opacity: 1
  }, 300);
  $('.big-slider__informations ul li').removeClass('active');
  $('.big-slider__informations ul li[data-index="' + sliderIndex + '"]').addClass('active');
}

$(document).ready(function () {
  new Typewriter(document.querySelector('.main-block__title-animated'), {
    loop: true
  }).typeString('Дримклуб').pauseFor(2500).deleteAll().typeString('Дримсим').pauseFor(2500).start();
  setBigSlide({
    method: 'init',
    index: 1
  });

  if (!is_safari) {
    $('.main-block').mousemove(function (e) {
      parallaxIt(e, '#Path-Copy-3', -15);
      parallaxIt(e, '#mask-8', 15);
      parallaxIt(e, '#Path-Copy-4', -20);
      parallaxIt(e, '#Path-Copy-5', -30);
      parallaxIt(e, '#Oval', -20);
      parallaxIt(e, '#Combined-Shape', -40);
      parallaxIt(e, '#wave-1', -30);
      parallaxIt(e, '#wave-2', -30);
      parallaxIt(e, '#kit', -20);
    });
  }

  function parallaxIt(e, target, movement) {
    var $this = $('.main-block');
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;
    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }

  $('.big-slider button.button--next').click(function () {
    if (sliderIndex < 3) {
      setBigSlide({
        method: 'next'
      });
    } else {
      setBigSlide({
        method: 'prev'
      });
    }
  });
  $('.hamburger').click(function () {
    $(this).toggleClass('is-active');

    if ($(this).hasClass('is-active')) {
      $('.header__mobile-menu').addClass('header__mobile-menu--show');
      setTimeout(function () {
        $('.header__mobile-menu ul').css({
          transform: 'translateY(0)'
        });
      });
    } else {
      $('.header__mobile-menu ul').css({
        transform: 'translateY(-550px)'
      });
      setTimeout(function () {
        $('.header__mobile-menu').removeClass('header__mobile-menu--show');
      }, 400);
    }
  });
  $('.big-slider button.button--prev').click(function () {
    setBigSlide({
      method: 'prev'
    });
  });
  $('.drimclub-benefit__blocks-item').click(function () {
    var block = $(this).data('scroll-block');
    var offset = 0;

    if (block === 'discounts-block__audio-courses') {
      offset = 120;
    } else {
      offset = 0;
    }

    if (isMobile) {
      offset += 40;
    }

    if (isMobile && block === 'discounts-block__audio-courses') {
      offset -= 20;
    }

    scrollToBlock({
      block: ".".concat(block),
      offsetY: offset
    });
  });
});