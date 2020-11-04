let pageCount = 1;
let pageReadyToTurn = true;

scroll(0, 0);

//Interaction pour passer à la page suivante via l'icone flèche droite
function changePageRight() {

    var pageOver = "page" + pageCount;


    var delayInMilliseconds = 1500; //1.5 seconds
    if (pageReadyToTurn === true) {
        pageReadyToTurn = false;

        if (pageCount < 4) {
            document.getElementById(pageOver).classList.remove('pageIn');
            document.getElementById(pageOver).classList.add('pageOff');

            document.getElementById("page" + (pageCount + 1)).classList.remove('pageWaiting');
            document.getElementById("page" + (pageCount + 1)).classList.add('pageIn');
            pageCount++;
            verticalScrollAllowed()


        } else if (pageCount === 4) {
            document.getElementById(pageOver).classList.remove('pageIn');
            document.getElementById(pageOver).classList.add('pageOff');

            document.getElementById("page1").classList.remove('pageWaiting');
            document.getElementById("page1").classList.add('pageIn');

            pageCount = 1;

        }
        titleChange()
        setTimeout(function () {
            document.getElementById(pageOver).classList.remove('pageOff');
            document.getElementById(pageOver).classList.add('pageWaiting');
            pageReadyToTurn = true;

        }, delayInMilliseconds);
    }
}

var boutonElt = document.getElementById("arrow");
// Ajout d'un gestionnaire pour l'événement click
boutonElt.addEventListener("click", changePageRight);

//Page 2 : Activer le scroll vertical

function verticalScrollAllowed() {
    if (pageCount === 3) {
        var delayInMilliseconds = 1500; //1.5 seconds
        setTimeout(function () {
            document.body.style['overflow-y'] = 'scroll';
        }, delayInMilliseconds);
    } else {
        scroll(0, 0);
        document.body.style['overflow-y'] = 'hidden';
    }
}



function titleChange() {
    switch (pageCount) {
        case 1:
            document.title = "Simon F. ✌️"
            break;
        case 2:
            document.title = "Simon F. 🎃"
            break;
        case 3:
            document.title = "Simon F. 🤯"
            break;
        case 4:
            document.title = "Simon F. 🐓"
            break;
        default:
            alert("Celui qui lit ça est un gentleman.")
            break;
    }
}








// DRAG AND DROP

const base = document.querySelector('.base');
const box = document.querySelectorAll('.case');



base.addEventListener('dragstart', dragStart);
base.addEventListener('dragend', dragEnd);


function dragStart() {
    this.className += ' tenu';

    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    this.className = 'base';
}


for (const vide of box) {

    vide.addEventListener('dragover', dragOver);

    vide.addEventListener('dragenter', dragEnter);

    vide.addEventListener('dragleave', dragLeave);

    vide.addEventListener('drop', dragDrop);


}



function dragOver(e) {
    e.preventDefault()


}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'case';
}


function dragDrop() {
    this.className = 'case';
    this.append(base);
    if (this.id === 'hole') {
        //Récompense
        document.getElementById("grandeDiv").classList.add('reward');

        //Faire apparaitre le SVG
        document.getElementById("arrowDiv").classList.remove('arrowHidding');
        document.getElementById("arrowDiv").classList.add('arrowCome');

        //Etendre la div
        document.getElementById("locomotive").classList.remove('hidden');
    }
}



/* LOCOMOTIVE */




const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
})

gsap.registerPlugin(ScrollTrigger)


scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
    '.container', {
        scrollTop(value) {
            return arguments.length ?
            scroller.scrollTo(value, 0, 0) :
            scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return {
                left: 0, top: 0, 
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
)


ScrollTrigger.create({
    trigger: '.image-mask',
    scroller: '.container',
    start: 'top+=30% 50%',
    end: 'bottom-=40% 50%',
    animation: gsap.to('.image-mask', {backgroundSize: '120%'}),
    scrub: 2,
    // markers: true
})


ScrollTrigger.addEventListener('refresh', () => scroller.update())


ScrollTrigger.refresh()





























/*textPinned.style.top = y + "px"*/








/*function currentYWindow() {
    //on scroll, avoir le point le plus bas verticalement du conteneur texte
    let bottomText = document.querySelector("div#pinSection");
    let bottomTextRect = bottomText.getBoundingClientRect();
    let textHeight = bottomTextRect.height;

    //on scroll, avoir le point le plus haut verticalement du conteneur photos
    let topConteneur = document.querySelector("div#leftConteneur");
    let topConteneurRect = topConteneur.getBoundingClientRect();
    let startHeightPhoto = topConteneurRect.y;

    //on scroll, avoir le point le plus bas verticalement du conteneur texte
    let photosConteneur = document.querySelector("div.images-container");
    let photosConteneurRect = photosConteneur.getBoundingClientRect();
    let endHeightPhoto = photosConteneurRect.height;



    console.log("x= "+textHeight)
    console.log("Z = "+endHeightPhoto)
    console.log("y = "+startHeightPhoto)

    console.log(-startHeightPhoto+textHeight)
    console.log(endHeightPhoto)
    if (startHeightPhoto < 0 || endHeightPhoto > (-startHeightPhoto+textHeight)) {
        var pinSection = document.getElementById("pinSection");

        pinSection.classList.remove("positionHaute");
        pinSection.classList.remove("positionBasse");
        pinSection.classList.add("pinFixed");

    } else if (endHeightPhoto < (-startHeightPhoto+textHeight)) {
        var pinSection = document.getElementById("pinSection");
        
        pinSection.classList.remove("pinFixed");
        pinSection.classList.add("positionBasse");
        var finishZone = document.querySelector("div.positionBasse");
        finishZone.style.margin.top = -startHeightPhoto + "px"
     }
 


}
window.addEventListener("scroll", currentYWindow);
*/