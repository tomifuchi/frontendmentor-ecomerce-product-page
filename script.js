//Product image area

//Navigating the using thumbnail image below main image
const pd_img_detail = document.querySelectorAll('.product-img-detail li');
const pd_img_variation = document.querySelectorAll('.product-img-variation li');
pd_img_variation.forEach( img => {
    img.addEventListener('click', () => {
        let currentIndex = [...pd_img_variation].indexOf(img);
        delete document.querySelector('.product-img-variation li[data-active-overlay]').dataset.activeOverlay;
        delete document.querySelector('.product-img-detail li[data-active-image]').dataset.activeImage;
        img.dataset.activeOverlay = true;
        pd_img_detail[currentIndex].dataset.activeImage = true;
        pd_img_detail[currentIndex].scrollIntoView(); //Huehuehuehue
    })
});

const pd_img_detail_button_next = document.querySelector('.product-img-detail button[data-button-next]');
const pd_img_detail_button_prev = document.querySelector('.product-img-detail button[data-button-prev]');
function scroll_img_carousel(step) {
   const active_img = document.querySelector('.product-img-detail li[data-active-image]');
   let currentIndex = [...pd_img_detail].indexOf(active_img);
   let nextIndex;

   if (currentIndex + step < 0) {
    nextIndex = pd_img_detail.length - 1;
   } else if ( currentIndex + step > pd_img_detail.length - 1) {
    nextIndex = 0;
   }
   else {
    nextIndex = currentIndex + step;
   }

   delete document.querySelector('.product-img-variation li[data-active-overlay]').dataset.activeOverlay;
   delete document.querySelector('.product-img-detail li[data-active-image]').dataset.activeImage;
   pd_img_variation[nextIndex].dataset.activeOverlay = true;
   pd_img_detail[nextIndex].dataset.activeImage = true;
   pd_img_detail[nextIndex].scrollIntoView();
}

pd_img_detail_button_next.addEventListener('click', () => {scroll_img_carousel(1);});
pd_img_detail_button_prev.addEventListener('click', () => {scroll_img_carousel(-1);});


window.addEventListener('keyup', event => {
    switch(event.key) {
        case 'ArrowRight':
            scroll_img_carousel(1);
            break;
        case 'ArrowLeft':
            scroll_img_carousel(-1);
            break;
    }
});

////Now for the hand scrolling
//const observer = new IntersectionObserver( entries => {
//    entries.forEach( entry => {
//    });
//    //delete document.querySelector('.product-img-variation li[data-active-overlay]').dataset.activeOverlay;
//    //delete document.querySelector('.product-img-detail li[data-active-image]').dataset.activeImage;
//
//    let nextIndex = [...pd_img_detail].indexOf(entries[0].target); 
//    console.log(nextIndex);
//    //pd_img_variation[nextIndex].dataset.activeOverlay = true;
//    //pd_img_detail[nextIndex].dataset.activeImage = true;
//
//}, {
// root: document.querySelector('.product-img-detail ul'),
//});
//
//pd_img_detail.forEach( img => {
//    observer.observe(img);
//});



//Product detail area
//Button for the add to cart and incrementing the 
//item in the cart
const btn_increment = document.getElementById('cart-increment');
const btn_decrement = document.getElementById('cart-decrement');
const cart_input = document.getElementById('cart-input');

btn_increment.addEventListener('click', () => {
    let val = Number(cart_input.value);
    if (val < 10)
    cart_input.value = parseInt(Number(cart_input.value) + 1);
});

btn_decrement.addEventListener('click', () => {
    let val = Number(cart_input.value);
    if (val >= 1)
    cart_input.value = parseInt(Number(cart_input.value) - 1);
});