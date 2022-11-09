const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const menuMobile = $('nav ul');
let mousePositionY, mousePositionX;

$$('header a').forEach(a=>{
    a.addEventListener('click', (e)=>{
        e.preventDefault();
        const hrefAMenu = e.target.getAttribute('href');
        menuItemActive(hrefAMenu);
        const positionScroll = $(`${hrefAMenu}`).offsetTop;
        window.scrollTo({
            top: positionScroll,
            left: 0,
            behavior: "smooth"
        });
        menuMobile.classList.remove('ulActive');
    });
});

$('.menu--mobile').addEventListener('click', ()=>{
    menuMobile.classList.toggle('ulActive');
});

window.addEventListener('resize', ()=>{
    const bodyWidth = document.body.clientWidth;
    const condition = bodyWidth > 540;
    headerTopPosition(condition);
    if(condition){
        menuMobile.classList.remove('ulActive');
    }
});

window.addEventListener('scroll', ()=>{
    
    menuItemActiveScroll();

    const bodyWidth = document.body.clientWidth;

    if (bodyWidth > 540) {
        if(mousePositionX >= bodyWidth){
            mousePositionY = -($('body').getBoundingClientRect().top);
            headerTopPosition(mousePositionY >= 80); 
        }else {
            headerTopPosition(mousePositionY >= 80 && window.scrollY >= 80);
        } 
    }
     
});

window.addEventListener('mousemove', (e)=>{
    mousePositionY = e.clientY;
    mousePositionX = e.clientX;
    const bodyWidth = document.body.clientWidth;

    if (bodyWidth > 540) {
        headerTopPosition(mousePositionY >= 80 && window.scrollY >= 10);
    }
});

function headerTopPosition(condition){
    (condition)
        ? $('header').style.top = '-80px' 
        : $('header').style.top = '0';
}

function menuItemActiveScroll() {
    const hrefAMenu = [...$$('section')].map(e => {
        if(e.getBoundingClientRect().top >= -125 && e.getBoundingClientRect().top < 125){
            return `#${e.getAttribute('id')}`;
        } else {
            return "";
        }
    }).join('');
    
    if(hrefAMenu !== ''){
        menuItemActive(hrefAMenu);
    }
}

function menuItemActive(hrefAMenu){
    $('li.m--active').classList.remove('m--active');
    $( `li a[href="${hrefAMenu}"]`).parentNode.classList.add('m--active');
}

