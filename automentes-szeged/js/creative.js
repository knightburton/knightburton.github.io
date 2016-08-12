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
google.maps.event.addDomListener(window, 'load', initMap);
google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(new google.maps.LatLng(46.36336, 20.10201));
});
function initMap() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(46.36336, 20.10201), // Sandorfalva
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
    var myLatLng = new google.maps.LatLng(46.36336, 20.10201);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
    });
}