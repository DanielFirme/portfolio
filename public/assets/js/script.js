const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


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
    });
});

window.addEventListener('scroll', ()=>{
    
    menuItemActiveScroll();

    if(mousePositionX >= document.body.clientWidth){
        mousePositionY = -($('body').getBoundingClientRect().top);
        (mousePositionY >= 80) ? $('header').style.top = '-80px' : $('header').style.top = '0'; 
    }else {
        (mousePositionY >= 80 && window.scrollY >= 80) ? $('header').style.top = '-80px' : $('header').style.top = '0';
    } 
});

window.addEventListener('mousemove', (e)=>{
    mousePositionY = e.clientY;
    mousePositionX = e.clientX;
    if(mousePositionY >= 80 && window.scrollY >= 10){
        $('header').style.top = '-80px';
    }else {
        $('header').style.top = '0';
    }
});

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

