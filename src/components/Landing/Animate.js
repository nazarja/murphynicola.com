import { TimelineLite, TweenLite, Power1, Power2 } from 'gsap/all';

export const animate = (imagesRef, textRef, barsRef) => {
    const images = [...imagesRef.current.querySelectorAll('div')]
    const text = [...textRef.current.querySelectorAll('.text-slide')]
    const bars = [...barsRef.current.querySelectorAll('.bar')]
    const image0 = images[0];
    const image1 = images[1];
    const image2 = images[2];
    const image3 = images[3];
    const text0 = text[0];
    const text1 = text[1];
    const text2 = text[2];
    const text3 = text[3];
    const bar0 = bars[0];
    const bar1 = bars[1];
    const bar2 = bars[2];
    const bar3 = bars[3];
    const img0 = image0.querySelector('img');
    const img1 = image1.querySelector('img');
    const img2 = image2.querySelector('img');
    const img3 = image3.querySelector('img');

    TweenLite.fromTo(text0, { y: '-5vh', transform: 'scaleX(0.4)' }, { y: '11vh', transform: 'scaleX(1)', ease: Power1.easeInOut, duration: .75 })
    TweenLite.fromTo(image0, { x: '95vw' }, { x: '0vw', ease: Power2.easeInOut, duration: 1 })

    const tl = new TimelineLite({ repeat: -1 });
    tl.to(bar0, .2, { backgroundColor: '#bbbbbb', height: '16px' })
    tl.to(img0, .3, { transform: 'scale(.9)', delay: -.5 })
    tl.to(img0, .3, { transform: 'scale(.8)', delay: 1 })
    tl.to(image0, 2, { x: '-100vw', ease: Power2.easeInOut, delay: .5, duration: 1 })
    tl.to(text0, { y: '30vh', ease: Power1.easeInOut, duration: 1 }, '-=2')
    tl.to(bar0, .1, { backgroundColor: '#666666', height: '10px' })

    tl.to(bar1, .2, { backgroundColor: '#bbbbbb', height: '16px' }, '-=.5')
    tl.fromTo(image1, { x: '95vw' }, { x: '0vw', ease: Power2.easeInOut, duration: 1 }, '-=1.75')
    tl.fromTo(text1, { y: '-5vh', transform: 'scaleX(0.4)' }, { y: '11vh', transform: 'scaleX(1)', ease: Power1.easeInOut, duration: .75 }, '-=1.5')
    tl.to(img1, .3, { transform: 'scale(.9)', delay: -.5 })
    tl.to(img1, .3, { transform: 'scale(.8)', delay: 1 })
    tl.to(image1, 2, { x: '-100vw', ease: Power2.easeInOut, delay: .5, duration: 1 })
    tl.to(text1, { y: '30vh', ease: Power1.easeInOut, duration: 1 }, '-=2')
    tl.to(bar1, .1, { backgroundColor: '#666666', height: '10px' })

    tl.to(bar2, .2, { backgroundColor: '#bbbbbb', height: '16px' }, '-=.5')
    tl.fromTo(image2, { x: '95vw' }, { x: '0vw', ease: Power2.easeInOut, duration: 1 }, '-=1.75')
    tl.fromTo(text2, { y: '-5vh', transform: 'scaleX(0.4)' }, { y: '11vh', transform: 'scaleX(1)', ease: Power1.easeInOut, duration: .75 }, '-=1.5')
    tl.to(img2, .3, { transform: 'scale(.9)', delay: -.5 })
    tl.to(img2, .3, { transform: 'scale(.8)', delay: 1 })
    tl.to(image2, 2, { x: '-100vw', ease: Power2.easeInOut, delay: .5, duration: 1 })
    tl.to(text2, { y: '30vh', ease: Power1.easeInOut, duration: 1 }, '-=2')
    tl.to(bar2, .1, { backgroundColor: '#666666', height: '10px' })

    tl.to(bar3, .2, { backgroundColor: '#bbbbbb', height: '16px' }, '-=.5')
    tl.fromTo(image3, { x: '95vw' }, { x: '0vw', ease: Power2.easeInOut, duration: 1 }, '-=1.75')
    tl.fromTo(text3, { y: '-5vh', transform: 'scaleX(0.4)' }, { y: '11vh', transform: 'scaleX(1)', ease: Power1.easeInOut, duration: .75 }, '-=1.5')
    tl.to(img3, .3, { transform: 'scale(.9)', delay: -.5 })
    tl.to(img3, .3, { transform: 'scale(.8)', delay: 1 })
    tl.to(image3, 2, { x: '-100vw', ease: Power2.easeInOut, delay: .5, duration: 1 })
    tl.to(text3, { y: '30vh', ease: Power1.easeInOut, duration: 1 }, '-=2')
    tl.to(bar3, .1, { backgroundColor: '#666666', height: '10px' })

    tl.fromTo(image0, { x: '95vw' }, { x: '0vw', ease: Power2.easeInOut, duration: 1 }, '-=1.75')
    tl.fromTo(text0, { y: '-5vh', transform: 'scaleX(1)' }, { y: '11vh', transform: 'scaleX(1)', ease: Power1.easeInOut, duration: .75 }, '-=1.5')
};
