$ = document.querySelector.bind(document); 
$$ = document.querySelectorAll.bind(document);

const sliderItems = $$('.slider--item');
const totalSlides = sliderItems.length;
const slider = $('.slider--width');
const sliderControl = $$('.slider--control img');
const marginSlideConfig = 15;
let widthSlideItem; 
let numberSliderItems;

slider.style.marginLeft = `${marginSlideConfig / 2}px`;
sliderItems.forEach(item => {
    item.style.marginRight = `${marginSlideConfig}px`;
    item.style.marginLeft = '0px';
});

window.addEventListener('resize', () => {
    numberSliderItems = numberOfSliderItemsRelatedToScreenWidth();
    setWidthSliderItems(numberSliderItems);
    $$('.slider--item')[0].style.marginLeft = `-${widthSlideItem + marginSlideConfig}px`;
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

function goNext(){
    updateMargin(1);
}

function goPrev(){
    updateMargin(2);
}

function updateMargin(control){
    const slides = $$('.slider--item');
    if(control === 1){
        slides[1].style.marginLeft = `-${widthSlideItem + marginSlideConfig}px`;
        setTimeout(()=>{
            slider.appendChild(slides[0]);
            $$('.slider--item')[slides.length - 1].style.marginLeft = "0px";
        }, 100);  
    }
    if(control === 2){
        $$('.slider--item')[0].style.marginLeft = "0px";
        setTimeout(()=>{
            slides[slides.length - 1].style.marginLeft = `-${widthSlideItem + marginSlideConfig}px`;
            slider.prepend(slides[slides.length - 1]);
        }, 100);  
    } 
}

sliderControl[0].addEventListener('click', goPrev);
sliderControl[1].addEventListener('click', goNext);

numberSliderItems = numberOfSliderItemsRelatedToScreenWidth();
setWidthSliderItems(numberSliderItems);
setWidthSliderWidth();

slider.prepend(sliderItems[sliderItems.length - 1]);
$$('.slider--item')[0].style.marginLeft = `-${widthSlideItem + marginSlideConfig}px`;

window.addEventListener('load', ()=>{
    sliderItems.forEach(item => {
        item.style.transition = "all ease 0.5s";
    });
});