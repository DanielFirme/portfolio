const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


let mousePositionY, mousePositionX;

$$('header a').forEach(a=>{
    a.addEventListener('click', (e)=>{
        e.preventDefault();
        $('li.m--active').classList.remove('m--active');
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
    
    itemMenuActiveScroll();

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

function itemMenuActiveScroll() {
    const hrefAMenu = [...$$('section')].map(e => {
        if(e.getBoundingClientRect().top >= -125 && e.getBoundingClientRect().top < 125){
            return `#${e.getAttribute('id')}`;
        } else {
            return "";
        }
    }).join('');
    
    if(hrefAMenu !== ''){
        $('.m--active').classList.remove('m--active');
        $( `a[href="${hrefAMenu}"]`).parentNode.classList.add('m--active');
    }
}

