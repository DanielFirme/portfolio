"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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

window.addEventListener('scroll', (e)=>{
    if(window.scrollY >= 10 && e.clientY >= 80){
        $('header').style.top = '-80px';
    }else {
        $('header').style.top = '0';
    }
});

window.addEventListener('mousemove', (e)=>{
    if(e.clientY >= 80 && window.scrollY >= 10){
        $('header').style.top = '-80px';
    }else {
        $('header').style.top = '0';
    }
});