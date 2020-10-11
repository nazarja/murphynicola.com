import { gsap } from 'gsap';
import { map, lerp, clamp, getMousePos } from '../Other/utils/utils';

let mousepos = { x: 0, y: 0 };
let mousePosCache = mousepos;
let direction = { x: mousePosCache.x - mousepos.x, y: mousePosCache.y - mousepos.y };
window.addEventListener('mousemove', event => mousepos = getMousePos(event));

export default class WorkItem {
    constructor(el, inMenuPosition, animatableProperties, url, images) {
        this.DOM = { el: el };
        this.url = url;
        this.images = images;
        this.inMenuPosition = inMenuPosition;
        this.animatableProperties = animatableProperties;
        this.DOM.textInner = this.DOM.el.querySelector('.menu-item-textinner');
        this.layout();
        this.initEvents();
    };

    layout() {
        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover-reveal';
        this.DOM.reveal.style.transformOrigin = '0% 0%';
        this.DOM.revealInner = document.createElement('div');
        this.DOM.revealInner.className = 'hover-reveal-inner';
        this.DOM.revealImage = document.createElement('div');
        this.DOM.revealImage.className = 'hover-reveal-img';
        this.DOM.revealImage.style.backgroundImage = `url(${this.url})`;
        this.DOM.revealInner.appendChild(this.DOM.revealImage);
        this.DOM.reveal.appendChild(this.DOM.revealInner);
        this.DOM.el.appendChild(this.DOM.reveal);
    };

    getMouseArea() {
        return this.bounds.el.top + this.bounds.el.height / 2 <= window.innerHeight / 2 ? 'up' : 'down';
    };

    calcBounds() {
        this.bounds = {
            el: this.DOM.el.getBoundingClientRect(),
            reveal: this.DOM.reveal.getBoundingClientRect()
        };
    };

    initEvents() {
        this.mouseenterFn = (ev) => {
            this.showImage();
            this.firstRAFCycle = true;
            this.DOM.reveal.style.transformOrigin = `0% ${this.mouseArea === 'up' ? 0 : 100}%`;
            this.loopRender();
        };
        this.mouseleaveFn = () => {
            this.stopRendering();
            this.hideImage();
        };

        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    };

    showImage() {
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);

        this.tl = gsap.timeline({
            onStart: () => {
                this.DOM.reveal.style.opacity = this.DOM.revealInner.style.opacity = 1;
                gsap.set(this.DOM.el, { zIndex: this.images.length });
            }
        })
            .to(this.DOM.revealInner, 0.6, {
                ease: 'Expo.easeOut',
                startAt: { scale: 0.6 },
                scale: 1
            })
            .to(this.DOM.revealImage, 0.6, {
                ease: 'Expo.easeOut',
                startAt: { scale: 1.4 },
                scale: 1
            }, 0);
    };

    hideImage() {
        gsap.killTweensOf(this.DOM.revealInner);
        gsap.killTweensOf(this.DOM.revealImage);

        this.tl = gsap.timeline({
            onStart: () => {
                gsap.set(this.DOM.el, { zIndex: 1 });
            },
            onComplete: () => {
                gsap.set(this.DOM.reveal, { opacity: 0 });
            }
        })
            .to(this.DOM.revealInner, 0.6, {
                ease: 'Expo.easeOut',
                scale: 0.6,
                opacity: 0
            })
            .to(this.DOM.revealImage, 0.6, {
                ease: 'Expo.easeOut',
                scale: 1.4
            }, 0);
    };

    loopRender() {
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(() => this.render());
        }
    };

    stopRendering() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    };

    render() {
        this.requestId = undefined;

        if (this.firstRAFCycle) {
            this.calcBounds();
            this.mouseArea = this.getMouseArea();
        }

        const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
        direction = { x: mousePosCache.x - mousepos.x, y: mousePosCache.y - mousepos.y };
        mousePosCache = { x: mousepos.x, y: mousepos.y };

        this.animatableProperties.tx.current = Math.abs(mousepos.x - this.bounds.el.left);
        this.animatableProperties.ty.current = this.mouseArea === 'up' ? Math.abs(mousepos.y - 202) : Math.abs(mousepos.y - 202) - this.bounds.reveal.height;
        this.animatableProperties.rotation.current = this.firstRAFCycle ? 0 : map(mouseDistanceX, 0, 175, 0, direction.x < 0 ? this.mouseArea === 'up' ? 60 : -60 : this.mouseArea === 'up' ? -60 : 60);
        this.animatableProperties.brightness.current = this.firstRAFCycle ? 1 : map(mouseDistanceX, 0, 100, 1, 8);

        this.animatableProperties.tx.previous = this.firstRAFCycle ? this.animatableProperties.tx.current : lerp(this.animatableProperties.tx.previous, this.animatableProperties.tx.current, this.animatableProperties.tx.amt);
        this.animatableProperties.ty.previous = this.firstRAFCycle ? this.animatableProperties.ty.current : lerp(this.animatableProperties.ty.previous, this.animatableProperties.ty.current, this.animatableProperties.ty.amt);
        this.animatableProperties.rotation.previous = this.firstRAFCycle ? this.animatableProperties.rotation.current : lerp(this.animatableProperties.rotation.previous, this.animatableProperties.rotation.current, this.animatableProperties.rotation.amt);
        this.animatableProperties.brightness.previous = this.firstRAFCycle ? this.animatableProperties.brightness.current : lerp(this.animatableProperties.brightness.previous, this.animatableProperties.brightness.current, this.animatableProperties.brightness.amt);

        gsap.set(this.DOM.reveal, {
            x: this.animatableProperties.tx.previous,
            y: this.animatableProperties.ty.previous,
            rotation: this.animatableProperties.rotation.previous,
            filter: `brightness(${this.animatableProperties.brightness.previous})`,
        });

        this.firstRAFCycle = false;
        this.loopRender();
    };
};