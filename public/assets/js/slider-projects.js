$ = document.querySelector.bind(document); 
$$ = document.querySelectorAll.bind(document);

const sliderItems = $$('.slider--item');
const totalSlides = sliderItems.length;
const slider = $('.slider--width');
const sliderControl = $$('.slider--control');
const marginSlideConfig = 15;
let widthSlideItem; 
let numberSliderItems;

slider.style.marginLeft = `${marginSlideConfig / 2}px`;
sliderItems.forEach(item => {
    item.style.marginRight = `${marginSlideConfig}px`;
});

window.addEventListener('resize', () => {
    numberSliderItems = numberOfSliderItemsRelatedToScreenWidth();
    setWidthSliderItems(numberSliderItems);
    setWidthSliderWidth();
});

function numberOfSliderItemsRelatedToScreenWidth(){
    const screenWidth = $('body').clientWidth;
    if(screenWidth >= 840){
        return 3;
    } else if (screenWidth < 840 && screenWidth > 430){
        return 2;
    } else {
        return 1;
    }
}

function setWidthSliderItems(numberSliderItems) {
    const widthSlider = $(".slider").offsetWidth;
    widthSlideItem = (widthSlider / numberSliderItems) - marginSlideConfig;
    sliderItems.forEach(item => {
        item.style.width = `${widthSlideItem}px`;
    });
}

function setWidthSliderWidth() {
    $('.slider--width').style.width = `${totalSlides * (widthSlideItem + marginSlideConfig)}px`;
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
        slides[0].style.marginLeft = `-${$('.slider--item').offsetWidth + marginSlideConfig}px`;
        setTimeout(()=>{
            slider.appendChild(slides[0]);
            $$('.slider--item')[slides.length - 1].style.marginLeft = "0px";
        }, 500);
        
    }
    if(control === 2){
        slider.prepend(slides[slides.length - 1]);
        $$('.slider--item')[0].style.transition = "none";
        $$('.slider--item')[0].style.marginLeft = `-${$('.slider--item').offsetWidth + marginSlideConfig}px`;
        setTimeout(()=>{
            $$('.slider--item')[0].style.transition = "all ease 0.5s";
            $$('.slider--item')[0].style.marginLeft = "0px";
        }, 0.00000000000000000000000000000000000000000001);  
    } 
}

sliderControl[0].addEventListener('click', goPrev);
sliderControl[1].addEventListener('click', goNext);

numberSliderItems = numberOfSliderItemsRelatedToScreenWidth();
setWidthSliderItems(numberSliderItems);
setWidthSliderWidth();