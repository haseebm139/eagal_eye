// Add this JavaScript to toggle the background color on click
document.querySelectorAll('.btn3').forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.style.backgroundColor = '#FFC107'; // Change background color to yellow
    });
});


// Select all clickable images
document.querySelectorAll('.clickable-img').forEach((img) => {
    img.addEventListener('click', function () {
        // Update the src of the main image
        document.getElementById('displayed-image').src = img.src;
    });
});

