$ = document.querySelector.bind(document); 
$$ = document.querySelectorAll.bind(document);

window.addEventListener('resize', () => {
    setWidthSliderItems();
});
const totalSlides = $$('.slider--item').length;
const slider = $('.slider--width');

$('.slider--width').style.width = `calc(100vw * ${totalSlides})`;
const sliderControl = $$('.slider--control');

function setWidthSliderItems() {
    const widthSlider = $(".slider").offsetWidth;
    const widthSlideItem = `${widthSlider / 3}px`;
    $$(".slider--item").forEach(item => {
        item.style.width = widthSlideItem;
    });
}

function goPrev(){
    updateMargin(2);
}

function goNext(){
    updateMargin(1);
}

function updateMargin(control){
    const slides = $$('.slider--item');
    if(control === 1){
        slides[0].style.marginLeft = `-${$('.slider--item').clientWidth}px`;
        setTimeout(()=>{
            slider.appendChild(slides[0]);
            $$('.slider--item')[slides.length - 1].style.marginLeft = "0px";
        }, 500);
        
    }
    // if(control === 2){
    //     for(let i = 0; i < (slides.length - 1); i++){
    //         slider.append(slides[i]);
    //     }
    //     $$('.slider--item')[0].style.transition = "none";
    //     $$('.slider--item')[0].style.marginLeft = `-${$('.slider--item').clientWidth}px`;
    //     setTimeout(()=>{
    //         $$('.slider--item')[0].style.transition = "all ease 0.5s";
    //         $$('.slider--item')[0].style.marginLeft = "0px";
    //     }, 0.00000000000000000000000000000000000000000001);  
    // }
    if(control === 2){
        slider.prepend(slides[slides.length - 1]);
        $$('.slider--item')[0].style.transition = "none";
        $$('.slider--item')[0].style.marginLeft = `-${$('.slider--item').clientWidth}px`;
        setTimeout(()=>{
            $$('.slider--item')[0].style.transition = "all ease 0.5s";
            $$('.slider--item')[0].style.marginLeft = "0px";
        }, 0.00000000000000000000000000000000000000000001);  
    } 
}

sliderControl[0].addEventListener('click', goPrev);
sliderControl[1].addEventListener('click', goNext);

setWidthSliderItems();