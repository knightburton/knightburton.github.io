(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);
    
})(jQuery); // End of use strict

// Google map
var map = null;
var SFLat = 46.3710238;
var SFLong = 20.09168520000003;
google.maps.event.addDomListener(window, 'load', initMap);
google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(new google.maps.LatLng(SFLat, SFLong));
});
function initMap() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(SFLat, SFLong),
        disableDefaultUI: true,
        scrollwheel: false,
        style: [{
            "featureType":"administrative.locality",
            "elementType":"geometry",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"administrative.locality",
            "elementType":"geometry.fill",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"administrative.locality",
            "elementType":"geometry.stroke",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"administrative.locality",
            "elementType":"labels.icon",
            "stylers": [{
                "visibility":"on"
            }, {
                "hue":"#00ff66"
            }]
        }, {
            "featureType":"administrative.neighborhood",
            "elementType":"geometry",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"administrative.neighborhood",
            "elementType":"labels",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"geometry",
            "stylers": [{
                "visibility":"on"
            }, {
                "hue":"#ff003d"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"geometry.fill",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"geometry.stroke",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"labels",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"labels.text",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"labels.text.fill",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"labels.text.stroke",
            "stylers": [{
                "visibility":"on"
            }]
        }, {
            "featureType":"poi.place_of_worship",
            "elementType":"labels.icon",
            "stylers": [{
                "visibility":"on"
            }]
        }]
    };
    var mapElement = document.getElementById('map');
    map = new google.maps.Map(mapElement, mapOptions);
    var myLatLng = new google.maps.LatLng(SFLat, SFLong);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
    });
}

jQuery(document).ready(function ($) {
    var options = {
        $AutoPlay: true,
        $AutoPlaySteps: 1,
        $Idle: 3000,
        $PauseOnHover: 1,

        $ArrowKeyNavigation: true,
        $SlideEasing: $JssorEasing$.$EaseOutQuint,
        $SlideDuration: 1500,
        $MinDragOffsetToSlide: 20,
        //$SlideWidth: 600,
        //$SlideHeight: 300,
        $SlideSpacing: 5,
        $Cols: 1,
        $ParkingPosition: 0,
        $UISearchMode: 1,
        $PlayOrientation: 1,
        $DragOrientation: 1,

        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$,
            $ChanceToShow: 2,
            $AutoCenter: 2,
            $Steps: 1,
            $Scale: false
        },

        $BulletNavigatorOptions: {
            $Class: $JssorBulletNavigator$,
            $ChanceToShow: 2,
            $AutoCenter: 1,
            $Steps: 1,
            $Rows: 1,
            $SpacingX: 12,
            $SpacingY: 4,
            $Orientation: 1,
            $Scale: false
        }
    };

    var jssor_slider1 = new $JssorSlider$("slider1_container", options);

    //responsive code begin
    function ScaleSlider() {
        var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
        if (parentWidth) {
            jssor_slider1.$ScaleWidth(parentWidth - 30);
        } else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end
});