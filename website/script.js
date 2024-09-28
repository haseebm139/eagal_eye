$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true, // Infinite loop
        margin: 10, // Space between items
        nav: true, // Show navigation arrows
        dots: true, // Show pagination dots
        autoplay: true, // Enable autoplay
        autoplayTimeout: 3000, // Time between slides
        responsive: {
            0: {
                items: 1 // 1 item on small screens
            },
            600: {
                items: 2 // 2 items on medium screens
            },
            1000: {
                items: 3 // 3 items on large screens
            }
        }
    });
});
