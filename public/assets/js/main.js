(function ($) {
  "use strict";

  /*---------------------------------
  1.Global Variables
  2. Counter Up
  3. Sticky Slides
  4. Countdown
  5. Search Overlay
  6. Convert All Image to SVG
  7. Pricing Toggle
  8. Testimonial Slider Style 1
  9. Testimonial Slider Style 2
  10. Project Slider 2
  11. Project Slider 2 Style 2
  12. Brand Carousel
  13. Text Slider 1
  14. Text Slider 2
  15. Date Picker
  16. Set Background Image & Mask
  17. Popular Destination Hover
  18. Mobile Menu
  19. Offcanvas
  20. Magnific Popup
  21. Header Sticky
  22. Back to Top
  23. Slider
  24. Progress Bar
  --------------------------------*/

  // Preloader
  
  $(".preloader").delay(800).fadeOut("slow");

  // Preloader End

  // Bottom to top start
  $(document).ready(function () {
    $(window).on('scroll', (function () {
      if ($(this).scrollTop() > 100) {
        $('#scroll-top').fadeIn();
      } else {
        $('#scroll-top').fadeOut();
      }
    }));
    $('#scroll-top').on( 'click', function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  });
  // Bottom to top End

  // Global Variables
  const wHeight = $(window).height();
  const wWidth = $(window).width();

  $(document).ready(function () {
    // Counter up
    function loadCounter() {
      if ($(".tz-cn").length) {
        $(".tz-cn").counterUp({
          delay: 10,
          time: 1000,
        });
      }
    }

    loadCounter();

    // sticky slides
    const cards = document.querySelectorAll(".tz-project1__sticky-card");

    function handleSmoothScroll() {
      // Check if screen width is below 992px (mobile)
      if (window.innerWidth < 992) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const stickySection = document.querySelector(
        ".tz-project1__slides-sticky"
      );

      if (!stickySection) return; // if not found, exit early

      const sectionTop = stickySection.offsetTop;
      const sectionHeight = stickySection.offsetHeight;
      const relativeScroll = scrollY - sectionTop;

      if (relativeScroll >= 0 && relativeScroll < sectionHeight) {
        const cardIndex = Math.floor(relativeScroll / windowHeight);
        cards.forEach((card, i) => {
          card.classList.remove("is-visible", "is-above");
          if (i === cardIndex) {
            card.classList.add("is-visible");
          } else if (i < cardIndex) {
            card.classList.add("is-above");
          }
        });
      } else {
        cards.forEach((card) =>
          card.classList.remove("is-visible", "is-above")
        );
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      // Only add initial visible class on desktop
      if (window.innerWidth >= 992) {
        cards[0].classList.add("is-visible");
      }
    });

    window.addEventListener("scroll", handleSmoothScroll);

    // Optional: Handle window resize to reset classes when switching between mobile/desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth < 992) {
        // Remove all classes on mobile
        cards.forEach((card) =>
          card.classList.remove("is-visible", "is-above")
        );
      } else {
        // Re-initialize on desktop
        cards[0].classList.add("is-visible");
      }
    });

    // Countdown
    function initializeCountdown(selector) {
      $(selector).each(function () {
        const $this = $(this);
        const endDate = new Date($this.data("countdown-date")).getTime();

        if (isNaN(endDate)) {
          console.error("Invalid date format in:", $this);
          return;
        }

        function updateCountdown() {
          const now = new Date().getTime();
          const timeDiff = endDate - now;

          if (timeDiff <= 0) {
            $this.find(".tz-day").text("0");
            $this.find(".tz-hour").text("00");
            $this.find(".tz-min").text("00");
            $this.find(".tz-sec").text("00");
            clearInterval(interval);
            return;
          }

          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          $this.find(".tz-day").text(days);
          $this.find(".tz-hour").text(hours.toString().padStart(2, "0"));
          $this.find(".tz-min").text(minutes.toString().padStart(2, "0"));
          $this.find(".tz-sec").text(seconds.toString().padStart(2, "0"));
        }

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();
      });
    }

    // Initialize countdown for all .tz-countdown elements
    if (".tz-countdown") {
      initializeCountdown(".tz-countdown");
    }

    // Show the overlay with animation
    $(".tz-button--search").on("click", function () {
      $(".tz-search__overlay").addClass("active");
      $(".tz-search__bar-container").addClass("active");
    });

    // Close the overlay with animation
    $(".tz-search__button--close").on("click", function () {
      $(".tz-search__overlay").removeClass("active");
      $(".tz-search__bar-container").removeClass("active");
    });

    // Close when clicking outside the search bar
    $(document).on("click", function (e) {
      if (
        $(e.target).closest(".tz-search__bar-container").length === 0 &&
        !$(e.target).hasClass("tz-button--search")
      ) {
        $(".tz-search__overlay").removeClass("active");
        $(".tz-search__bar-container").removeClass("active");
      }
    });

    // Convert All Image to SVG
    $("img.svg").each(function () {
      var $img = $(this),
        imgID = $img.attr("id"),
        imgClass = $img.attr("class"),
        imgURL = $img.attr("src");

      $.get(
        imgURL,
        function (data) {
          var $svg = $(data).find("svg");
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass);
          }
          $svg = $svg.removeAttr("xmlns:a");
          $img.replaceWith($svg);
        },
        "xml"
      );
    });

    // Pricing toggle
    function updatePrices() {
      const show1Month = $(".tz-pricing2__1month").hasClass("active");

      $(".tz-price").each(function () {
        const price = show1Month
          ? $(this).data("1monthly")
          : $(this).data("3monthly");
        $(this).text(price);
      });
    }
    $(".tz-pricing2__3month").addClass("active");
    updatePrices();
    $(".tz-pricing2__toggle button").click(function () {
      if ($(this).hasClass("active")) return;

      $(".tz-pricing2__toggle button").removeClass("active");
      $(this).addClass("active");

      updatePrices();
    });

    // Testimonial Slider Style 1
    const testimonialSliderStyle1 = $(".tz-testimonial1__slider");
    if (testimonialSliderStyle1.length) {
      new Swiper(".tz-testimonial1__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        speed: 1000,
        autoplay: {
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          delay: 3000,
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".tz-testimonial1__slider-next",
          prevEl: ".tz-testimonial1__slider-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 1,
          },
          1400: {
            slidesPerView: 1,
          },
        },
      });
    }
    // Testimonial Slider Style 2
    const testimonialSliderStyle2 = $(".tz-testimonial2__slider");
    if (testimonialSliderStyle2.length) {
      new Swiper(".tz-testimonial2__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        speed:1000,
        autoplay: {
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          delay: 3000,
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".tz-testimonial2__slider-next",
          prevEl: ".tz-testimonial2__slider-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 1,
          },
          1400: {
            slidesPerView: 1,
          },
        },
      });
    }

    // Project Slider 2
    const projectSlider2 = $(".tz-project2__slider");
    if (projectSlider2.length) {
      new Swiper(".tz-project2__slider", {
        speed: 9000,
        slidesPerView: "auto",
        spaceBetween: 10,
        observerUpdate: true,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1680: {
            slidesPerView: 4,
          },
        },
      });
    }
    const projectSlider2Style2 = $(".tz-project2__slider2");
    if (projectSlider2Style2.length) {
      new Swiper(".tz-project2__slider2", {
        speed: 9000,
        slidesPerView: "auto",
        spaceBetween: 10,
        observerUpdate: true,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: true,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1680: {
            slidesPerView: 4,
          },
        },
      });
    }

    // Brand Carousel
    const brandCarousel = $(".brand-carousel");
    if (brandCarousel.length) {
      new Swiper(".brand-carousel", {
        speed: 4000,
        spaceBetween: 30,
        slidesPerView: "auto",
        observerUpdate: true,
        loop: true,
        autoplay: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
      });
    }
    // Text Slider 1
    const textSlider = $(".tz-text-slider");
    if (textSlider.length) {
      new Swiper(".tz-text-slider", {
        speed: 4000,
        slidesPerView: "auto",
        spaceBetween: 10,
        observerUpdate: true,
        loop: true,
        autoplay: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
      });
    }
    // Text Slider 2
    const textSlider2 = $(".tz-text-slider2");
    if (textSlider2.length) {
      new Swiper(".tz-text-slider2", {
        speed: 4000,
        slidesPerView: "auto",
        spaceBetween: 10,
        observerUpdate: true,
        loop: true,
        autoplay: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: true,
        },
      });
    }

    $(".date-picker").flatpickr({
      enableTime: false,
      dateFormat: "Y-m-d",
    });

    /*-----------------------------------
         Set Background Image & Mask   
        -----------------------------------*/
    if ($("[data-bg-src]").length > 0) {
      $("[data-bg-src]").each(function () {
        var src = $(this).attr("data-bg-src");
        $(this).css("background-image", "url(" + src + ")");
        $(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }

    if ($("[data-mask-src]").length > 0) {
      $("[data-mask-src]").each(function () {
        var mask = $(this).attr("data-mask-src");
        $(this).css({
          "mask-image": "url(" + mask + ")",
          "-webkit-mask-image": "url(" + mask + ")",
        });
        $(this).addClass("bg-mask");
        $(this).removeAttr("data-mask-src");
      });
    }

    /*-----------------------------------
       Popular Destination  Hover Js Start  
        -----------------------------------*/

    $(".tz-popular-destination2__card").on("mouseenter", function () {
      $(this).addClass("active");
      $(this).siblings(".tz-popular-destination2__card").removeClass("active");
    });

    /*--------------------------------------
            Mobile Menu
        -------------------------------------*/
    if ($(".tz-main-menu").length && $(".tz-mobile-menu").length) {
      let navContent = document.querySelector(".tz-main-menu").outerHTML;
      let mobileNavContainer = document.querySelector(".tz-mobile-menu");
      mobileNavContainer.innerHTML = navContent;

      let arrow = $(".tz-mobile-menu .has-dropdown > a");

      arrow.each(function () {
        let self = $(this);
        let arrowBtn = document.createElement("BUTTON");
        arrowBtn.classList.add("dropdown-toggle-btn");
        arrowBtn.innerHTML = "<i class='ph ph-plus'></i>";

        self.append(function () {
          return arrowBtn;
        });

        self.find("button").on("click", function (e) {
          e.preventDefault();
          let self = $(this);
          self.toggleClass("dropdown-opened");
          self.parent().toggleClass("expanded");
          self
            .parent()
            .parent()
            .addClass("dropdown-opened")
            .siblings()
            .removeClass("dropdown-opened");
          self
            .parent()
            .parent()
            .children(".tz-submenu")
            .stop(true, true)
            .slideToggle();
        });
      });
    }

    // Offcanvas

    $(".tz-offcanvas-open-btn").on("click", function () {
      $("body").addClass("tz-offcanvas-open");
      $(".tz-offcanvas").addClass("opened");
      $(".tz-body-overlay").addClass("opened");
    });

    $(".tz-offcanvas-close-btn").on("click", function () {
      $("body").removeClass("tz-offcanvas-open");
      $(".tz-offcanvas").removeClass("opened");
      $(".tz-body-overlay").removeClass("opened");
    });

    $(".tz-body-overlay").on("click", function () {
      $("body").removeClass("tz-offcanvas-open");
      $(".tz-offcanvas").removeClass("opened");
      $(".tz-body-overlay").removeClass("opened");
    });
    /*--------------------------------------
             Mobile Menu
            -------------------------------------*/

    /*--------------------------------------
           Magnific Popup
        -------------------------------------*/
    $(".popup-video").magnificPopup({
      type: "iframe",
      removalDelay: 260,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find("img");
        },
      },
    });

    $(".popup-img").magnificPopup({
      type: "image",
      removalDelay: 260,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find("img");
        },
      },
      gallery: {
        enabled: true,
      },
    });

    // service active
    $(".tz-service1-card").on("mouseenter", function () {
      let __this = $(this);
      $(".tz-service1-card").removeClass("active");
      __this.addClass("active");
      __this
        .parents(".col-md-6")
        .siblings(".col-md-6")
        .children(".tz-service1-card")
        .removeClass("active");
    });

    // Service 2
    $(".tz-service2-card").on("mouseenter", function () {
      let __this = $(this);
      $(".tz-service2-card").removeClass("active");
      __this.addClass("active");
      __this
        .parents(".col-md-6")
        .siblings(".col-md-6")
        .children(".tz-service2-card")
        .removeClass("active");
    });
  }); // End Document Ready Function

  // Header Sticky
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".tz-header1").addClass("sticky");
    } else {
      $(".tz-header1").removeClass("sticky");
    }
  });
  // Header Sticky
  /*-----------------------------------
         15. Back to top    
      -----------------------------------*/
  let documentHeight = $(document).height();
  $(window).on("load scroll", function () {
    $("#back-top").hide();
    if ($(this).scrollTop() > documentHeight / 2.5) {
      $("#back-top").show();
    } else {
      $("#back-top").hide();
    }
  });

  $("#back-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 200);
    return false;
  });

  /*-----------------------------------
          Slider
       -----------------------------------*/
  // testimonial slider style 1
  const testimonialSliderStyle1 = $(".tz-clients1__slider");
  if (testimonialSliderStyle1.length) {
    new Swiper(".tz-clients1__slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: false,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".tz-clients1__slider-next",
        prevEl: ".tz-clients1__slider-prev",
      },
    });
  }
  // Progress Bar
  $(window).on("scroll", function () {
    let $progressBar = $(".progress-bar");
    if ($progressBar.length) {
      // check if element exists
      let scroll = $(window).scrollTop();
      let oTop = $progressBar.offset().top - window.innerHeight;
      if (scroll > oTop) {
        $progressBar.addClass("progressbar-active");
      } else {
        $progressBar.removeClass("progressbar-active");
      }
    }
  });
  /*-----------------------------------
        16. Preloader   
    -----------------------------------*/
  $(window).on("load", function () {
    $(".tz-preloader").fadeOut(1000);
  });

  // Footer container width

  $(window).on("load resize ", function (e) {
    const windowWidth = $(window).width();
    let containerWidth = $(".container").width();
    let footerBrandWidth = $(".tz-footer__brand").width();
    let actualWidth = windowWidth - containerWidth;
    $(".tz-footer__shape").css({
      width: actualWidth / 2 + footerBrandWidth + 2 + "px",
      position: "absolute",
      height: "100%",
      left: "0",
      top: "0",
      backgroundColor: "#171717",
    });
  });

  // mosue move

  const elements = document.querySelectorAll(".follow-mouse");

  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;

    // Normalize to range [-10px, +10px]
    const offsetX = (e.clientX / innerWidth - 0.5) * 20;
    const offsetY = (e.clientY / innerHeight - 0.5) * 20;

    elements.forEach((el) => {
      el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  //mouse move end

  jQuery(window).on( 'load', function(){

  //wow Animation
  new WOW().init();
  window.wow = new WOW(
    {
    boxClass:     'wow',     
    animateClass: 'animated',
    offset:       0,         
    mobile:       true,      
    live:         true,       
    offset: 100
  }
  )
  window.wow.init();

});


})(jQuery); // End jQuery
