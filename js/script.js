$(document).ready(function () {
    // Initialize Slick Slider for the top banner
    $('.top-banner-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
                breakpoint: 1023,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    arrows: false
                }
            }
        ]
    });
    //review section slider start
    $(document).ready(function () {
        $('.slick-slider-reviews').slick({
            infinite: true,
            slidesToShow: 3, // Show 3 reviews at a time on larger screens
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true, // Show navigation dots
            arrows: true, // Show navigation arrows
            responsive: [{
                    breakpoint: 1024, // For screens smaller than 1024px
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        arrows: true
                    }
                },
                {
                    breakpoint: 768, // For screens smaller than 768px (tablets)
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false // Hide arrows on smaller screens for better touch experience
                    }
                },
                {
                    breakpoint: 480, // For screens smaller than 480px (mobile)
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false // Hide arrows on mobile
                    }
                }
            ]
        });
    });

    // Function to reset sidebar levels to the main level
    function resetSidebarLevels() {
        $('.sidebar-level').removeClass('active slide-left');
        $('.sidebar-level.main-level').addClass('active').css('transform', 'translateX(0%)');
        $('.sidebar-level:not(.main-level)')
            .css('transition', 'none')
            .css('transform', 'translateX(100%)');
        $('.sidebar-level:not(.main-level)')[0].offsetHeight;
        $('.sidebar-level:not(.main-level)').css('transition', 'transform 0.3s ease-in-out');
    }

    // Sidebar Toggle Functionality (open)
    $('.mobile-menu-toggle, .bottom-navbar .menu-toggle').on('click', function () {
        $('.sidebar-menu').addClass('active');
        $('.sidebar-overlay').fadeIn(300);
        $('body').addClass('no-scroll');
        resetSidebarLevels();
    });

    // Close Sidebar completely by clicking overlay or close button
    $('.sidebar-overlay, .close-sidebar').on('click', function () {
        if ($(this).hasClass('close-sidebar') && !$(this).closest('.sidebar-level').hasClass('main-level')) {
            var $currentLevel = $(this).closest('.sidebar-level');
            var $parentLevel = $('.sidebar-level.main-level');
            $currentLevel.removeClass('active').css('transform', 'translateX(100%)');
            setTimeout(function () {
                $parentLevel.css('transition', 'none');
                $parentLevel.css('transform', 'translateX(-100%)');
                $parentLevel[0].offsetHeight;
                $parentLevel.css('transition', 'transform 0.3s ease-in-out');
                $parentLevel.addClass('active').css('transform', 'translateX(0%)');
            }, 50);

        } else {
            $('.sidebar-menu').removeClass('active');
            $('.sidebar-overlay').fadeOut(300);
            $('body').removeClass('no-scroll');
            resetSidebarLevels();
        }
    });

    // Handle submenu opening
    $('.has-submenu').on('click', function (e) {
        e.preventDefault();
        var targetId = $(this).data('target');
        var $currentLevel = $(this).closest('.sidebar-level');
        $currentLevel.removeClass('active').css('transform', 'translateX(-100%)');
        setTimeout(function () {
            var $targetLevel = $('#' + targetId);
            $targetLevel.css('transition', 'none');
            $targetLevel.css('transform', 'translateX(100%)');
            $targetLevel[0].offsetHeight;
            $targetLevel.css('transition', 'transform 0.3s ease-in-out');
            $targetLevel.addClass('active').css('transform', 'translateX(0%)');

        }, 50);
    });

    // Handle 'Back to Parent' button
    $('.back-to-parent').on('click', function (e) {
        e.preventDefault();
        var $currentLevel = $(this).closest('.sidebar-level');
        var $parentLevel = $('.sidebar-level.main-level');
        $currentLevel.removeClass('active').css('transform', 'translateX(100%)');
        setTimeout(function () {
            $parentLevel.css('transition', 'none');
            $parentLevel.css('transform', 'translateX(-100%)');
            $parentLevel[0].offsetHeight;
            $parentLevel.css('transition', 'transform 0.3s ease-in-out');
            $parentLevel.addClass('active').css('transform', 'translateX(0%)');
        }, 50);
    });

    const $searchBarInputs = $('input[type="text"][placeholder="Search..."]');

    function toggleClearButton($input, $clearButton) {
        if ($input.val().length > 0) {
            $clearButton.fadeIn(150);
        } else {
            $clearButton.fadeOut(150);
        }
    }
    // Listen for input changes on ALL search bars
    $searchBarInputs.on('input', function () {
        const $currentInput = $(this);
        const $currentClearButton = $currentInput.siblings('.clear-search');
        toggleClearButton($currentInput, $currentClearButton);
    });

    $('.search-bar .clear-search').on('click', function () {
        const $currentClearButton = $(this);
        const $currentInput = $currentClearButton.siblings('input[type="text"]');
        $currentInput.val('');
        toggleClearButton($currentInput, $currentClearButton);
        $currentInput.focus();
    });

    $searchBarInputs.each(function () {
        const $currentInput = $(this);
        const $currentClearButton = $currentInput.siblings('.clear-search');
        toggleClearButton($currentInput, $currentClearButton);
    });

});