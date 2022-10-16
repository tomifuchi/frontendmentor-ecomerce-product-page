//Product image area
//Initializing
const pd_img_detail = document.querySelectorAll('#img-detail .product-img-detail li');
const pd_img_variation = document.querySelectorAll('#img-detail .product-img-variation li');

//Go to zoomed state
const body_dark_overlay = document.querySelector('.body-dark-overlay');
pd_img_detail.forEach( img => {
    img.addEventListener('click', () => {
        document.body.classList.toggle('lock-body');
        body_dark_overlay.dataset.active = true;
        syncScrollToActiveImage(img);
    });
});

//The close button on zoomed state
const active_box_close_btn = document.getElementById('close-btn');
active_box_close_btn.addEventListener('click', () => {
    document.body.classList.toggle('lock-body');
    delete body_dark_overlay.dataset.active;
});

//Sync to active box and scroll to active image
function syncScrollToActiveImage(img) {
    const pd_img_detail = document.querySelectorAll('#active-box .product-img-detail li');
    const pd_img_variation = document.querySelectorAll('#active-box .product-img-variation li');

    let currentIndex = [...document.querySelectorAll('#img-detail .product-img-detail li')].indexOf(img);
    delete document.querySelector('#active-box .product-img-variation li[data-active-overlay]').dataset.activeOverlay;
    delete document.querySelector('#active-box .product-img-detail li[data-active-image]').dataset.activeImage;

    pd_img_variation[currentIndex].dataset.activeOverlay = true;
    pd_img_detail[currentIndex].dataset.activeImage = true;
    pd_img_detail[currentIndex].scrollIntoView(); //Huehuehuehue
}

//Add event for both zoomed, and normal state
function add_event(id) {
    const pd_img_detail = document.querySelectorAll(`${id} .product-img-detail li`);
    const pd_img_variation = document.querySelectorAll(`${id} .product-img-variation li`);

    pd_img_detail[
        [...pd_img_detail].indexOf(document.querySelector(`${id} .product-img-detail li[data-active-image]`))
    ].scrollIntoView();

    //Initial scroll to the active image
    pd_img_variation.forEach( img => {
         img.addEventListener('click', () => {
            //Scroll to image, not necessarily through each image.
            let currentIndex = [...pd_img_variation].indexOf(img);
            delete document.querySelector(`${id} .product-img-variation li[data-active-overlay]`).dataset.activeOverlay;
            delete document.querySelector(`${id} .product-img-detail li[data-active-image]`).dataset.activeImage;
            img.dataset.activeOverlay = true;
            pd_img_detail[currentIndex].dataset.activeImage = true;
            pd_img_detail[currentIndex].scrollIntoView(); //Huehuehuehue
        });
    });
}
add_event('#img-detail');
add_event('#active-box');

//Buttons on active box
const pd_img_detail_button_next = document.querySelector('#active-box .product-img-detail button[data-button-next]');
const pd_img_detail_button_prev = document.querySelector('#active-box .product-img-detail button[data-button-prev]');

function scroll_img_carousel(id, step) {
   const active_img = document.querySelector(`${id} .product-img-detail li[data-active-image]`);
   const pd_img_detail = document.querySelectorAll(`${id} .product-img-detail li`);
   const pd_img_variation = document.querySelectorAll(`${id} .product-img-variation li`);
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

   delete document.querySelector(`${id} .product-img-detail li[data-active-image]`).dataset.activeImage;
   delete document.querySelector(`${id} .product-img-variation li[data-active-overlay]`).dataset.activeOverlay;
   pd_img_variation[nextIndex].dataset.activeOverlay = true;
   pd_img_detail[nextIndex].dataset.activeImage = true;
   pd_img_detail[nextIndex].scrollIntoView();
}
pd_img_detail_button_next.addEventListener('click', () => {scroll_img_carousel('#active-box', 1);});
pd_img_detail_button_prev.addEventListener('click', () => {scroll_img_carousel('#active-box', -1);});

//Left and right arrow for both zoomed and normal state, and escape button for zoomed state.
window.addEventListener('keyup', event => {
    const state = document.querySelector('.body-dark-overlay').hasAttribute('data-active');
    if(state){
        switch(event.key) {
            case 'ArrowRight':
                scroll_img_carousel('#active-box', 1);
                break;
            case 'ArrowLeft':
                scroll_img_carousel('#active-box', -1);
                break;
            case 'Escape':
                active_box_close_btn.dispatchEvent(new Event('click'));
                break;
        }
    }
    else{
        switch(event.key) {
            case 'ArrowRight':
                scroll_img_carousel('#img-detail', 1);
                break;
            case 'ArrowLeft':
                scroll_img_carousel('#img-detail', -1);
                break;
        }
    }
});

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