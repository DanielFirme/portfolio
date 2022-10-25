"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let mousePositionY;
const screenHeight = $('section').clientHeight;

$$('header a').forEach(a=>{
    a.addEventListener('click', (e)=>{
        e.preventDefault();
        $('.m--active').classList.remove('m--active');
        e.target.parentNode.classList.add('m--active');
        const positionScroll = $(`${e.target.getAttribute('href')}`).offsetTop;
        window.scrollTo({
            top: positionScroll,
            left: 0,
            behavior: "smooth"
        });
    });
});

window.addEventListener('scroll', ()=>{
    if(window.scrollY >= 0 && window.scrollY <= 0.5 * screenHeight){
        $('.m--active').classList.remove('m--active');
        $('a[href="#hm"]').parentNode.classList.add('m--active');
    } else if(window.scrollY > 0.5 * screenHeight && window.scrollY <= 1.5 * screenHeight){
        $('.m--active').classList.remove('m--active');
        $('a[href="#am"]').parentNode.classList.add('m--active');
    } else if(window.scrollY > 1.5 * screenHeight && window.scrollY <= 2.5 * screenHeight){
        $('.m--active').classList.remove('m--active');
        $('a[href="#tc"]').parentNode.classList.add('m--active');
    } else if(window.scrollY > 2.5 * screenHeight && window.scrollY <= 3.5 * screenHeight){
        $('.m--active').classList.remove('m--active');
        $('a[href="#pj"]').parentNode.classList.add('m--active');
    } else {
        $('.m--active').classList.remove('m--active');
        $('a[href="#ct"]').parentNode.classList.add('m--active');
    }

    if(window.scrollY >= 10 && mousePositionY >= 80){
        $('header').style.top = '-80px';
    }else{
        $('header').style.top = '0';
    }
});

window.addEventListener('mousemove', (e)=>{
    mousePositionY = e.clientY;
    if(mousePositionY >= 80 && window.scrollY >= 10){
        $('header').style.top = '-80px';
    }else {
        $('header').style.top = '0';
    }
});

