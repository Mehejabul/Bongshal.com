$(document).ready(function(){
    // Initialize Slick Slider for the top banner (UNCHANGED)
    $('.top-banner-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: $('.top-banner-item .arrow-left'),
        nextArrow: $('.top-banner-item .arrow-right'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });
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
    $('.menu-toggle').on('click', function() {
        $('.sidebar-menu').addClass('active');
        $('.sidebar-overlay').fadeIn(300);
        $('body').addClass('no-scroll');
        resetSidebarLevels();
    });

    // Close Sidebar completely
    $('.sidebar-overlay').on('click', function() {
        $('.sidebar-menu').removeClass('active');
        $('.sidebar-overlay').fadeOut(300);
        $('body').removeClass('no-scroll');
        resetSidebarLevels();
    });

    // Handle submenu opening
    $('.has-submenu').on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).data('target');
        var $currentLevel = $(this).closest('.sidebar-level');
        $currentLevel.removeClass('active').css('transform', 'translateX(-100%)');
        setTimeout(function() {
            var $targetLevel = $('#' + targetId);
            $targetLevel.css('transition', 'none');
            $targetLevel.css('transform', 'translateX(100%)');
            $targetLevel[0].offsetHeight;
            $targetLevel.css('transition', 'transform 0.3s ease-in-out');
            $targetLevel.addClass('active').css('transform', 'translateX(0%)');

        }, 50); 
    });

    // Handle 'Back to Parent' button
    $('.back-to-parent').on('click', function(e) {
        e.preventDefault();
        var $currentLevel = $(this).closest('.sidebar-level'); 
        var $parentLevel = $('.sidebar-level.main-level'); 
        $currentLevel.removeClass('active').css('transform', 'translateX(100%)'); 
        setTimeout(function() {
            $parentLevel.css('transition', 'none'); 
            $parentLevel.css('transform', 'translateX(-100%)');
            $parentLevel[0].offsetHeight;
            $parentLevel.css('transition', 'transform 0.3s ease-in-out');
            $parentLevel.addClass('active').css('transform', 'translateX(0%)');
        }, 50); 
    });

    // Cross button functionality (close or back)
    $('.sidebar-level').on('click', '.close-sidebar', function() {
        var $currentLevel = $(this).closest('.sidebar-level');

        if ($currentLevel.hasClass('main-level')) {
            $('.sidebar-menu').removeClass('active');
            $('.sidebar-overlay').fadeOut(300);
            $('body').removeClass('no-scroll');
            resetSidebarLevels(); 
        } else {
            
            var $parentLevel = $('.sidebar-level.main-level');
            $currentLevel.removeClass('active').css('transform', 'translateX(100%)');
            setTimeout(function() {
                $parentLevel.css('transition', 'none');
                $parentLevel.css('transform', 'translateX(-100%)');
                $parentLevel[0].offsetHeight;
                $parentLevel.css('transition', 'transform 0.3s ease-in-out');
                $parentLevel.addClass('active').css('transform', 'translateX(0%)'); 
            }, 50);
        }
    });
});

//clear search button
$(document).ready(function(){

    const $searchBarInput = $('.search-bar input[type="text"]');
    const $clearSearchButton = $('.clear-search');
+
    function toggleClearButton() {
        if ($searchBarInput.val().length > 0) {
            $clearSearchButton.fadeIn(150); 
        } else {
            $clearSearchButton.fadeOut(150); 
        }
    }

    $searchBarInput.on('input', function() {
        toggleClearButton();
    });

    $clearSearchButton.on('click', function() {
        $searchBarInput.val(''); 
        toggleClearButton(); 
        $searchBarInput.focus(); 
    });
    toggleClearButton();

});