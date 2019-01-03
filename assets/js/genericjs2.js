(function ($) {
    var $window = $(window),
        $body = $('body'),
        settings = {
            parallax: true,
            parallaxFactor: 5
        };
    breakpoints({
        xlarge: ['1367px', '1680px'],
        large: ['981px', '1366px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });
    $('<div id="navButton">' + '<a href="#navPanel" class="toggle"></a>' + '</div>').appendTo($body);
    $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>').appendTo($body).panel({
        delay: 500,
        hideOnClick: true,
        resetScroll: true,
        resetForms: true,
        side: 'top',
        target: $body,
        visibleClass: 'navPanel-visible'
    });
    if (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) settings.parallax = false;
    if (settings.parallax) {
        var $dummy = $(),
            $bg;
        $window.on('scroll.locus_parallax', function () {
            $bg.css('background-position', 'top left, center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
        }).on('resize.locus_parallax', function () {
            if (breakpoints.active('<=medium')) {
                $body.css('background-position', 'top left, top center');
                $bg = $dummy;
            } else $bg = $body;
            $window.triggerHandler('scroll.locus_parallax');
        }).trigger('resize.locus_parallax');
    }
})(jQuery);
