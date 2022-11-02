
// sets a timout for flash messages to disappear
function flashTimout(node) {
    setTimeout(function() {
        node.style.display = 'none';
    }, 5000);

    // add disapear on mouse over
    node.addEventListener('mouseover', function() {
        node.style.display = 'none';
    });
}

const flashes = document.querySelectorAll('.flash-container');

if (flashes.length) {
    flashes.forEach(flash => {
        flashTimout(flash);
    });
}

