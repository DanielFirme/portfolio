$ = document.querySelector.bind(document); 
$$ = document.querySelectorAll.bind(document);

let sliderItems = $$('.slider--item');
const slider = $('.slider--width');
sliderItems.forEach(item => {
    const cloneItem = item.cloneNode(true);
    cloneItem.setAttribute('data-info', 'cloned');
    slider.appendChild(cloneItem);

});
sliderItems = $$('.slider--item');
const sliderControl = $$('.slider--control svg');
const marginSlideConfig = 15;
let widthTaskBox; 
let numberTasksBoxsOnScreen;

slider.style.marginLeft = `${marginSlideConfig / 2}px`;
sliderItems.forEach(item => {
    item.style.marginRight = `${marginSlideConfig}px`;
});

window.addEventListener('resize', () => {
    numberTasksBoxsOnScreen = numberOfTasksBoxsRelatedToScreenWidth();
    setWidthTaskBox(numberTasksBoxsOnScreen);
    $$('.slider--item')[0].style.marginLeft = `-${widthTaskBox + marginSlideConfig}px`;
    setWidthSliderWidth();
});

function numberOfTasksBoxsRelatedToScreenWidth(){
    const screenWidth = $('body').clientWidth;
    if(screenWidth >= 840){
        return 3;
    } else if (screenWidth < 840 && screenWidth > 430){
        return 2;
    } else {
        return 1;
    }
}

function setWidthTaskBox(numberSliderItems) {
    const widthSlider = $(".slider").offsetWidth;
    widthTaskBox = (widthSlider / numberSliderItems) - marginSlideConfig;
    sliderItems.forEach(item => {
        item.style.width = `${widthTaskBox}px`;
    });
}

function setWidthSliderWidth() {
    $('.slider--width').style.width = `${totalSlides * (widthTaskBox + marginSlideConfig)}px`;
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
        slides[1].style.marginLeft = `-${widthTaskBox + marginSlideConfig}px`;
        setTimeout(()=>{
            slider.appendChild(slides[0]);
            $$('.slider--item')[slides.length - 1].style.marginLeft = "0px";
        }, 100);  
    }
    if(control === 2){
        $$('.slider--item')[0].style.marginLeft = "0px";
        setTimeout(()=>{
            slides[slides.length - 1].style.marginLeft = `-${widthTaskBox + marginSlideConfig}px`;
            slider.prepend(slides[slides.length - 1]);
        }, 100);  
    } 
}

sliderControl[0].addEventListener('click', goPrev);
sliderControl[1].addEventListener('click', goNext);


slider.prepend(sliderItems[sliderItems.length - 1]);
const totalSlides = sliderItems.length;

numberTasksBoxsOnScreen = numberOfTasksBoxsRelatedToScreenWidth();
setWidthTaskBox(numberTasksBoxsOnScreen);
setWidthSliderWidth();

$$('.slider--item')[0].style.marginLeft = `-${widthTaskBox + marginSlideConfig}px`;


window.addEventListener('load', ()=>{
    sliderItems.forEach(item => {
        item.style.transition = "all ease 0.5s";
    });
});