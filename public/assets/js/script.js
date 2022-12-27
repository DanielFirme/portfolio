(function(){
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    let mousePositionY, mousePositionX;
    const menuMobile = $('header nav');
    const mmLines = $$('.mm--line');
    const bodyWidthMobile = 660;
    const navActive = 'navActive';

    $$('header a').forEach(a=>{
        a.addEventListener('click', (e)=>{
            e.preventDefault();
            const hrefAMenu = e.target.getAttribute('href');
            menuItemActive(hrefAMenu);
            const positionScroll = $(`${hrefAMenu}`).offsetTop;
            jQuery('html, body').animate({scrollTop : positionScroll},1500, 'easeInOutExpo');

            // window.scrollTo({
            //     top: positionScroll,
            //     left: 0,
            //     behavior: "smooth"
            // });
            menuMobile.classList.remove(navActive);
            mmLines[0].classList.remove('icon--close--1');
            mmLines[1].classList.remove('icon--close--2');
            mmLines[2].classList.remove('icon--close--3');
        });
    });

    $('.menu--mobile').addEventListener('click', ()=>{
        menuMobile.classList.toggle(navActive);
        mmLines[0].classList.toggle('icon--close--1');
        mmLines[1].classList.toggle('icon--close--2');
        mmLines[2].classList.toggle('icon--close--3');
    });

    window.addEventListener('resize', ()=>{
        const bodyWidth = document.body.clientWidth;
        const condition = bodyWidth > bodyWidthMobile;
        headerTopPosition(condition);
        if(condition){
            menuMobile.classList.remove(navActive);
            mmLines[0].classList.remove('icon--close--1');
            mmLines[1].classList.remove('icon--close--2');
            mmLines[2].classList.remove('icon--close--3');
        }
    });

    window.addEventListener('scroll', ()=>{
        
        menuItemActiveScroll();

        const bodyWidth = document.body.clientWidth;

        if (bodyWidth > bodyWidthMobile) {
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

        if (bodyWidth > bodyWidthMobile) {
            headerTopPosition(mousePositionY >= 80 && window.scrollY >= 10);
        }
    });

    function headerTopPosition(condition){
        (condition)
            ? $('header').style.top = '-80px' 
            : $('header').style.top = '0';
    }

    function menuItemActiveScroll() {
        const hrefAMenu = [...$$('section')].map(section => {
            if(section.getBoundingClientRect().top >= -125 && section.getBoundingClientRect().top < 125){
                return `#${section.getAttribute('id')}`;
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

    // Back to top button

    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.back-to-top').fadeIn('slow');
        } else {
            jQuery('.back-to-top').fadeOut('slow');
        }
    });
    jQuery('.back-to-top').on('click', function(){
        jQuery('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
        return false;
    });

    new WOW().init();

})();

