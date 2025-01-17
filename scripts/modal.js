const menu = document.querySelector('.navigation');
const menuOpen = document.querySelector('.burger');
const menuClose = document.querySelector('.navigation__button');
const linksList = document.querySelector('.navigation__wrapper');
const overlay = document.querySelector('.overlay');
const body = document.body;
const menuOpenActive = document.querySelector('.burger--opened');

function toggleMenu(action){ 
    menu.classList[action]('navigation--active');
    overlay.classList[action]('overlay--active');
    body.classList[action]('no-scroll');
}

menuOpen.addEventListener('click',()=>{
    if(!menu.classList.contains('navigation--active')){
        menuOpen.classList.add('burger--opened')
        toggleMenu('add');
    }
})

menuClose.addEventListener('click',()=>{
    if(menu.classList.contains('navigation--active')){
        toggleMenu('remove');
        menuOpen.classList.remove('burger--opened')
    }
})

linksList.addEventListener('click',(event)=>{ 
    const clickedElement = event.target.parentNode;
    if (clickedElement.classList.contains('navigation__ref')){ 
        toggleMenu('remove');
        menuOpen.classList.remove('burger--opened')
    } 
});

document.addEventListener('click', (event) => { 
    const isClickInside = menu.contains(event.target) || menuOpen.contains(event.target); 
    if (!isClickInside){ 
        toggleMenu('remove');
        menuOpen.classList.remove('burger--opened')
    } 
});