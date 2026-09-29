(function ($) {
    'use strict';

    var $constrom_window = $(window);
    var reen_window = $(window);

    // ****************************
    // :: 01.0 Preloader Active Code
    // ****************************

    $constrom_window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // ****************************
    // :: 02.0 ClassyNav Active Code
    // ****************************

    if ($.fn.classyNav) {
        $('#onitaNav').classyNav({
            stickyNav: true,
        });
    }

    // :: Sticky Active Code
    reen_window.on('scroll', function () {
        if (reen_window.scrollTop() > 0) {
            $('.header-area').addClass('sticky');
        } else {
            $('.header-area').removeClass('sticky');
        }
    });

    // *********************************
    // :: 03.0 Welcome Slides Active Code
    // *********************************

    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            autoplayTimeout: 5000,
            nav: false
        });

        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides-2');
        welcomeSlider.owlCarousel({
            items: 3,
            loop: true,
            margin: 0,
            autoplay: true,
            smartSpeed: 1000,
            autoplayTimeout: 5000,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    item: 2
                }
            }
        })

        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    // ************************************
    // :: 04.0 Instragram Slides Active Code
    // ************************************

    if ($.fn.owlCarousel) {
        var clientArea = $('.clint-area');
        clientArea.owlCarousel({
            items: 3,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 30,
            autoplayTimeout: 5000,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    if ($.fn.owlCarousel) {
        var projectArea = $('.project-area');
        projectArea.owlCarousel({
            items: 2,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 20,
            autoplayTimeout: 7000,
            nav: true,
            navText: [('<i class="arrow_carrot-left"></i>'), ('<i class="arrow_carrot-right"></i>')],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });
    }

    if ($.fn.owlCarousel) {
        var sposorArea = $('.sposor-area');
        sposorArea.owlCarousel({
            items: 5,
            loop: true,
            autoplay: true,
            smartSpeed: 700,
            margin: 20,
            autoplayTimeout: 400,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                768: {
                    items: 5
                }
            }
        });
    }

    // ***********************************
    // :: 07.0 Counter Up Active Code
    // ***********************************
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // ********************************
    // :: 08.0 Search Button Active Code
    // ********************************
    $('.search-btn').on('click', function () {
        $('.search-form').toggleClass('search-form-active');
    })

    // ************************
    // :: 09.0 Stick Active Code
    // ************************

    $constrom_window.on('scroll', function () {
        if ($constrom_window.scrollTop() > 0) {
            $('.main-header-area').addClass('sticky');
        } else {
            $('.main-header-area').removeClass('sticky');
        }
    });

    // ***************************************
    // :: 10.0 Magnific-popup Video Active Code
    // ****************************************

    if ($.fn.magnificPopup) {
        $('#videobtn').magnificPopup({
            type: 'iframe'
        });
        $('.gallery_img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            preloader: true
        });
    }

    if ($.fn.magnificPopup) {
        $('#videobtn2').magnificPopup({
            type: 'iframe'
        });
    }

    // ***************************************
    // :: 11.0 Masonary Gallery Active Code
    // ****************************************

    // :: Masonary Gallery Active Code
    if ($.fn.imagesLoaded) {
        $('.reen-portfolio').imagesLoaded(function () {
            // filter items on button click
            $('.portfolio-menu').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            // init Isotope
            var $grid = $('.reen-portfolio').isotope({
                itemSelector: '.single_gallery_item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.single_gallery_item'
                }
            });
        });
    }

    // :: allery Menu Style Active Code
    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active');
        $(this).addClass('active');
    })

    // Color Picker Active Code
    $(".select_opt").click(function () {
        var getId = $(this).attr('value');
        $('body').removeClass('purple blue green orange yellow deep-orange red cyan teal pink').addClass(getId);
    });

    // Color Picker Active Code
    $(".color_picker_switcher").on('click', function () {
        $(".color_picker_area").toggleClass('on');
    })


    // ***************************************
    // :: 12.0 Allery Menu Style Active Code
    // ****************************************

    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active');
        $(this).addClass('active');
    })

    // **************************
    // :: 13.0 Tooltip Active Code
    // **************************
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // ***********************
    // :: 14.0 WOW Active Code
    // ***********************
    if ($constrom_window.width() > 767) {
        new WOW().init();
    }

    // ****************************
    // :: 15.0 Jarallax Active Code
    // ****************************
    if ($.fn.jarallax) {
        $('.jarallax').jarallax({
            speed: 0.5
        });
    }

    // ****************************
    // :: 16.0 Countdown Active Code
    // ****************************
    if ($.fn.countdown) {
        $("#clock").countdown("2019/08/10", function (event) {
            $(this).html(event.strftime("<div>%D <span>Days</span></div> <div>%H <span>Hours</span></div> <div>%M <span>Mins</span></div> <div>%S <span>Secs</span></div>"));
        });
    }

    // ******************************
    // :: 13.0 ScrollDown Active Code
    // ******************************

    $("#scrollDown").on('click', function () {
        $('html, body').animate({
            scrollTop: $("#about").offset().top - 0
        }, 1000);
    });


    // ****************************
    // :: 17.0 Scrollup Active Code
    // ****************************
    if ($.fn.scrollUp) {
        $constrom_window.scrollUp({
            scrollSpeed: 1000,
            scrollText: '<i class="arrow_carrot-up"</i>'
        });
    }

    // ********************************
    // :: 18.0 One Page Nav Active Code
    // ********************************

    if ($.fn.onePageNav) {
        $('#nav').onePageNav({
            currentClass: 'active',
            scrollSpeed: 1000,
            easing: 'easeOutQuad'
        });
    }

    // *********************************
    // :: 19.0 Prevent Default 'a' Click
    // *********************************
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

})(jQuery)