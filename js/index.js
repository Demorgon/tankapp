Marquee3k.init();

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 750,
    speedAsDuration: true
});

function navScroll(id) {
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 750,
        speedAsDuration: true
    });
    var anchor = document.querySelector(id);
    scroll.animateScroll(anchor);
}

function classToggle() {
    var menu = document.querySelector("#fullscreen-menu");
    menu.classList.toggle('fullscreen-menu--opened');
    menu.classList.toggle('fullscreen-menu--closed');
}

function fullscreenNav(id) {
    classToggle();
    setTimeout(navScroll, 400, id);
}
