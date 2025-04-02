// fixed-top-animated-menu.1.0.js
var spacetop = 50;
$(document).on('click', '.scrollspy .scrollspy__item a', function (event) {
    "use strict";
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - spacetop
    }, 500);
});
$(document).on('click', 'a.anchorlink', function (event) {
    "use strict";
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - spacetop
    }, 500);
});
//changing color of menu elements when scrolling
$(function () {
    "use strict";
    $(window).bind('scroll', function () {
        $('.anchor').each(function () {
            var anchored = $(this).attr("id"),
            position = $(this).position().top - $(window).scrollTop(),
            targetOffset = $(this).offset().top - 90;

            if ($(window).scrollTop() > targetOffset) {
                $('.scrollspy').find('.scrollspy__item').removeClass("active");
                $('.scrollspy').find(('*[data-anchor="' + anchored + '"]')).addClass("active");
            }

            if ($(window).scrollTop() < 20) {
                $('.scrollspy').find('.scrollspy__item').removeClass("active");
            }
        });
    });
});

// HTML mẫu
/***

<ul class="scrollspy">
  <li class="scrollspy__item active" data-anchor="about"><a href="#about">ABOUT</a></li>
  <li class="scrollspy__item" data-anchor="portfolio"><a href="#portfolio">PORTFOLIO</a></li>
  <li class="scrollspy__item" data-anchor="contact"><a href="#contact">CONTACT</a></li>
  <li class="scrollspy__item" data-anchor="feedback"><a href="#feedback">FEEDBACK</a></li>
</ul>

<div class="anchor" id="about">
<!-- start slipsum code -->

<!-- end slipsum code -->
</div>

<div class="anchor" id="portfolio">
<!-- start slipsum code -->

<!-- end slipsum code -->
</div>

***/
