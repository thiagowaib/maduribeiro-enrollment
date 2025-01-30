
const moveSlide = (current:HTMLDivElement, target:HTMLDivElement|undefined):any => {
    if(!target) { return; }
    console.log(`Moving from ${current} to ${target}`);
    current.classList.add('hidden');
    target.classList.remove('hidden');
}

const slides = <HTMLCollectionOf<HTMLDivElement>> document.getElementsByClassName('slide');
for(let index = 0; index < slides.length; index++) {
    const slide = slides[index];
    const btnBack    = <HTMLButtonElement> document.getElementById(`btn-back-${index}`);
    const btnForward = <HTMLButtonElement> document.getElementById(`btn-forward-${index}`);

    // special condition where there's only one slide:
    if(slides.length == 1) {
        btnForward?.setAttribute("disabled", "true");
        btnBack?.setAttribute("disabled", "true");
        btnBack.onclick    = null;
        btnForward.onclick = null;
        break;
    }
    
    switch (index) {
        case 0:
            btnBack?.setAttribute("disabled", "true");
            btnForward?.removeAttribute("disabled");
            btnBack.onclick    = null;
            btnForward.onclick = () => moveSlide(slide, slides[index+1]);
            break;
        case (slides.length - 1):
            btnBack?.removeAttribute("disabled");
            btnForward?.setAttribute("disabled", "true");
            btnBack.onclick    = () => moveSlide(slide, slides[index-1]);
            btnForward.onclick = null;
            break;
        default:
            btnBack?.removeAttribute("disabled");
            btnForward?.removeAttribute("disabled");
            btnBack.onclick    = () => moveSlide(slide, slides[index-1]);
            btnForward.onclick = () => moveSlide(slide, slides[index+1]);
            break;
    }
}

