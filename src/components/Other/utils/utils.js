export const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
export const lerp = (a, b, n) => (1 - n) * a + n * b;
export const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;
export const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

export const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy };
};

export const mount = (mode, title) => {
    if (title) document.title = title;
    if (mode === 'mount') {
        document.body.parentNode.style.background = '#1c1c1c';
        document.body.style.background = '#1c1c1c';
    }
    else if (mode === 'unmount') {
        document.body.parentNode.style.background = '#efefef';
        document.body.style.background = '#efefef';
    }
};

export const isInViewport = element => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}